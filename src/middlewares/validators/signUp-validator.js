import Joi from "joi";

const signUpSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	passwordConfirm: Joi.string().min(8).required(),
	name: Joi.string().min(2).required(),
	profileUrl: Joi.string().optional()
})

async function signUpValidator(req, res, next) {
	try {
		await signUpSchema.validateAsync(req.body);
		next();
	} catch (error) {
		next(error)
	}
}