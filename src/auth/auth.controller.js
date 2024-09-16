class AuthController {
	constructor(authService) {
		this.authService = authService;
	}
	// 회원가입
	signUp = async (req, res, next) => {
		try {
			// const { email, password, passwordConfirm, name, profileUrl } = req.body;
			const userInfo = req.body;

			const data = await this.authService.signUp(userInfo);

			data.password = undefined;

			return res.status(201).json({
				status: 201,
				message: '회원가입에 성공했습니다.',
				data: data,
			});
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	// 로그인
	signIn = async (req, res, next) => {
		const userInfo = req.body;

		const data = await this.authService.signIn(userInfo);

		return res.status(201).json({
			status: 201,
			message: '로그인에 성공했습니다.',
			data: data,
		});
	}
}

export { AuthController };
