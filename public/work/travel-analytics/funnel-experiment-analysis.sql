-- Travel Product & Supply Analytics — Funnel & Experiment Analysis
-- Engine: DuckDB | Input: synthetic clickstream events generated for this case
-- This portfolio copy contains queries only. No event-level data is published.

-- 1. Build the session-level funnel and calculate end-to-end conversion.
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

-- 2. Locate the largest conversion break between consecutive funnel steps.
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

-- 3. Separate product opportunity from traffic mix by device.
WITH funnel AS (
  SELECT
    e.session_id,
    MAX(e.device) AS device,
    MAX(CASE WHEN e.event_type = 'search' THEN 1 ELSE 0 END) AS reached_search,
    MAX(CASE WHEN e.event_type = 'view_listing' THEN 1 ELSE 0 END) AS reached_view_listing,
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

-- 4. Test the experiment population: Bangkok PDP visitors by assigned variant.
SELECT
  variant,
  COUNT(*) AS sessions,
  SUM(reached_view_listing) AS pdp_sessions,
  SUM(reached_purchase) AS purchases,
  ROUND(100.0 * SUM(reached_purchase) / NULLIF(SUM(reached_view_listing), 0), 2)
      AS pdp_cvr_pct,
  ROUND(SUM(revenue_thb), 0) AS revenue_thb
FROM read_csv_auto('data/processed/sessions_funnel.csv')
WHERE market = 'BKK' AND reached_view_listing = 1
GROUP BY variant
ORDER BY variant;

-- 5. Connect content quality to conversion without treating association as causation.
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
