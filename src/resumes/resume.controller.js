class ResumeController {
  constructor(resumeService) {
    this.resumeService = resumeService;
  }
  createResume = async (req, res, next) => {
    try {
      const { user, body } = req;

      const data = await this.resumeService.createResume(resumeInfo);
    } catch (error) {}
  };
}

export { ResumeController };
