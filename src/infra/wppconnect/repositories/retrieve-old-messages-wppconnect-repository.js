const retrieveOldMessagesWppConnectRepository = (client) => {
  const sendSeenToNumber = async (number) => {
    const number = chat && chat.from && chat.from.length? chat.from: null;
    if (!number) return;
    await client.sendSeen(number);
  };

  return {
    getAllChats: async (withOldOnly = true) => {
      return await client.getAllChatsWithMessages(withOldOnly);
    },

    applyCallableToChat: async (chat, callable) => {
      const messages = chat.msgs && chat.msgs.length? chat.msgs: [];
      if (!messages || messages.length === 0) return;

      for (let message of messages) {
        await callable(message);
        await sendSeenToNumber(chat);
      }
    },
  };
}

module.exports = retrieveOldMessagesWppConnectRepository;
