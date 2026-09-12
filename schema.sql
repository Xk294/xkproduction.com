-- XKProduction D1 Schema
-- Run locally : npm run db.init.local
-- Run remote  : npm run db.push

-- 1. Leads — contact form submissions (thay Formspree) & CRM Pipeline
DROP TABLE IF EXISTS leads;
CREATE TABLE leads (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  name         TEXT     NOT NULL,
  phone        TEXT     NOT NULL,
  email        TEXT,
  service      TEXT,
  message      TEXT,
  ip           TEXT,
  source       TEXT     NOT NULL DEFAULT 'contact',
  status       TEXT     NOT NULL DEFAULT 'new', -- 'new' | 'contacted' | 'quoting' | 'booked' | 'completed' | 'cancelled'
  notes        TEXT,
  country      TEXT,
  city         TEXT,
  device       TEXT,
  os           TEXT,
  browser      TEXT,
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  utm_content  TEXT,
  landing_page TEXT,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_service ON leads(service);
CREATE INDEX IF NOT EXISTS idx_leads_status  ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_utm     ON leads(utm_source);

-- 2. Visitor logs — theo dõi lượt xem từng trang (upsert IP+path) & Inbound Channels
DROP TABLE IF EXISTS visitor_logs;
CREATE TABLE visitor_logs (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  ip            TEXT     NOT NULL,
  path          TEXT     NOT NULL,
  user_agent    TEXT,
  referrer      TEXT,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  utm_content   TEXT,
  country       TEXT,
  city          TEXT,
  device        TEXT,
  os            TEXT,
  browser       TEXT,
  is_bot        INTEGER  NOT NULL DEFAULT 0,
  visit_count   INTEGER  NOT NULL DEFAULT 1,
  first_seen_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(ip, path)
);
CREATE INDEX IF NOT EXISTS idx_visitor_path      ON visitor_logs(path, last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_ip        ON visitor_logs(ip);
CREATE INDEX IF NOT EXISTS idx_visitor_last_seen ON visitor_logs(last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_utm       ON visitor_logs(utm_source);
CREATE INDEX IF NOT EXISTS idx_visitor_city      ON visitor_logs(city);

-- 3. Events — hành vi người dùng (click Zalo, nghe demo, CTA booking, v.v.)
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id         INTEGER  PRIMARY KEY AUTOINCREMENT,
  ip         TEXT     NOT NULL,
  action     TEXT     NOT NULL,
  label      TEXT,
  page       TEXT,
  device     TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_events_action ON events(action, created_at DESC);

-- 4. Orders — đơn hàng số tự động (preset, khoá học, cọc online)
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  order_code   TEXT     NOT NULL UNIQUE,
  client_name  TEXT,
  client_phone TEXT,
  client_email TEXT,
  product_type TEXT     NOT NULL, -- 'preset' | 'course' | 'mix_deposit' | 'studio_deposit'
  product_id   TEXT,
  product_label TEXT,
  amount       INTEGER  NOT NULL,
  status       TEXT     NOT NULL DEFAULT 'pending', -- 'pending' | 'paid' | 'cancelled'
  download_url TEXT,
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_orders_code ON orders(order_code);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- 5. Bookings — lịch thu studio có cọc (zero no-show)
DROP TABLE IF EXISTS bookings;
CREATE TABLE bookings (
  id             INTEGER  PRIMARY KEY AUTOINCREMENT,
  order_code     TEXT     NOT NULL,
  client_name    TEXT     NOT NULL,
  client_phone   TEXT     NOT NULL,
  service_type   TEXT     NOT NULL,
  booking_date   TEXT,
  booking_time   TEXT,
  notes          TEXT,
  status         TEXT     NOT NULL DEFAULT 'deposit_pending', -- 'deposit_pending' | 'confirmed' | 'completed' | 'cancelled'
  deposit_amount INTEGER,
  total_estimate INTEGER,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_bookings_code ON bookings(order_code);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
