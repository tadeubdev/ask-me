const checkNumberIsNotAllowedHelper = require("../../../helpers/check-number-is-not-allowed-helper");

const onMessageWppConnectRepository = () => {
  return (message) => {
    return {
      checkMessageIsNotAllowed: () => {
        if (!message || message.type !== 'chat') {
          return true;
        }
        return checkNumberIsNotAllowedHelper(message.from);
      },

      getContent: () => {
        return message && message.body? message.body : null;
      },
    };
  };
}

module.exports = onMessageWppConnectRepository;

