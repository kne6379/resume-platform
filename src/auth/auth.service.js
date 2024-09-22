import { HttpError } from "../error/http-error.js";
import { MESSAGES } from "../constants/message.constants.js";
import bcrypt from "bcrypt";

class AuthService {
  constructor(prisma) {
    this.prisma = prisma;
  }
  // 회원가입
  async signUp(userInfo) {
    const { email, password, passwordConfirm, name, profileUrl } = userInfo;

    // 이메일 중복 조회
    const existedEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    // 중복일 경우 예외 처리
    if (existedEmail) {
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    // 패스워드와 패스워드 확인이 같지 않을 경우 예외 처리
    if (password !== passwordConfirm) {
      throw new HttpError.BadRequest(
        MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD
      );
    }
    const hashRounds = +process.env.HASH_ROUNDS;
    const hashedPassword = await bcrypt.hash(password, hashRounds);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profileUrl,
      },
    });
    user.password = undefined;
    return user;
  }

  // 로그인
  async signIn(userInfo) {
    const { email, password } = userInfo;

    // 이메일에 해당하는 가입 정보가 있는지 조회
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpError.NotFound(MESSAGES.USERS.NOT_FOUND);
    }

    // 입력한 평문 비밀번호와 암호화된 user의 비밀번호가 같은지 비교
    const isMatchedPassword = await bcrypt.compare(password, user.password);

    // 비밀번호가 같지 않을 경우 예외 처리
    if (!isMatchedPassword) {
      throw new HttpError.BadRequest(
        MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD
      );
    }

    return user.id;
  }
}

export { AuthService };
