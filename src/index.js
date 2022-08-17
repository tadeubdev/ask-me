const makeWppConnectSession = require('./start-channel');
const handleOnMessage = require('./handle-on-message');
const retrieveOldMessagesService = require('./services/retrieve-old-messages-service');
const askQuestionBrainlyRepository = require('./repositories/ask-question-brainly-repository');
const retrieveOldMessagesWppConnectRepository = require('./repositories/retrieve-old-messages-wppconnect-repository');

(async () => {
  require('dotenv').config();
  const session = process.env.SESSION || null;
  if (!session) return console.log('No session provided');

  console.log('Starting session', session);

  try {
    const client = await makeWppConnectSession(session);

    const retrieveOldMessagesRepository = retrieveOldMessagesWppConnectRepository(client);
    const askQuestionRepository = askQuestionBrainlyRepository;

    await retrieveOldMessagesService(retrieveOldMessagesRepository, async (event) => {
      await handleOnMessage(askQuestionRepository, event, (to, message) => {
        sendMessage(client, to, message);
      });
    });

    client.onMessage(async (event) => {
      await handleOnMessage(askQuestionRepository, event, (to, message) => {
        sendMessage(client, to, message);
      });
    });

  } catch (e) {
    console.log('Something went wrong when creating the session', e);
  }
})();
