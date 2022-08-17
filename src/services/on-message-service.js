const onMessageService = async ({ makeOnMessageRepository, mountQuestionFromMessageService, askQuestionService, replyMessageService }) => {
  return async (message) => {
    const onMessageRepository = makeOnMessageRepository(message);
    const question = mountQuestionFromMessageService(onMessageRepository);
    if (!question) return;

    const answers = await askQuestionService.for(question);
    if (!answers.length) return;

    const content = `#answers\n\n${answers.join('\n')}`;
    await replyMessageService.replyWith(message, content);
  };
};

module.exports = onMessageService;
