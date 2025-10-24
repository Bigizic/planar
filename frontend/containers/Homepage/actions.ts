import {
  SET_FORM_FIELD,
  SET_RESULT,
  SET_LOADING,
  SET_ERROR,
  RESET_FORM,
} from './constants';
import { BoqResult } from './types';
import api from '../../lib/api';

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

export const calculateBoq = (foundationForm: any, preliminaryForm: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    // Prepare the request payload with all necessary data
    const payload = {
      length: foundationForm.length,
      width: foundationForm.width,
      location: preliminaryForm.location,
      buildingType: preliminaryForm.buildingType,
      projectName: preliminaryForm.projectName,
      // Include additional preliminary data for potential use
      foundationType: preliminaryForm.foundationType,
      blockWidth: preliminaryForm.blockWidth,
      numberOfColumns: preliminaryForm.numberOfColumns,
      buildingPerimeter: preliminaryForm.buildingPerimeter,
    };

    const response = await api.post('/boq/calculate', payload);
    dispatch(setResult(response.data));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchBoqRecords = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const response = await api.get('/boq/records');
    return response.data;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch records'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchBoqRecordById = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const response = await api.get(`/boq/records/${id}`);
    return response.data;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch record'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteBoqRecord = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    await api.delete(`/boq/records/${id}`);
    return true;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Failed to delete record'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};
