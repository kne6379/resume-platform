import Joi from "joi";
import { MESSAGES } from "../../constants/message.constants.js";
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "../../constants/auth.constants.js";

const signUpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    "string.email": MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  password: Joi.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH).required().messages({
    "any.required": MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
    "string.min": MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
    "string.max": MESSAGES.AUTH.COMMON.PASSWORD.MAX_LENGTH,
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQURIED,
    "any.only": MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD,
  }),
  name: Joi.string().min(2).required().messages({
    "any.required": MESSAGES.AUTH.COMMON.NAME.REQURIED,
    "string.min": MESSAGES.AUTH.COMMON.NAME.MIN_LENGTH,
  }),
  profileUrl: Joi.string().messages({
    "any.required": MESSAGES.AUTH.COMMON.PROFILE_URL.REQUIRED,
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
