import Joi from "joi";
import { MESSAGES } from "../../constants/message.constants.js";

const signUpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    "string.email": MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
    "string.min": "비밀번호는 6자리 이상이어야 합니다.",
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQURIED,
    "any.only": MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD,
  }),
  name: Joi.string().min(2).required().messages({
    "any.required": MESSAGES.AUTH.COMMON.NAME.REQURIED,
    "string.min": "이름은 최소 2자리 이상어야 합니다.",
  }),
  profileUrl: Joi.string().messages({
    "any.required": "프로필 URL을 입력해주세요.",
  }),
});

const signUpValidator = async (req, res, next) => {
  try {
    await signUpSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export { signUpValidator };
