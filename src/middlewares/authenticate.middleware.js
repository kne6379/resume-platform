import { prisma } from "../configs/prisma-client.js";
import { MESSAGES } from "../constants/message.constants.js";
import { HttpError } from "../error/http-error.js";

async function authenticateMiddleware(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      throw new HttpError.BadRequest(MESSAGES.AUTH.COMMON.JWT.NO_TOKEN);
    }
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });
    if (!user) {
      throw new HttpError.NotFound(MESSAGES.USERS.NOT_FOUND);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export { authenticateMiddleware };
