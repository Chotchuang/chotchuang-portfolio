-- Maven Fuzzy Factory — PostgreSQL data model
-- E-commerce Growth & Commercial Strategy capstone

BEGIN;

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  product_name TEXT NOT NULL
);

CREATE TABLE website_sessions (
  website_session_id INTEGER PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  user_id INTEGER NOT NULL,
  is_repeat_session SMALLINT NOT NULL CHECK (is_repeat_session IN (0, 1)),
  utm_source TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  device_type TEXT,
  http_referer TEXT
);

CREATE TABLE website_pageviews (
  website_pageview_id INTEGER PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  website_session_id INTEGER NOT NULL REFERENCES website_sessions (website_session_id),
  pageview_url TEXT NOT NULL
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  website_session_id INTEGER NOT NULL REFERENCES website_sessions (website_session_id),
  user_id INTEGER NOT NULL,
  primary_product_id INTEGER REFERENCES products (product_id),
  items_purchased INTEGER NOT NULL,
  price_usd NUMERIC(10, 2) NOT NULL,
  cogs_usd NUMERIC(10, 2) NOT NULL
);

CREATE TABLE order_items (
  order_item_id INTEGER PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  order_id INTEGER NOT NULL REFERENCES orders (order_id),
  product_id INTEGER NOT NULL REFERENCES products (product_id),
  is_primary_item SMALLINT NOT NULL CHECK (is_primary_item IN (0, 1)),
  price_usd NUMERIC(10, 2) NOT NULL,
  cogs_usd NUMERIC(10, 2) NOT NULL
);

CREATE TABLE order_item_refunds (
  order_item_refund_id INTEGER PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  order_item_id INTEGER NOT NULL REFERENCES order_items (order_item_id),
  order_id INTEGER NOT NULL REFERENCES orders (order_id),
  refund_amount_usd NUMERIC(10, 2) NOT NULL
);

CREATE INDEX idx_sessions_created_at ON website_sessions (created_at);
CREATE INDEX idx_sessions_utm_source ON website_sessions (utm_source);
CREATE INDEX idx_sessions_device ON website_sessions (device_type);
CREATE INDEX idx_pageviews_session ON website_pageviews (website_session_id);
CREATE INDEX idx_orders_session ON orders (website_session_id);
CREATE INDEX idx_orders_created_at ON orders (created_at);
CREATE INDEX idx_order_items_order ON order_items (order_id);
CREATE INDEX idx_order_items_product ON order_items (product_id);

COMMIT;
