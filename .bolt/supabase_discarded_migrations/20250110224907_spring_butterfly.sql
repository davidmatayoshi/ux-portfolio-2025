/*
  # Data Migration

  1. Changes
    - Drop existing policies to avoid conflicts
    - Create new policies for public read access
    - Create new policies for authenticated write access
    - Add performance indexes
  
  2. Security
    - Maintain RLS on all tables
    - Add policies for both anonymous and authenticated users
    - Restrict write access to authenticated users only
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON case_studies;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON case_studies;
DROP POLICY IF EXISTS "Enable read access for all users" ON case_study_phases;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON case_study_phases;
DROP POLICY IF EXISTS "Enable read access for all users" ON images;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON images;

-- Create new policies for public read access
CREATE POLICY "Enable read access for all users"
  ON case_studies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable read access for all users"
  ON case_study_phases FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable read access for all users"
  ON images FOR SELECT
  TO public
  USING (true);

-- Create new policies for authenticated write access
CREATE POLICY "Enable write access for authenticated users"
  ON case_studies FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable write access for authenticated users"
  ON case_study_phases FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable write access for authenticated users"
  ON images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance if they don't exist
CREATE INDEX IF NOT EXISTS idx_case_study_phases_case_study_id 
  ON case_study_phases(case_study_id);

CREATE INDEX IF NOT EXISTS idx_case_study_phases_order 
  ON case_study_phases("order");

CREATE INDEX IF NOT EXISTS idx_images_image_id 
  ON images(image_id);