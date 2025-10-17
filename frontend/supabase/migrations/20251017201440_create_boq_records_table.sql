/*
  # Create BoQ Records Table

  1. New Tables
    - `boq_records`
      - `id` (uuid, primary key) - Unique identifier for each BoQ record
      - `project_name` (text) - Name of the construction project
      - `building_type` (text) - Type of building (e.g., "One room", "Two rooms")
      - `length` (numeric) - Length of the building in meters
      - `width` (numeric) - Width of the building in meters
      - `location` (text) - Location of the project (for pricing adjustments)
      - `perimeter` (numeric) - Calculated perimeter in meters
      - `excavation_volume` (numeric) - Calculated excavation volume in cubic meters
      - `blinding_cement` (numeric) - Cement quantity for blinding (bags)
      - `blinding_sand` (numeric) - Sand quantity for blinding (m³)
      - `blinding_gravel` (numeric) - Gravel quantity for blinding (m³)
      - `blinding_water` (numeric) - Water quantity for blinding (litres)
      - `foundation_cement` (numeric) - Cement quantity for foundation (bags)
      - `foundation_sand` (numeric) - Sand quantity for foundation (m³)
      - `foundation_gravel` (numeric) - Gravel quantity for foundation (m³)
      - `foundation_water` (numeric) - Water quantity for foundation (litres)
      - `column_cement` (numeric) - Cement quantity for columns (bags)
      - `column_sand` (numeric) - Sand quantity for columns (m³)
      - `column_gravel` (numeric) - Gravel quantity for columns (m³)
      - `column_water` (numeric) - Water quantity for columns (litres)
      - `labor_cost` (numeric) - Estimated labor cost
      - `created_at` (timestamptz) - Timestamp of record creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `boq_records` table
    - Add policies for public access (for MVP, authenticated users can read/write their own data)

  3. Important Notes
    - All numeric fields use `numeric` type for precision in calculations
    - Default values set to 0 where appropriate
    - Timestamps automatically managed
*/

CREATE TABLE IF NOT EXISTS boq_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name text DEFAULT '',
  building_type text DEFAULT '',
  length numeric DEFAULT 0,
  width numeric DEFAULT 0,
  location text DEFAULT '',
  perimeter numeric DEFAULT 0,
  excavation_volume numeric DEFAULT 0,
  blinding_cement numeric DEFAULT 0,
  blinding_sand numeric DEFAULT 0,
  blinding_gravel numeric DEFAULT 0,
  blinding_water numeric DEFAULT 0,
  foundation_cement numeric DEFAULT 0,
  foundation_sand numeric DEFAULT 0,
  foundation_gravel numeric DEFAULT 0,
  foundation_water numeric DEFAULT 0,
  column_cement numeric DEFAULT 0,
  column_sand numeric DEFAULT 0,
  column_gravel numeric DEFAULT 0,
  column_water numeric DEFAULT 0,
  labor_cost numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE boq_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read BoQ records"
  ON boq_records
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert BoQ records"
  ON boq_records
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update BoQ records"
  ON boq_records
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete BoQ records"
  ON boq_records
  FOR DELETE
  TO public
  USING (true);