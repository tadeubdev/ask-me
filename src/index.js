const makeWppConnectSession = require('./start-channel');
const handleOnMessage = require('./handle-on-message');
const handleGetOldMessages = require('./handle-get-old-messages');
const askQuestionBrainlyRepository = require('./repositories/ask-question-brainly-repository');

(async () => {
  require('dotenv').config();
  const session = process.env.SESSION || null;
  if (!session) return console.log('No session provided');

  console.log('Starting session', session);

  try {
    const askQuestionRepository = askQuestionBrainlyRepository;
    const client = await makeWppConnectSession(session);

    client.onMessage(async (event) => {
      await handleOnMessage(askQuestionRepository, event, (to, message) => {
        sendMessage(client, to, message);
      });
    });

    handleGetOldMessages(client, async (event) => {
      await handleOnMessage(askQuestionRepository, event, (to, message) => {
        sendMessage(client, to, message);
      });
    });
  } catch (e) {
    console.log('Something went wrong when creating the session', e);
  }
})();
