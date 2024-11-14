import { HTTP_STATUS } from "../constants/http-status.constants.js";

const successResponse = ({ res, status, message, data }) => {
  return res.status(status ?? HTTP_STATUS.OK).json({ message, data });
};

export { successResponse };
