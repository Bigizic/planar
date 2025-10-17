import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BoqRecord {
  id?: string;
  project_name: string;
  building_type: string;
  length: number;
  width: number;
  location: string;
  perimeter: number;
  excavation_volume: number;
  blinding_cement: number;
  blinding_sand: number;
  blinding_gravel: number;
  blinding_water: number;
  foundation_cement: number;
  foundation_sand: number;
  foundation_gravel: number;
  foundation_water: number;
  column_cement: number;
  column_sand: number;
  column_gravel: number;
  column_water: number;
  labor_cost: number;
  created_at?: string;
  updated_at?: string;
}
