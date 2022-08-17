const askQuestionService = require("./services/ask-question-service");

const checkMessageIsNotAllowed = (message) => {
  if (!message || message.type !== 'chat') return true;

  const groupNumber = process.env.GROUP_NUMBER || null;
  return message.from.indexOf(groupNumber) !== 0;
}

const handleOnMessage = async (message, callable) => {
  return new Promise(async (resolve) => {
    if (checkMessageIsNotAllowed(message)) {
      console.info('Message is not allowed from: ' + (message.from || 'unknown'));
      return resolve();
    }
    console.log('Message received', message.from, message.body);
    const body = message.body? message.body.toLowerCase() : null;
    if (!body || body.indexOf('#ask') !== 0) return resolve();

    const question = body.replace('#ask', '').trim();
    const answer = await askQuestionService(question);
    const messageToSend = `#answer\n\n${answer}`;
    callable(message.from, messageToSend);
    resolve();
  });
}

module.exports = handleOnMessage;
