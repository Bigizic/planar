export interface FoundationFormState {
  length: string;
  width: string;
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
  form: FoundationFormState;
  result: BoqResult | null;
  loading: boolean;
  error: string | null;
}
