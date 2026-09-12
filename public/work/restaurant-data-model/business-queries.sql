-- Restaurant & Cafe Chain — final assignment query examples

-- Monthly revenue trend
SELECT
  strftime('%Y-%m', paid_at) AS sales_month,
  COUNT(*) AS num_payments,
  SUM(amount) AS total_revenue
FROM payments
GROUP BY strftime('%Y-%m', paid_at)
ORDER BY sales_month;

-- Top menu items by revenue per branch
SELECT
  b.branch_name,
  m.item_name,
  SUM(oi.quantity) AS units_sold,
  SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items AS oi
JOIN orders AS o ON oi.order_id = o.order_id
JOIN menu_items AS m ON oi.item_id = m.item_id
JOIN branches AS b ON o.branch_id = b.branch_id
WHERE o.order_status = 'completed'
GROUP BY b.branch_name, m.item_name
ORDER BY b.branch_name, revenue DESC;
