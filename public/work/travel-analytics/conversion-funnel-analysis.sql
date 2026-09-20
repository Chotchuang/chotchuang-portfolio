-- OTA Conversion Funnel Analysis (DuckDB)
-- Data: clickstream_events.csv + sessions_funnel.csv

-- Query 1: Overall funnel conversion
WITH funnel AS (
  SELECT
    session_id,
    MAX(CASE WHEN event_type = 'search' THEN 1 ELSE 0 END) AS reached_search,
    MAX(CASE WHEN event_type = 'view_listing' THEN 1 ELSE 0 END) AS reached_view_listing,
    MAX(CASE WHEN event_type = 'select_dates' THEN 1 ELSE 0 END) AS reached_select_dates,
    MAX(CASE WHEN event_type = 'begin_checkout' THEN 1 ELSE 0 END) AS reached_begin_checkout,
    MAX(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) AS reached_purchase
  FROM read_csv_auto('data/raw/clickstream_events.csv')
  GROUP BY session_id
)
SELECT
  COUNT(*) AS total_sessions,
  SUM(reached_search) AS search,
  SUM(reached_view_listing) AS view_listing,
  SUM(reached_select_dates) AS select_dates,
  SUM(reached_begin_checkout) AS begin_checkout,
  SUM(reached_purchase) AS purchase,
  ROUND(100.0 * SUM(reached_purchase) / COUNT(*), 2) AS overall_cvr_pct
FROM funnel;

-- Query 2: Step-to-step conversion rates
WITH funnel AS (
  SELECT
    session_id,
    MAX(CASE WHEN event_type = 'search' THEN 1 ELSE 0 END) AS s1,
    MAX(CASE WHEN event_type = 'view_listing' THEN 1 ELSE 0 END) AS s2,
    MAX(CASE WHEN event_type = 'select_dates' THEN 1 ELSE 0 END) AS s3,
    MAX(CASE WHEN event_type = 'begin_checkout' THEN 1 ELSE 0 END) AS s4,
    MAX(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) AS s5
  FROM read_csv_auto('data/raw/clickstream_events.csv')
  GROUP BY session_id
)
SELECT * FROM (
  SELECT 'search -> view_listing' AS step_transition,
         ROUND(100.0 * SUM(s2) / NULLIF(SUM(s1), 0), 2) AS conversion_pct FROM funnel
  UNION ALL
  SELECT 'view_listing -> select_dates',
         ROUND(100.0 * SUM(s3) / NULLIF(SUM(s2), 0), 2) FROM funnel
  UNION ALL
  SELECT 'select_dates -> begin_checkout',
         ROUND(100.0 * SUM(s4) / NULLIF(SUM(s3), 0), 2) FROM funnel
  UNION ALL
  SELECT 'begin_checkout -> purchase',
         ROUND(100.0 * SUM(s5) / NULLIF(SUM(s4), 0), 2) FROM funnel
  UNION ALL
  SELECT 'view_listing -> purchase (PDP CVR)',
         ROUND(100.0 * SUM(s5) / NULLIF(SUM(s2), 0), 2) FROM funnel
);

-- Query 3: Funnel by device
WITH funnel AS (
  SELECT
    e.session_id,
    MAX(e.device) AS device,
    MAX(CASE WHEN e.event_type = 'search' THEN 1 ELSE 0 END) AS reached_search,
    MAX(CASE WHEN e.event_type = 'view_listing' THEN 1 ELSE 0 END) AS reached_view_listing,
    MAX(CASE WHEN e.event_type = 'select_dates' THEN 1 ELSE 0 END) AS reached_select_dates,
    MAX(CASE WHEN e.event_type = 'begin_checkout' THEN 1 ELSE 0 END) AS reached_begin_checkout,
    MAX(CASE WHEN e.event_type = 'purchase' THEN 1 ELSE 0 END) AS reached_purchase
  FROM read_csv_auto('data/raw/clickstream_events.csv') e
  GROUP BY e.session_id
)
SELECT
  device,
  COUNT(*) AS sessions,
  ROUND(100.0 * SUM(reached_purchase) / COUNT(*), 2) AS overall_cvr_pct,
  ROUND(100.0 * SUM(reached_purchase) / NULLIF(SUM(reached_view_listing), 0), 2) AS pdp_cvr_pct,
  ROUND(100.0 * SUM(reached_view_listing) / NULLIF(SUM(reached_search), 0), 2) AS search_to_pdp_pct
