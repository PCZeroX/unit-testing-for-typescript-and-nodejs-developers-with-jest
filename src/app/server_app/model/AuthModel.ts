import { ObjectWithId } from "../data/DataBase";

export type Account = {
  id: string;
  userName: string;
  password: string;
};

export interface SessionToken extends ObjectWithId {
  id: string;
  userName: string;
  valid: boolean;
  expirationDate: Date;
}
