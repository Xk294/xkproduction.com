-- XKProduction D1 Schema
-- Run locally : npm run db.init.local
-- Run remote  : npm run db.push

-- 1. Leads — contact form submissions (thay Formspree) & CRM Pipeline
DROP TABLE IF EXISTS leads;
CREATE TABLE leads (
  id          INTEGER  PRIMARY KEY AUTOINCREMENT,
  name        TEXT     NOT NULL,
  phone       TEXT     NOT NULL,
  email       TEXT,
  service     TEXT,
  message     TEXT,
  ip          TEXT,
  source      TEXT     NOT NULL DEFAULT 'contact',
  status      TEXT     NOT NULL DEFAULT 'new', -- 'new' | 'contacted' | 'quoting' | 'booked' | 'completed' | 'cancelled'
  notes       TEXT,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_service ON leads(service);
CREATE INDEX IF NOT EXISTS idx_leads_status  ON leads(status);

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

-- 3. Events — hành vi người dùng (click Zalo, nghe demo, CTA booking, v.v.)
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id         INTEGER  PRIMARY KEY AUTOINCREMENT,
  ip         TEXT     NOT NULL,
  action     TEXT     NOT NULL,
  label      TEXT,
  page       TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_events_action ON events(action, created_at DESC);

