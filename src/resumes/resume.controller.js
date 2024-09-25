import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { MESSAGES } from "../constants/message.constants.js";
import { successResponse } from "../utils/response-helper.js";

class ResumeController {
	constructor(resumeService) {
		this.resumeService = resumeService;
	}
	createResume = async (req, res, next) => {
		try {
			const userId = req.user.id;
			const { title, bio } = req.body;
			const data = await this.resumeService.createResume(userId, title, bio);

			return successResponse({
				res,
				status: HTTP_STATUS.CREATED,
				message: MESSAGES.RESUMES.CREATED.SUCCEED,
				data,
			});
		} catch (error) {
			res.json({ error });
		}
	};

	getResumes = async (req, res, next) => {
		try {
			const userId = req.user.id;
			const data = await this.resumeService.getResumes(userId);

			return successResponse({
				res,
				message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
				data,
			});
		} catch (error) {
			res.json({ error });
		}
	};

	getResumeById = async (req, res, next) => {
		try {
			const { userId } = req.body;
			const resumeId = +req.params.id;
			const data = await this.resumeService.getResumeById(resumeId, userId);

			return successResponse({
				res,
				message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
				data,
			});
		} catch (error) {
			res.json({ error });
		}
	};

	updateResume = async (req, res, next) => {
		try {
			const resumeId = +req.params.id;
			const { userId, title, bio } = req.body;
			const data = await this.resumeService.updateResume(
				resumeId,
				userId,
				title,
				bio
			);

			return successResponse({
				res,
				message: MESSAGES.RESUMES.UPDATE.SUCCEED,
				data,
			});
		} catch (error) {
			res.json({ error });
		}
	};

	deleteResume = async (req, res, next) => {
		try {
			const resumeId = +req.params.id;
			const { userId } = req.user.id;

			await this.resumeService.deleteResume(resumeId, userId);

			return successResponse({
				res,
				message: MESSAGES.RESUMES.DELETE.SUCCEED,
			});
		} catch (error) {
			res.json({ error });
		}
	};

	updateResumeStatus = async (req, res, next) => {
		try {
			const modifier = req.user.name;
			const resumeId = +req.params.id;
			const { newStatus } = req.body;
			const data = await this.resumeService.updateResumeStatus(
				modifier,
				resumeId,
				newStatus
			);
			return successResponse({
				res,
				message: MESSAGES.RESUMES.LOGGED_STATUS_CHANGE,
				data,
			});
		} catch (error) {
			res.json({ error });
		}
	};

	getResumeStatusLogs = async (req, res, next) => {
		try {
			const resumeId = +req.params.id;
			const data = await this.resumeService.getResumeStatusLogs(resumeId);

			return successResponse({
				res,
				message: MESSAGES.RESUMES.READ_STATUS_LOGS,
				data,
			});
		} catch (error) {
			res.json({ error });
		}
	};
}

export { ResumeController };
