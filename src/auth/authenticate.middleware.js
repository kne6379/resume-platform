import { prisma } from "../configs/prismaClient.js";
import { Messages } from "../constants/message.constants.js";
import { HttpError } from "../error/http-error.js";

async function authenticateMiddleware(req, res, next) {
	try {
		const { userId } = req.session;
		if (!userId) {
			throw new HttpError.BadRequest(Messages.AUTH.COMMON.JWT.NO_TOKEN);
		}
		const user = await prisma.user.findUnique({
			where: {
				id: +userId
			}
		});
		if (!user) {
			throw new HttpError.NotFound(Messages.USERS.NOT_FOUND);
		}
		req.user = user;
		next()
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export { authenticateMiddleware }