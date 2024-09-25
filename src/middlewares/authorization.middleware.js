import { MESSAGES } from "../constants/message.constants.js";
import { HttpError } from "../error/http-error.js";

function authorizationMiddleware(roles) {
  return (req, res, next) => {
    try {
      const user = req.user;
      const hasPermission = user && roles.includes(user.role);
      if (!hasPermission) {
        throw new HttpError.Forbidden(MESSAGES.AUTH.COMMON.FORBIDDEN);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export { authorizationMiddleware };
