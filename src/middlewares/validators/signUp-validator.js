import Joi from "joi";

const signUpSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"any.required": "이메일을 입력해주세요.",
		"string.email": "이메일 형식이 아닙니다."
	}),
	password: Joi.string().min(6).required().messages({
		"any.required": "비밀번호를 입력해주세요.",
		"string.min": "비밀번호는 6자리 이상이어야 합니다."
	}),
	passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
		"any.required": "비밀번호 확인을 입력해주세요.",
		"any.only": "패스워드가 일치하지 않습니다."
	}),
	name: Joi.string().min(2).required().messages({
		"any.required": "이름을 입력해주세요.",
		"string.min": "이름은 최소 2자리 이상어야 합니다."
	}),
});


const signUpValidator = async (req, res, next) => {
	try {
		await signUpSchema.validateAsync(req.body);
		next();
	} catch (error) {
		next(error)
	}
}

export { signUpValidator };