export const BUILDING_TYPES = [
  'One room',
  'Two rooms',
  'Three rooms',
  'Four rooms',
  'Custom',
] as const;

export const LOCATIONS = [
  'Lagos',
  'Abuja',
  'Port Harcourt',
  'Ibadan',
  'Kano',
  'Other',
] as const;

export const FOUNDATION_TYPES = [
  'Strip Foundation',
  'Raft Foundation',
  'Pad Foundation',
  'Pile Foundation',
] as const;

export const BLOCK_WIDTHS = [
  '6 inches',
  '9 inches',
  '12 inches',
] as const;

export const SET_PRELIMINARY_FIELD = 'preliminary/SET_FIELD';
export const SET_PRELIMINARY_LOADING = 'preliminary/SET_LOADING';
export const SET_PRELIMINARY_ERROR = 'preliminary/SET_ERROR';
export const RESET_PRELIMINARY_FORM = 'preliminary/RESET_FORM';
export const ADD_ROOM = 'preliminary/ADD_ROOM';
export const REMOVE_ROOM = 'preliminary/REMOVE_ROOM';
export const UPDATE_ROOM = 'preliminary/UPDATE_ROOM';