FROM funnel
GROUP BY device
ORDER BY sessions DESC;

-- Query 4: Funnel by market
WITH funnel AS (
  SELECT
    e.session_id,
    MAX(e.market) AS market,
    MAX(CASE WHEN e.event_type = 'purchase' THEN 1 ELSE 0 END) AS reached_purchase,
    MAX(CASE WHEN e.event_type = 'view_listing' THEN 1 ELSE 0 END) AS reached_view_listing
  FROM read_csv_auto('data/raw/clickstream_events.csv') e
  GROUP BY e.session_id
)
SELECT
  market,
  COUNT(*) AS sessions,
  ROUND(100.0 * SUM(reached_purchase) / COUNT(*), 2) AS overall_cvr_pct,
  ROUND(100.0 * SUM(reached_purchase) / NULLIF(SUM(reached_view_listing), 0), 2) AS pdp_cvr_pct
FROM funnel
GROUP BY market
ORDER BY sessions DESC;

-- Query 5: Time to convert (seconds from first event to purchase)
WITH ordered AS (
  SELECT
    session_id,
    event_type,
    CAST(timestamp AS TIMESTAMP) AS ts,
    ROW_NUMBER() OVER (PARTITION BY session_id ORDER BY CAST(timestamp AS TIMESTAMP)) AS rn,
    COUNT(*) OVER (PARTITION BY session_id) AS event_count
  FROM read_csv_auto('data/raw/clickstream_events.csv')
),
session_span AS (
  SELECT
    session_id,
    MIN(ts) AS first_ts,
    MAX(ts) AS last_ts,
    MAX(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) AS purchased
  FROM ordered
  GROUP BY session_id
)
SELECT
  purchased,
  COUNT(*) AS sessions,
  ROUND(AVG(EXTRACT(EPOCH FROM (last_ts - first_ts))), 1) AS avg_seconds,
  ROUND(MEDIAN(EXTRACT(EPOCH FROM (last_ts - first_ts))), 1) AS median_seconds
FROM session_span
GROUP BY purchased;

-- Query 6: Drop-off heatmap data (step x device)
WITH funnel AS (
  SELECT
    e.session_id,
    MAX(e.device) AS device,
    MAX(CASE WHEN e.event_type = 'view_listing' THEN 1 ELSE 0 END) AS v,
    MAX(CASE WHEN e.event_type = 'select_dates' THEN 1 ELSE 0 END) AS d,
    MAX(CASE WHEN e.event_type = 'begin_checkout' THEN 1 ELSE 0 END) AS c,
    MAX(CASE WHEN e.event_type = 'purchase' THEN 1 ELSE 0 END) AS p
  FROM read_csv_auto('data/raw/clickstream_events.csv') e
  GROUP BY e.session_id
)
SELECT
  device,
  ROUND(100.0 * SUM(d) / NULLIF(SUM(v), 0), 2) AS pdp_to_dates_pct,
  ROUND(100.0 * SUM(c) / NULLIF(SUM(d), 0), 2) AS dates_to_checkout_pct,
  ROUND(100.0 * SUM(p) / NULLIF(SUM(c), 0), 2) AS checkout_to_purchase_pct
FROM funnel
GROUP BY device;

