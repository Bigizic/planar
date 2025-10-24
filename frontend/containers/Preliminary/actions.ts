import {
  SET_PRELIMINARY_FIELD,
  SET_PRELIMINARY_LOADING,
  SET_PRELIMINARY_ERROR,
  RESET_PRELIMINARY_FORM,
  ADD_ROOM,
  REMOVE_ROOM,
  UPDATE_ROOM,
} from './constants';

export const setPreliminaryField = (field: string, value: string) => ({
  type: SET_PRELIMINARY_FIELD,
  payload: { field, value },
});

export const setPreliminaryLoading = (loading: boolean) => ({
  type: SET_PRELIMINARY_LOADING,
  payload: loading,
});

export const setPreliminaryError = (error: string | null) => ({
  type: SET_PRELIMINARY_ERROR,
  payload: error,
});

export const resetPreliminaryForm = () => ({
  type: RESET_PRELIMINARY_FORM,
});

export const addRoom = () => ({
  type: ADD_ROOM,
});

export const removeRoom = (roomId: string) => ({
  type: REMOVE_ROOM,
  payload: roomId,
});

export const updateRoom = (roomId: string, field: 'name' | 'area', value: string) => ({
  type: UPDATE_ROOM,
  payload: { roomId, field, value },
});
