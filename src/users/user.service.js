import { Messages } from "../constants/message.constants.js";

import { HttpError } from "../error/http-error.js";

import bcrypt from "bcrypt";



class UserService {

	constructor(prisma) {

		this.prisma = prisma;

	}



	// 내 정보 조회

	async getMe(id) {

		// 유저 조회
		const user = await this.findUserById(id);
		user.password = undefined;

		return user;
	}

	// 내 정보 수정
	async updateMe(id, name, profileUrl) {

		// 유저 조회
		const user = await this.findUserById(id);

		const updatedUser = await this.prisma.user.update({
			where: {
				id: id
			},
			data: {
				name, profileUrl
			},
			omit: {
				password: true
			}
		});


		return updatedUser;
	}



	// 패스워드 수정

	async updatePassword(id, password, newPassword, newPasswordConfirm) {

		// 유저 조회
		const user = await this.findUserById(id);

		// 현재 입력한 패스워드가 맞는지 확인
		const isMatchedPassword = await bcrypt.compare(password, user.password);

		if (!isMatchedPassword) {
			throw new HttpError.BadRequest(Messages.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD);
		}

		// 변경될 패스워드 만들기
		const hashRounds = +process.env.HASH_ROUNDS;
		const newHashedPassword = await bcrypt.hash(newPassword, hashRounds);



		// 유저의 패스워드 변경
		await this.prisma.user.update({
			where: {
				id
			},
			data: {
				password: newHashedPassword
			}
		});

		return true;
	}



	// 유저 조회
	async findUserById(id) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
		});

		if (!user) {
			throw new HttpError.NotFound('존재하지 않는 유저입니다.');
		}

		return user;
	}
}

export { UserService }