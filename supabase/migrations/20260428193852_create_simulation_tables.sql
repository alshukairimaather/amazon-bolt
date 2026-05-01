/*
  # Insider Theft Simulation - Data Capture Tables

  This migration sets up tables to log simulated user interactions for
  red team / insider threat awareness training.

  1. New Tables
    - `sim_sessions` - Tracks each visitor session (IP metadata, timestamp, user agent)
    - `sim_credentials` - Captures login form submissions (email, password attempt)
    - `sim_cart_events` - Logs add-to-cart and checkout events
    - `sim_search_events` - Logs search queries entered

  2. Security
    - RLS enabled on all tables
    - Only service role (edge functions / admin) can insert/read
    - No public access to captured data

  Notes:
    - All data is for authorized red team simulation only
    - Passwords stored as plain text intentionally to demonstrate insider threat risk
*/

CREATE TABLE IF NOT EXISTS sim_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_agent text,
  referrer text,
  page_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sim_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  email text,
  password text,
  submitted_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sim_cart_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  event_type text NOT NULL,
  product_name text,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sim_search_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  query text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sim_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sim_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE sim_cart_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sim_search_events ENABLE ROW LEVEL SECURITY;

-- Only service role can access (used by admin dashboard via service key)
CREATE POLICY "Service role can insert sessions"
  ON sim_sessions FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read sessions"
  ON sim_sessions FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert credentials"
  ON sim_credentials FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read credentials"
  ON sim_credentials FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert cart events"
  ON sim_cart_events FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read cart events"
  ON sim_cart_events FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert search events"
  ON sim_search_events FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read search events"
  ON sim_search_events FOR SELECT
  TO service_role
  USING (true);
