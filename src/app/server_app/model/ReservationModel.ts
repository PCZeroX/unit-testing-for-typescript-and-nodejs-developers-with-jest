import { ObjectWithId } from "../data/DataBase";

export interface Reservation extends ObjectWithId {
  // id?: string;
  room?: string;
  user?: string;
  startDate?: string;
  endDate?: string;
}
