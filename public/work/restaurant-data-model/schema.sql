-- Restaurant & Cafe Chain — UC Davis final assignment
-- Public-safe schema: no fictional customer, health, contact, or payment records.

PRAGMA foreign_keys = ON;

CREATE TABLE branches (
  branch_id INTEGER PRIMARY KEY,
  branch_name TEXT NOT NULL,
  city TEXT NOT NULL,
  opened_date TEXT NOT NULL
);

CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL, -- PII
  last_name TEXT NOT NULL, -- PII
  role TEXT NOT NULL,
  hire_date TEXT NOT NULL,
  branch_id INTEGER NOT NULL REFERENCES branches(branch_id)
);

CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL, -- PII
  last_name TEXT NOT NULL, -- PII
  email TEXT NOT NULL UNIQUE, -- PII
  phone TEXT, -- PII
  date_of_birth TEXT, -- PII
  created_at TEXT NOT NULL
);

CREATE TABLE customer_health_profiles (
  customer_id INTEGER PRIMARY KEY, -- 1:1 natural key
  allergies TEXT, -- PHI
  dietary_restrictions TEXT, -- PHI
  updated_at TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE payment_methods (
  payment_method_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
  card_brand TEXT, -- CFI
  card_last4 TEXT, -- CFI
  billing_postal_code TEXT, -- CFI / PII
  is_default INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE contact_events (
  contact_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
  channel TEXT NOT NULL, -- CPNI
  contact_datetime TEXT NOT NULL, -- CPNI
  phone_number TEXT, -- CPNI / PII
  marketing_consent INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE menu_categories (
  category_code TEXT PRIMARY KEY, -- natural key
  category_name TEXT NOT NULL
);

CREATE TABLE menu_items (
  item_id INTEGER PRIMARY KEY,
  item_name TEXT NOT NULL,
  category_code TEXT NOT NULL REFERENCES menu_categories(category_code),
  price REAL NOT NULL,
  is_available INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
  employee_id INTEGER NOT NULL REFERENCES employees(employee_id),
  branch_id INTEGER NOT NULL REFERENCES branches(branch_id),
  order_datetime TEXT NOT NULL,
  order_status TEXT NOT NULL
);

CREATE TABLE order_items (
  order_item_id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(order_id),
  item_id INTEGER NOT NULL REFERENCES menu_items(item_id),
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL
);

CREATE TABLE payments (
  payment_id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL UNIQUE REFERENCES orders(order_id), -- 1:1
  payment_method_id INTEGER REFERENCES payment_methods(payment_method_id),
  amount REAL NOT NULL, -- CFI
  method_type TEXT NOT NULL,
  paid_at TEXT NOT NULL
);
