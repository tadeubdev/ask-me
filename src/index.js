const makeRetrieveOldMessagesService = require('./services/retrieve-old-messages-service');
const makeAskQuestionService = require('./services/ask-question-service');
const makeOnMountQuestionFromMessageService = require('./services/mount-question-from-message-service');
const makeOnNewMessageService = require('./services/on-new-message-service');
const makeReplyMessageService = require('./services/reply-message-service');
const makeClientWppconnectBuilder = require('./infra/wppconnect/make-client-wppconnect-builder');
const makeOnMessageService = require('./services/on-message-service');

(async () => {
  require('dotenv').config();

  const session = process.env.SESSION || null;
  if (!session) return console.log('No session provided');

  console.log('Starting session', session);

  try {
    const makeClientBuilder = makeClientWppconnectBuilder(session);
    const clientService = await makeClientService(makeClientBuilder);

    const retrieveOldMessagesService = makeRetrieveOldMessagesService(clientService.retrieveOldMessagesRepository);
    const onNewMessageService = makeOnNewMessageService(clientService.onNewMessageRepository);
    const replyMessageService = makeReplyMessageService(clientService.replyMessageRepository);

    const askQuestionRepository = askQuestionBrainlyRepository();
    const askQuestionService = makeAskQuestionService(askQuestionRepository);

    const onMesageInput = {
      makeOnMessageRepository: clientService.makeOnMessageRepository,
      mountQuestionFromMessageService: makeOnMountQuestionFromMessageService,
      askQuestionService: askQuestionService,
      replyMessageService: replyMessageService,
    };
    const onMessageService = makeOnMessageService(onMesageInput);

    await retrieveOldMessagesService.handle(onMessageService);
    await onNewMessageService.handle(onMessageService);

  } catch (e) {
    console.log('Something went wrong when creating the session', e);
  }
})();
