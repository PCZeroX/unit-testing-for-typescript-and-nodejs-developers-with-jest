import { PasswordErrors } from "../enums/PasswordErrors.enum";

type StringInfoTypes = {
  lowerCase?: string;
  upperCase?: string;
  characters?: string[];
  length: number;
  extraInfo: Object | undefined;
};

interface ICheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}
