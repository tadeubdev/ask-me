const askQuestionService = async (askQuestionRepository) => {
  return {
    for: async (question) => {
      return await askQuestionRepository(question);
    },
  };
}

module.exports = askQuestionService;
