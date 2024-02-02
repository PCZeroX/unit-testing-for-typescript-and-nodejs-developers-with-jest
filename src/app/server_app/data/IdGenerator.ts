import { randomBytes } from "crypto";

export const generateRandomId = () => {
  const randomId = randomBytes(10).toString("hex");

  return randomId;
};
