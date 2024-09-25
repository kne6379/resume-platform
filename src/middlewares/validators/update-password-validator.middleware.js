import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../../constants/auth.constants.js';

import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constants.js';

const updatePasswordSchema = Joi.object({
  password: Joi.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH).required().messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
  }),
  newPassword: Joi.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH).required().messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
    'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
    'string.max': MESSAGES.AUTH.COMMON.PASSWORD.MAX_LENGTH,
  }),
  newPasswordConfirm: Joi.string().required().valid(Joi.ref('newPassword')).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQURIED,
    'any.only': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD,
  }),
});

const updatePasswordValidator = async (req, res, next) => {
  try {
    await updatePasswordSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export { updatePasswordValidator };
