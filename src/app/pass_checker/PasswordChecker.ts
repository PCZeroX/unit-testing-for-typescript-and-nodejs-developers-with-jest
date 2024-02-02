import { ICheckResult } from "../../typings/types/test";
import { PasswordErrors } from "../../typings/enums/PasswordErrors.enum";

export class PasswordChecker {
  public checkPassword(password: string): ICheckResult {
    const reasons: PasswordErrors[] = [];

    this.checkForLength(password, reasons);
    this.checkForUpperCase(password, reasons);
    this.checkForLowerCase(password, reasons);
    return {
      valid: !reasons.length,
      reasons: reasons,
    };
  }

  public checkAdminPassword(password: string): ICheckResult {
    const basicCheck = this.checkPassword(password);
    this.checkForNumber(password, basicCheck.reasons);
    return {
      valid: !basicCheck.reasons.length,
      reasons: basicCheck.reasons,
    };
  }

  private checkForNumber(password: string, reasons: PasswordErrors[]) {
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER);
    }
  }

  private checkForLength(password: string, reasons: PasswordErrors[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
  }

  private checkForUpperCase(password: string, reasons: PasswordErrors[]) {
    if (password == password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }
  }

  private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
    if (password == password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
    return {
      valid: !reasons.length,
      reasons: reasons,
    };
  }
}
