/*
  # Update Supabase Policies

  1. Changes
    - Enable anonymous access for read operations
    - Update RLS policies to allow public read access
    - Keep write operations restricted to authenticated users

  2. Security
    - Maintain write protection for authenticated users only
    - Allow public read access for portfolio viewing
*/

-- Update case_studies policies
DROP POLICY IF EXISTS "Enable read access for all users" ON case_studies;
CREATE POLICY "Enable read access for all users"
  ON case_studies FOR SELECT
  TO anon, authenticated
  USING (true);

-- Update case_study_phases policies
DROP POLICY IF EXISTS "Enable read access for all users" ON case_study_phases;
CREATE POLICY "Enable read access for all users"
  ON case_study_phases FOR SELECT
  TO anon, authenticated
  USING (true);

-- Update images policies
DROP POLICY IF EXISTS "Enable read access for all users" ON images;
CREATE POLICY "Enable read access for all users"
  ON images FOR SELECT
  TO anon, authenticated
  USING (true);

-- Ensure tables have RLS enabled
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;