import {
  SET_PRELIMINARY_FIELD,
  SET_PRELIMINARY_LOADING,
  SET_PRELIMINARY_ERROR,
  RESET_PRELIMINARY_FORM,
  ADD_ROOM,
  REMOVE_ROOM,
  UPDATE_ROOM,
} from './constants';
import { PreliminaryState } from './types';

const initialState: PreliminaryState = {
  form: {
    projectName: 'Untitled Project',
    buildingType: '',
    location: '',
    foundationType: '',
    blockWidth: '',
    numberOfColumns: '',
    buildingPerimeter: '',
    numberOfRooms: '',
    livingRoomArea: '',
    kitchenArea: '',
    diningRoomArea: '',
    additionalRooms: [],
  },
  loading: false,
  error: null,
};

export const preliminaryReducer = (state = initialState, action: any): PreliminaryState => {
  switch (action.type) {
    case SET_PRELIMINARY_FIELD:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value,
        },
      };
    case ADD_ROOM:
      return {
        ...state,
        form: {
          ...state.form,
          additionalRooms: [
            ...state.form.additionalRooms,
            {
              id: `room-${Date.now()}`,
              name: `Room ${state.form.additionalRooms.length + 1}`,
              area: '',
            },
          ],
        },
      };
    case REMOVE_ROOM:
      return {
        ...state,
        form: {
          ...state.form,
          additionalRooms: state.form.additionalRooms.filter(
            (room) => room.id !== action.payload
          ),
        },
      };
    case UPDATE_ROOM:
      return {
        ...state,
        form: {
          ...state.form,
          additionalRooms: state.form.additionalRooms.map((room) =>
            room.id === action.payload.roomId
              ? { ...room, [action.payload.field]: action.payload.value }
              : room
          ),
        },
      };
    case SET_PRELIMINARY_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_PRELIMINARY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_PRELIMINARY_FORM:
      return initialState;
    default:
      return state;
  }
};
