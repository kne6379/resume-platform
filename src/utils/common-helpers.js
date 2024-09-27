import { prisma } from "../configs/prisma-client.js";
import { MESSAGES } from "../constants/message.constants.js";
import { HttpError } from "../error/http-error.js";
import bcrypt from "bcrypt";

// 패스워드 검사
async function isMatchedPassword(password, userPassword) {
  const isMatchedPassword = await bcrypt.compare(password, userPassword);
  if (!isMatchedPassword) {
    throw new HttpError.BadRequest(MESSAGES.AUTH.COMMON.PASSWORD.INVALID);
  }
  return true;
}

// 패스워드 해시
async function hash(password, hashRounds) {
  const hashedPassword = await bcrypt.hash(password, hashRounds);
  return hashedPassword;
}

export { isMatchedPassword, hash };
