import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { MESSAGES } from "../constants/message.constants.js";
import { sucessResponse } from "../utils/response-helper.js";

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const userInfo = req.body;
      const data = await this.authService.signUp(userInfo);

      return sucessResponse(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data
      );
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  // 로그인
  signIn = async (req, res, next) => {
    try {
      const userInfo = req.body;

      const data = await this.authService.signIn(userInfo);
      req.session.userId = data;

      return res.status(201).json({
        status: 201,
        message: "로그인에 성공했습니다.",
        data: true,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export { AuthController };
