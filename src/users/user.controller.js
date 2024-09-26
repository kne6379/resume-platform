import { MESSAGES } from '../constants/message.constants.js';
import { successResponse } from '../utils/response-helper.js';
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // 내 정보 조회
  getMe = async (req, res, next) => {
    try {
      const id = req.user.id;
      const data = await this.userService.getMe(id);

      return successResponse({
        res,
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data,
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
      const data = await this.userService.updateMe(id, name, profileUrl);

      return successResponse({
        res,
        message: MESSAGES.USERS.UPDATE_ME.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // 패스워드 수정, newPasswordConfirm = 비밀번호 확인
  updatePassword = async (req, res, next) => {
    try {
      const id = req.user.id;
      const { password, newPassword } = req.body;

      await this.userService.updatePassword(id, password, newPassword);

      return successResponse({
        res,
        message: MESSAGES.USERS.UPDATE_PASSWORD.SUCCEED,
      });
    } catch (error) {
      next(error);
    }
  };
}

export { UserController };
