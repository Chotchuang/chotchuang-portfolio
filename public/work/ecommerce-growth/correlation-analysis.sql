-- Maven Fuzzy Factory — Milestone 3 correlation and metric SQL

-- Repeat-session behavior versus order value and margin
WITH order_metrics AS (
  SELECT
    o.order_id,
    o.price_usd,
    ROUND(100.0 * (o.price_usd - o.cogs_usd) / NULLIF(o.price_usd, 0), 2) AS gross_margin_pct,
    s.is_repeat_session
  FROM orders o
  JOIN website_sessions s ON o.website_session_id = s.website_session_id
)
SELECT
  CORR(price_usd, is_repeat_session::NUMERIC) AS corr_aov_repeat_session,
  CORR(gross_margin_pct, is_repeat_session::NUMERIC) AS corr_margin_repeat_session
FROM order_metrics;

-- Session depth versus conversion
WITH session_depth AS (
  SELECT
    s.website_session_id,
    s.utm_source,
    COUNT(pv.website_pageview_id) AS pageview_count,
    CASE WHEN o.order_id IS NOT NULL THEN 1 ELSE 0 END AS converted
  FROM website_sessions s
  LEFT JOIN website_pageviews pv ON s.website_session_id = pv.website_session_id
  LEFT JOIN orders o ON s.website_session_id = o.website_session_id
  GROUP BY s.website_session_id, s.utm_source, o.order_id
)
SELECT
  CORR(pageview_count, converted::NUMERIC) AS corr_depth_conversion,
  AVG(pageview_count) FILTER (WHERE converted = 1) AS avg_depth_converted,
  AVG(pageview_count) FILTER (WHERE converted = 0) AS avg_depth_not_converted
FROM session_depth;

-- Channel comparison with session-depth context
WITH session_depth AS (
  SELECT
    s.website_session_id,
    s.utm_source,
    COUNT(pv.website_pageview_id) AS pageview_count,
    CASE WHEN o.order_id IS NOT NULL THEN 1 ELSE 0 END AS converted
  FROM website_sessions s
  LEFT JOIN website_pageviews pv ON s.website_session_id = pv.website_session_id
  LEFT JOIN orders o ON s.website_session_id = o.website_session_id
  GROUP BY s.website_session_id, s.utm_source, o.order_id
)
SELECT
  utm_source,
  COUNT(*) AS sessions,
  SUM(converted) AS orders,
  ROUND(AVG(pageview_count), 2) AS avg_pageviews,
  ROUND(SUM(converted)::NUMERIC / COUNT(*), 4) AS conversion_rate
FROM session_depth
GROUP BY utm_source
ORDER BY sessions DESC;
