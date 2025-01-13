/*
  # Create Portfolio Schema

  1. New Tables
    - `case_studies`: Stores main case study information
    - `case_study_phases`: Stores process phases for each case study
    - `images`: Stores uploaded images

  2. Security
    - Enable RLS on all tables
    - Allow public read access without authentication
    - Allow authenticated write access
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS case_study_phases;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS case_studies;

-- Create case_studies table
CREATE TABLE case_studies (
  id text PRIMARY KEY,
  title text NOT NULL,
  client text,
  year text,
  role text,
  duration text,
  team text,
  challenge text,
  solution text,
  impact text[],
  thumbnail_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create case_study_phases table
CREATE TABLE case_study_phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id text REFERENCES case_studies(id) ON DELETE CASCADE,
  title text,
  description text,
  image text,
  "order" integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create images table
CREATE TABLE images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id text UNIQUE NOT NULL,
  data text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access"
  ON case_studies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access"
  ON case_study_phases FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access"
  ON images FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated write access
CREATE POLICY "Allow authenticated write access"
  ON case_studies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated write access"
  ON case_studies FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated write access"
  ON case_study_phases FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated write access"
  ON case_study_phases FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated write access"
  ON images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated write access"
  ON images FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX idx_case_study_phases_case_study_id ON case_study_phases(case_study_id);
CREATE INDEX idx_case_study_phases_order ON case_study_phases("order");
CREATE INDEX idx_images_image_id ON images(image_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON case_studies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON case_study_phases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();