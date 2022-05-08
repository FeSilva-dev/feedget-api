import { SubmitFeedbackUSeCase } from "./submit-feedback-use-case"

// spies = espiões

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUSeCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('SubmitFeedbackUseCase', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: "asdjuasihdjas",
      screenshot: 'data:image/png;base64,asdhyusahd',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: "asdjuasihdjas",
      screenshot: 'data:image/png;base64,asdhyusahd',
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'asdasd',
      comment: "",
      screenshot: 'data:image/png;base64,asdhyusahd',
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback with invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'asdasd',
      comment: "asdasd",
      screenshot: '123',
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
})