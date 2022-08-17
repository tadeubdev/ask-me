const onMessageWppConnectRepository = require('./on-message-wppconnect-repository');
const onNewMessageWppconnectRepository = require('./on-new-message-wppconnect-repository');
const replyMessageWppconnectRepository = require('./reply-message-wppconnect-repository');
const retrieveOldMessagesWppConnectRepository = require('./retrieve-old-messages-wppconnect-repository');

module.exports = {
  onMessageWppConnectRepository,
  onNewMessageWppconnectRepository,
  replyMessageWppconnectRepository,
  retrieveOldMessagesWppConnectRepository,
};
