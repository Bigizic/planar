import {
  SET_FORM_FIELD,
  SET_RESULT,
  SET_LOADING,
  SET_ERROR,
  RESET_FORM,
} from './constants';
import { BoqResult } from './types';

export const setFormField = (field: string, value: string) => ({
  type: SET_FORM_FIELD,
  payload: { field, value },
});

export const setResult = (result: BoqResult) => ({
  type: SET_RESULT,
  payload: result,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: string | null) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetForm = () => ({
  type: RESET_FORM,
});

export const calculateBoq = (formData: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to calculate BoQ');
    }

    const result = await response.json();
    dispatch(setResult(result));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};
