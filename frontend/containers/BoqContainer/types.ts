export interface BoqFormState {
  projectName: string;
  buildingType: string;
  length: string;
  width: string;
  location: string;
}

export interface MaterialCalculation {
  cement: number;
  sand: number;
  gravel: number;
  water: number;
}

export interface BoqResult {
  excavationVolume: number;
  blinding: MaterialCalculation;
  foundation: MaterialCalculation;
  column: MaterialCalculation;
  laborCost: number;
  recordId?: string;
}

export interface BoqState {
  form: BoqFormState;
  result: BoqResult | null;
  loading: boolean;
  error: string | null;
}
