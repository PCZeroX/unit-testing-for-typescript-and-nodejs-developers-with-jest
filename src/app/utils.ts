import { StringInfoTypes } from "../typings/types/test";

export class StringUtils {
  public toUpperCase(arg: string) {
    if (!arg) {
      throw new Error("Invalid argument!");
    }
    return toUpperCase(arg);
  }
}

export const toUpperCase = (arg: string) => {
  return arg.toUpperCase();
};

export const getStringInfo = (arg: string): StringInfoTypes => {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
};
