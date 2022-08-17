const replyMessageService = (replyMessageRepository) => {
  return {
    from: async (message, content) => {
      return await replyMessageRepository.from(message, content);
    }
  };
};

module.exports = replyMessageService;
