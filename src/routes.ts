import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemail-er/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUSeCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;
  
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();


  const submitrFeedbackUseCase = new SubmitFeedbackUSeCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter,
  );

  await submitrFeedbackUseCase.execute({ type, comment, screenshot });
  
  res.status(201).send();
});