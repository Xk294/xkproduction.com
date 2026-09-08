-- XKProduction D1 Schema
-- Run locally : npm run db.init.local
-- Run remote  : npm run db.push

-- 1. Leads — contact form submissions (thay Formspree)
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
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_service ON leads(service);

-- 2. Visitor logs — theo dõi lượt xem từng trang (upsert IP+path)
DROP TABLE IF EXISTS visitor_logs;
CREATE TABLE visitor_logs (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  ip            TEXT     NOT NULL,
  path          TEXT     NOT NULL,
  user_agent    TEXT,
  referrer      TEXT,
  visit_count   INTEGER  NOT NULL DEFAULT 1,
  first_seen_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(ip, path)
);
CREATE INDEX IF NOT EXISTS idx_visitor_path ON visitor_logs(path, last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_ip   ON visitor_logs(ip);

-- 3. Events — hành vi người dùng (click Zalo, nghe demo, v.v.)
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
