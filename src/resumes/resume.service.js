import { prisma } from "../configs/prisma-client.js";
import { Messages } from "../constants/message.constants.js";
import { HttpError } from "../error/http-error.js";

class ResumeService {
  constructor() {
    this.prisma = prisma;
  }

  createResume = async (userId, title, bio) => {
    return await this.prisma.resume.create({
      data: { userId, title, bio },
    });
  };

  getResumes = async (userId) => {
    return await this.prisma.resume.findMany({
      where: { userId },
      select: { title: true, updatedAt: true },
    });
  };

  getResumeById = async (resumeId) => {
    const data = await this.prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!data) {
      throw new HttpError.NotFound(Messages.RESUMES.NOT_FOUND);
    }
  };

  updateResume = async (resumeId, userId, title, bio) => {
    await this.existingResume(resumeId, userId);

    const data = await this.prisma.resume.update({
      where: { id: resumeId, userId },
      data: { title, bio },
    });

    return data;
  };

  deleteResume = async (resumeId, userId) => {
    await this.existingResume(resumeId, userId);

    await this.prisma.resume.delete({
      where: { id: resumeId, userId },
    });
  };

  existingResume = async (resumeId, userId) => {
    const existingResume = await this.prisma.resume.findUnique({
      where: { id: resumeId, userId },
    });

    if (!existingResume) {
      throw new HttpError.NotFound(Messages.RESUMES.USER_NOT_FOUND);
    }
  };
}

export { ResumeService };
