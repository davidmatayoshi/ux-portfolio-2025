/*
  # Case Studies and Images Schema

  1. New Tables
    - `case_studies`
      - `id` (uuid, primary key)
      - `title` (text)
      - `client` (text)
      - `year` (text)
      - `role` (text)
      - `duration` (text)
      - `team` (text)
      - `challenge` (text)
      - `solution` (text)
      - `impact` (text[])
      - `thumbnail_image` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `case_study_phases`
      - `id` (uuid, primary key)
      - `case_study_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `image` (text)
      - `order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `images`
      - `id` (uuid, primary key)
      - `image_id` (text, unique)
      - `data` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
CREATE TABLE IF NOT EXISTS case_study_phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid REFERENCES case_studies(id) ON DELETE CASCADE,
  title text,
  description text,
  image text,
  "order" integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create images table
CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id text UNIQUE NOT NULL,
  data text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to all users"
  ON case_studies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to authenticated users"
  ON case_studies
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow read access to all users"
  ON case_study_phases
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to authenticated users"
  ON case_study_phases
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow read access to all users"
  ON images
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to authenticated users"
  ON images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON case_studies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_case_study_phases_updated_at
  BEFORE UPDATE ON case_study_phases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();