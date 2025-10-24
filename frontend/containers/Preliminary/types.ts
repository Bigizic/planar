export interface RoomArea {
  id: string;
  name: string;
  area: string;
}

export interface PreliminaryFormState {
  projectName: string;
  buildingType: string;
  location: string;
  foundationType: string;
  blockWidth: string;
  numberOfColumns: string;
  buildingPerimeter: string;
  numberOfRooms: string;
  livingRoomArea: string;
  kitchenArea: string;
  diningRoomArea: string;
  additionalRooms: RoomArea[];
}

export interface PreliminaryState {
  form: PreliminaryFormState;
  loading: boolean;
  error: string | null;
}
