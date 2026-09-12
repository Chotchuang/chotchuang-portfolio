-- Maven Fuzzy Factory — Milestone 2 descriptive SQL

-- Overall orders, revenue, average order value, and gross margin
SELECT
  COUNT(*) AS orders,
  ROUND(SUM(price_usd), 2) AS revenue_usd,
  ROUND(AVG(price_usd), 2) AS avg_order_value_usd,
  ROUND(AVG(price_usd - cogs_usd), 2) AS avg_gross_margin_usd,
  ROUND(SUM(cogs_usd), 2) AS total_cogs_usd
FROM orders;

-- Channel efficiency
SELECT
  COALESCE(s.utm_source, 'direct') AS utm_source,
  COUNT(DISTINCT s.website_session_id) AS sessions,
  COUNT(DISTINCT o.order_id) AS orders,
  ROUND(100.0 * COUNT(DISTINCT o.order_id) / NULLIF(COUNT(DISTINCT s.website_session_id), 0), 2) AS conversion_pct,
  ROUND(COALESCE(SUM(o.price_usd), 0) / NULLIF(COUNT(DISTINCT s.website_session_id), 0), 2) AS revenue_per_session
FROM website_sessions s
LEFT JOIN orders o ON s.website_session_id = o.website_session_id
GROUP BY 1
ORDER BY sessions DESC;

-- Device conversion and revenue quality
SELECT
  s.device_type,
  COUNT(DISTINCT s.website_session_id) AS sessions,
  COUNT(DISTINCT o.order_id) AS orders,
  ROUND(100.0 * COUNT(DISTINCT o.order_id) / NULLIF(COUNT(DISTINCT s.website_session_id), 0), 2) AS conversion_pct,
  ROUND(COALESCE(SUM(o.price_usd), 0) / NULLIF(COUNT(DISTINCT s.website_session_id), 0), 2) AS revenue_per_session
FROM website_sessions s
LEFT JOIN orders o ON s.website_session_id = o.website_session_id
GROUP BY s.device_type
ORDER BY sessions DESC;

-- Refund rate by product
SELECT
  p.product_name,
  COUNT(DISTINCT oi.order_item_id) AS items_sold,
  COUNT(DISTINCT r.order_item_refund_id) AS refunds,
  ROUND(100.0 * COUNT(DISTINCT r.order_item_refund_id) / NULLIF(COUNT(DISTINCT oi.order_item_id), 0), 2) AS refund_rate_pct
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
LEFT JOIN order_item_refunds r ON oi.order_item_id = r.order_item_id
GROUP BY p.product_name
ORDER BY refund_rate_pct DESC;

-- Repeat versus new session conversion
SELECT
  s.is_repeat_session,
  COUNT(DISTINCT s.website_session_id) AS sessions,
  COUNT(DISTINCT o.order_id) AS orders,
  ROUND(100.0 * COUNT(DISTINCT o.order_id) / NULLIF(COUNT(DISTINCT s.website_session_id), 0), 2) AS conversion_pct
FROM website_sessions s
LEFT JOIN orders o ON s.website_session_id = o.website_session_id
GROUP BY s.is_repeat_session
ORDER BY s.is_repeat_session;
