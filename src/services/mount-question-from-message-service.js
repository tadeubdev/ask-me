const mountQuestionFromMessageService = (onMessageRepository) => {
  if (onMessageRepository.checkMessageIsNotAllowed()) return null;

  const content = onMessageRepository.getContent();
  if (!content || content.indexOf('#ask ') !== 0) return null;

  return content.toLowerCase().replace('#ask ', '').trim();
}

module.exports = mountQuestionFromMessageService;
