import { successResponse } from "../utils/response-helper.js";
import { MESSAGES } from "../constants/message.constants.js";

class AuthController {
	constructor(authService) {
		this.authService = authService;
	}

	// 회원가입
	signUp = async (req, res, next) => {
		try {
			const userInfo = req.body;

			const data = await this.authService.signUp(userInfo);

			return successResponse({
				res,
				message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
				data,
			});
		} catch (error) {
			next(error);
		}
	};

	// 로그인
	signIn = async (req, res, next) => {
		try {
			const userInfo = req.body;

			const data = await this.authService.signIn(userInfo);
			req.session.userId = data;

			return successResponse({
				res,
				message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
			});
		} catch (error) {
			next(error);
		}
	};
}

export { AuthController };
