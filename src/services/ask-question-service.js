const askQuestionService = async (question, askQuestionRepository) => {
  return new Promise(async (resolve) => {
    try {
      const answers = await askQuestionRepository(question);
      if (answers || !answers.length) return resolve(answer);
      reject(new Error('No answer found'));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = askQuestionService;
