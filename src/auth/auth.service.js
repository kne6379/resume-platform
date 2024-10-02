import { HttpError } from "../error/http-error.js";
import { MESSAGES } from "../constants/message.constants.js";
import { hashRounds } from "../constants/env.constants.js";
import { isMatchedPassword, hash } from "../utils/common-helpers.js";

class AuthService {
  constructor(prisma) {
    this.prisma = prisma;
  }
  // 회원가입
  async signUp(userInfo) {
    const { email, password, passwordConfirm, name, profileUrl } = userInfo;

    // 이메일 중복 조회
    const existedEmail = await this.findUserByEmail(email);

    // 중복일 경우 예외 처리
    if (existedEmail) {
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    // 패스워드와 패스워드 확인이 같지 않을 경우 예외 처리
    if (password !== passwordConfirm) {
      throw new HttpError.BadRequest(MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD);
    }

    const hashedPassword = await hash(password, hashRounds);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profileUrl,
      },
      omit: { password: true },
    });

    return user;
  }

  // 로그인
  async signIn(userInfo) {
    const { email, password } = userInfo;

    // 이메일에 해당하는 가입 정보가 있는지 조회
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new HttpError.NotFound(MESSAGES.USERS.NOT_FOUND);
    }
    // 입력한 비밀번호가 기존 비밀번호와 같은지 비교
    await isMatchedPassword(password, user.password);
    return user.id;
  }

  // 해당 이메일이 존재하는지 조회
  async findUserByEmail(email) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}

export { AuthService };