-- Query 7: Top listings by funnel leakage (high PDP views, low purchase)
WITH session_agg AS (
  SELECT
    listing_id,
    COUNT(*) AS pdp_sessions,
    SUM(reached_purchase) AS purchases,
    ROUND(100.0 * SUM(reached_purchase) / COUNT(*), 2) AS pdp_cvr_pct
  FROM read_csv_auto('data/processed/sessions_funnel.csv')
  WHERE reached_view_listing = 1
  GROUP BY listing_id
  HAVING COUNT(*) >= 3
)
SELECT listing_id, pdp_sessions, purchases, pdp_cvr_pct
FROM session_agg
ORDER BY pdp_sessions DESC, pdp_cvr_pct ASC
LIMIT 20;

-- Query 8: Cohort retention by signup week
SELECT
  signup_week,
  COUNT(*) AS sessions,
  ROUND(100.0 * SUM(reached_purchase) / COUNT(*), 2) AS cvr_pct,
  ROUND(AVG(revenue_thb), 0) AS avg_revenue_thb
FROM read_csv_auto('data/processed/sessions_funnel.csv')
GROUP BY signup_week
ORDER BY signup_week;

-- Query 9: Revenue funnel
SELECT
  COUNT(*) AS total_sessions,
  SUM(reached_purchase) AS purchases,
  ROUND(SUM(revenue_thb), 0) AS total_revenue_thb,
  ROUND(AVG(CASE WHEN reached_purchase = 1 THEN revenue_thb END), 0) AS avg_order_value_thb,
  ROUND(SUM(revenue_thb) / COUNT(*), 2) AS revenue_per_session_thb
FROM read_csv_auto('data/processed/sessions_funnel.csv');

-- Query 10: Content score vs conversion (Project 1 link)
SELECT
  CASE
    WHEN content_quality_score >= 70 THEN 'high_content'
    WHEN content_quality_score >= 50 THEN 'mid_content'
    ELSE 'low_content'
  END AS content_band,
  COUNT(*) AS pdp_sessions,
  ROUND(100.0 * SUM(reached_purchase) / COUNT(*), 2) AS pdp_cvr_pct,
  ROUND(AVG(content_quality_score), 1) AS avg_content_score,
  ROUND(AVG(review_count), 1) AS avg_reviews
FROM read_csv_auto('data/processed/sessions_funnel.csv')
WHERE reached_view_listing = 1
GROUP BY 1
ORDER BY avg_content_score DESC;

-- Query 11: Event sequence with LAG (sample sessions)
WITH ordered AS (
  SELECT
    session_id,
    event_type,
    device,
    CAST(timestamp AS TIMESTAMP) AS ts,
    LAG(event_type) OVER (PARTITION BY session_id ORDER BY CAST(timestamp AS TIMESTAMP)) AS prev_event,
    LAG(CAST(timestamp AS TIMESTAMP)) OVER (PARTITION BY session_id ORDER BY CAST(timestamp AS TIMESTAMP)) AS prev_ts
  FROM read_csv_auto('data/raw/clickstream_events.csv')
)
SELECT
  prev_event,
  event_type AS current_event,
  COUNT(*) AS transitions,
  ROUND(AVG(EXTRACT(EPOCH FROM (ts - prev_ts))), 1) AS avg_seconds_between
FROM ordered
WHERE prev_event IS NOT NULL
GROUP BY prev_event, event_type
ORDER BY transitions DESC
LIMIT 15;

-- Query 12: BKK market funnel only (experiment population)
SELECT
  variant,
  COUNT(*) AS sessions,
  SUM(reached_view_listing) AS pdp_sessions,
  SUM(reached_purchase) AS purchases,
  ROUND(100.0 * SUM(reached_purchase) / NULLIF(SUM(reached_view_listing), 0), 2) AS pdp_cvr_pct,
  ROUND(SUM(revenue_thb), 0) AS revenue_thb
FROM read_csv_auto('data/processed/sessions_funnel.csv')
WHERE market = 'BKK' AND reached_view_listing = 1
GROUP BY variant
ORDER BY variant;
