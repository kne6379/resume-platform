import { HTTP_STATUS } from "../constants/http-status.constants.js";

const sucessResponse = (
  res,
  status = HTTP_STATUS.OK,
  message = "성공적으로 요청이 전달되었습니다.",
  data = null
) => {
  return res.status(status).json({ message, data });
};

export { sucessResponse };
