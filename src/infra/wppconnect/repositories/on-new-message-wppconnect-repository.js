const onNewMessageWppconnectRepository = (client) => {
  return {
    onMessage: (callable) => {
      client.onMessage(callable);
    }
  };
};

module.exports = onNewMessageWppconnectRepository;
