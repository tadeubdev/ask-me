const replyMessageWppconnectRepository = (client) => {
  return {
    replyWith: async (message, content) => {
      const numero = message.from;
      const quotedMsgId = message.quotedMsgId;
      if (!numero || !quotedMsgId) return;

      return await client.reply(numero, content, quotedMsgId);
    },
  };
};

module.exports = replyMessageWppconnectRepository;
