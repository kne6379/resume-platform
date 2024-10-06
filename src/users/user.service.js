import { MESSAGES } from "../constants/message.constants.js";
import { HttpError } from "../error/http-error.js";
import { HASH_ROUNDS } from "../constants/env.constants.js";
import { isMatchedPassword, hash } from "../utils/common-helpers.js";

class UserService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 내 정보 조회
  async getMe(id) {
    // 유저 조회
    const user = await this.findUserById(id);
    return user;
  }

  // 내 정보 수정
  async updateMe(id, name, profileUrl) {
    // 유저 조회
    await this.findUserById(id);

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        profileUrl,
      },
      omit: {
        password: true,
      },
    });

    return updatedUser;
  }

  // 패스워드 수정
  async updatePassword(id, password, newPassword) {
    // 유저 조회
    const user = await this.findUserById(id, false);

    // 입력한 비밀번호가 기존 비밀번호와 같은지 비교
    await isMatchedPassword(password, user.password);

    // 변경될 패스워드 만들기
    const newHashedPassword = await hash(newPassword, HASH_ROUNDS);

    // 유저의 패스워드 변경
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newHashedPassword,
      },
    });

    return true;
  }

  // 유저 조회
  async findUserById(id, includePassword = true) {
    const user = await this.prisma.user.findUnique({
      omit: { password: includePassword },
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpError.NotFound(MESSAGES.USERS.NOT_FOUND);
    }
    return user;
  }
}

export { UserService };
