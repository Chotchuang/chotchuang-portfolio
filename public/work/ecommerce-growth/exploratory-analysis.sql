-- Maven Fuzzy Factory — Milestone 1 exploratory SQL

-- Row counts per table
SELECT 'products' AS table_name, COUNT(*) AS row_count FROM products
UNION ALL SELECT 'website_sessions', COUNT(*) FROM website_sessions
UNION ALL SELECT 'website_pageviews', COUNT(*) FROM website_pageviews
UNION ALL SELECT 'orders', COUNT(*) FROM orders
UNION ALL SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL SELECT 'order_item_refunds', COUNT(*) FROM order_item_refunds
ORDER BY table_name;

-- Traffic overview by UTM source
SELECT
  utm_source,
  COUNT(*) AS sessions,
  COUNT(DISTINCT user_id) AS unique_users
FROM website_sessions
GROUP BY utm_source
ORDER BY sessions DESC;

-- Device mix
SELECT
  device_type,
  COUNT(*) AS sessions,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) AS pct_sessions
FROM website_sessions
GROUP BY device_type
ORDER BY sessions DESC;

-- Monthly sessions, orders, and conversion
SELECT
  DATE_TRUNC('month', s.created_at)::DATE AS month,
  COUNT(DISTINCT s.website_session_id) AS sessions,
  COUNT(DISTINCT o.order_id) AS orders,
  ROUND(
    100.0 * COUNT(DISTINCT o.order_id) / NULLIF(COUNT(DISTINCT s.website_session_id), 0),
    2
  ) AS conversion_pct
FROM website_sessions s
LEFT JOIN orders o ON s.website_session_id = o.website_session_id
GROUP BY 1
ORDER BY 1;

-- Sample session-to-order join
SELECT
  s.website_session_id,
  s.utm_source,
  s.device_type,
  o.order_id,
  o.price_usd,
  o.cogs_usd
FROM website_sessions s
INNER JOIN orders o ON s.website_session_id = o.website_session_id
ORDER BY s.created_at
LIMIT 10;
