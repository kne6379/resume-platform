import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { Messages } from "../constants/message.constants.js";
import { sucessResponse } from "../utils/response-helper.js";

class ResumeController {
  constructor(resumeService) {
    this.resumeService = resumeService;
  }
  createResume = async (req, res, next) => {
    try {
      const { userId, title, bio } = req.body;
      const data = await this.resumeService.createResume(userId, title, bio);

      return sucessResponse(
        res,
        HTTP_STATUS.CREATED,
        Messages.RESUMES.CREATED.SUCCEED,
        data
      );
    } catch (error) {
      res.json({ error });
    }
  };

  getResumes = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const data = await this.resumeService.getResumes(userId);
      return sucessResponse(
        res,
        HTTP_STATUS.OK,
        Messages.RESUMES.READ_LIST.SUCCEED,
        data
      );
    } catch (error) {
      res.json({ error });
    }
  };

  getResumeById = async (req, res, next) => {
    try {
      const resumeId = +req.params.id;
      const data = await this.resumeService.getResumeById(resumeId);

      return sucessResponse(
        res,
        HTTP_STATUS.OK,
        Messages.RESUMES.READ_DETAIL.SUCCEED,
        data
      );
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

      return sucessResponse(
        res,
        HTTP_STATUS.OK,
        Messages.RESUMES.UPDATE.SUCCEED,
        data
      );
    } catch (error) {
      res.json({ error });
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const resumeId = +req.params.id;
      const { userId } = req.body;

      await this.resumeService.deleteResume(resumeId, userId);

      return sucessResponse(
        res,
        HTTP_STATUS.OK,
        Messages.RESUMES.DELETE.SUCCEED,
        null
      );
    } catch (error) {
      res.json({ error });
    }
  };
}

export { ResumeController };
