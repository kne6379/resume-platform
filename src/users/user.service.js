import { MESSAGES } from '../constants/message.constants.js';
import { HttpError } from '../error/http-error.js';
import { hashRounds } from '../constants/env.constants.js';
import bcrypt from 'bcrypt';

class UserService {
	constructor(prisma, authService) {
		this.prisma = prisma;
		this.authService = authService;
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

		// 클래스 인스턴스화
		const authService = new this.authService();

		// 입력한 비밀번호가 기존 비밀번호와 같은지 비교
		await authService.MatchedPassword(password, user.password);

		// 변경될 패스워드 만들기
		const newHashedPassword = await bcrypt.hash(newPassword, hashRounds);

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
			throw new HttpError.NotFound('존재하지 않는 유저입니다.');
		}
		return user;
	}
}

export { UserService };
