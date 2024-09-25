import Joi from "joi";
import { MESSAGES } from "../../constants/message.constants.js";

const signUpSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"any.required": MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
		"string.email": MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT
	}),
	password: Joi.string().required().messages({
		"any.required": MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
	}),
});


const signInValidator = async (req, res, next) => {
	try {
		await signUpSchema.validateAsync(req.body);
		next();
	} catch (error) {
		next(error)
	}
}

export { signInValidator };