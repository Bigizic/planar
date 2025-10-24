import {
  SET_FORM_FIELD,
  SET_RESULT,
  SET_LOADING,
  SET_ERROR,
  RESET_FORM,
} from './constants';
import { BoqState } from './types';

const initialState: BoqState = {
  form: {
    length: '',
    width: '',
  },
  result: null,
  loading: false,
  error: null,
};

export const boqReducer = (state = initialState, action: any): BoqState => {
  switch (action.type) {
    case SET_FORM_FIELD:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value,
        },
      };
    case SET_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};
