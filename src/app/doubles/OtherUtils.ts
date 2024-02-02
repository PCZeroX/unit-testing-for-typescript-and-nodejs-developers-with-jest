import { v4 } from "uuid";
import { StringInfoTypes } from "../../typings/types/test";

type LoggerServiceCallBack = (arg: string) => void;

export const toUpperCase = (arg: string) => {
  return arg.toUpperCase();
};

export const toLowerCaseWithId = (arg: string) => {
  return arg.toLowerCase() + v4();
};

export const calculateComplexity = (
  stringInfo: StringInfoTypes | undefined
) => {
  return Object.keys(stringInfo?.extraInfo!).length * stringInfo?.length!;
};

export const toUpperCaseWithCb = (
  arg: string | undefined,
  callBack: LoggerServiceCallBack
) => {
  if (!arg) {
    callBack("Invalid argument!");
    return;
  }

  callBack(`called function with ${arg}`);

  return arg.toUpperCase();
};

export class OtherStringUtils {
  public callExternalService() {
    console.log("Calling external service!!!");
  }

  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }

  public logString(arg: string) {
    console.log(arg);
  }
}
