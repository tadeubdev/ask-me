const checkNumberIsNotAllowed = require("../../../filters/check-number-is-not-allowed");

const onMessageWppConnectRepository = () => {
  return (message) => {
    return {
      checkMessageIsNotAllowed: () => {
        if (!message || message.type !== 'chat') {
          return true;
        }
        return checkNumberIsNotAllowed(message.from);
      },

      getContent: () => {
        return message && message.body? message.body : null;
      },
    };
  };
}

module.exports = onMessageWppConnectRepository;

