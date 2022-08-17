const onNewMessageWppconnectRepository = (client) => {
  return {
    handle: (callable) => {
      client.onMessage(callable);
    }
  };
};

module.exports = onNewMessageWppconnectRepository;
