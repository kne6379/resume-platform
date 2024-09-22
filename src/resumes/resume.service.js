import { prisma } from "../configs/prisma-client.js";
import { MESSAGES } from "../constants/message.constants.js";
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

  getResumeById = async (resumeId, userId) => {
    const data = await this.existingResume(resumeId, userId);
    return data;
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

  updateResumeStatus = async (modifier, resumeId, newStatus) => {
    await this.prisma.$transaction(async (tx) => {
      const resume = await tx.resume.findUnique({ where: { id: resumeId } });

      if (!resume) {
        throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      }

      await tx.resume.update({
        where: { id: resumeId },
        data: { status: newStatus },
      });

      const data = await tx.resumeHistories.create({
        data: { modifier, resumeId, newStatus, oldStatus: resume.status },
      });

      return data;
    });
  };

  existingResume = async (resumeId, userId) => {
    const existingResume = await this.prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!existingResume) {
      throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
    }

    if (userId !== existingResume.userId) {
      throw new HttpError.Forbidden(MESSAGES.RESUMES.COMMON.FORBIDDEN);
    }

    return existingResume;
  };
}
export { ResumeService };
