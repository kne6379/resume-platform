import { HttpError } from "../error/http-error.js";
import { Messages } from "../constants/message.constants.js";

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
				email
			}
		});

		// 중복일 경우 예외 처리
		if (existedEmail) {
			throw new HttpError.Conflict(Messages.AUTH.COMMON.EMAIL.DUPLICATED);
		}

		// 패스워드와 패스워드 확인이 같을 경우 예외 처리
		if (password !== passwordConfirm) {
			throw new HttpError.BadRequest(Messages.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD);
		}

		return await this.prisma.user.create({
			data: {
				email, password, name, profileUrl
			}
		});
	}

	// 로그인
	async signIn(userInfo) {
		const { email, password } = userInfo;

		const user = await this.prisma.user.findUnique({
			where: {
				email: email
			}
		});

		if (!user) {
			throw new HttpError.NotFound(Messages.USERS.NOT_FOUND);
		}

		if (password !== user.password) {
			throw new HttpError.BadRequest(Messages.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD);
		}

		return true;
	}
}

export { AuthService };
