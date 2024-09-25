class UserController {
	constructor(userService) {
		this.userService = userService;
	}

	// 내 정보 조회

	getMe = async (req, res, next) => {
		try {
			const id = req.user.id;
			const data = await this.userService.getMe(+id);

			return res.status(200).json({
				status: 200,
				message: "내 정보 조회에 성공했습니다.",
				data: data,
			});
		} catch (error) {
			next(error);
		}
	};

	// 내 정보 수정

	updateMe = async (req, res, next) => {
		try {
			const id = req.user.id;
			const { name, profileUrl } = req.body;
			const data = await this.userService.updateMe(+id, name, profileUrl);

			return res.status(200).json({
				status: 200,
				message: "내 정보 수정에 성공했습니다.",
				data: data,
			});
		} catch (error) {
			next(error);
		}
	};

	// 패스워드 수정
	updatePassword = async (req, res, next) => {
		try {
			const id = req.user.id;
			const { password, newPassword, newPasswordConfirm } = req.body;

			const data = await this.userService.updatePassword(
				+id,
				password,
				newPassword,
				newPasswordConfirm
			);

			return res.status(200).json({
				status: 200,
				message: "패스워드 수정에 성공했습니다.",
				data: data,
			});
		} catch (error) {
			next(error);
		}
	};
}

export { UserController };
