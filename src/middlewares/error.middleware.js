import { HTTP_STATUS } from "../constants/http-status.constants.js";


async function errorMiddleware(error, req, res, next) {
	if (error) {
		return res.status(error.status).send(error.message);
	}
	return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send('서버에 예상치 못한 오류가 발생했습니다.');
}

export { errorMiddleware };