const onNewMessageService = (onNewMessageRepository) => {
  return {
    onMessage: async (callable) => {
      onNewMessageRepository.onMessage(callable);
    },
  };
};

module.exports = onNewMessageService;
