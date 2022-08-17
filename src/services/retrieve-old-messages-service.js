const manipulateMessage = async (messages, callable) => {
  if (!messages || messages.length === 0) return;
  for (let message of messages) {
    callable && await callable(message);
  }
}

const sendSeenToNumber = async (client, number) => {
  if (!client || !number) return;
  await client.sendSeen(number);
}

const getAllChats = async (client) => {
  if (!client) {
    return null;
  }
  return await client.getAllChatsWithMessages(true);
}

const retrieveOldMessagesService = async (client, callable) => {
  return new Promise(async (resolve) => {
    try {
      const chats = await getAllChats(client);
      if (!chats || chats.length === 0) return resolve();

      for (let chat of chats) {
        const messages = chat.msgs && chat.msgs.length? chat.msgs: [];
        const number = chat.from && chat.from.length? chat.from: null;
        await manipulateMessage(messages, callable);
        await sendSeenToNumber(client, number);
      }
    } catch (e) {
      console.error('Something went wrong when trying to get old messages: ', e.message);
    } finally {
      resolve();
    }
  });
}

module.exports = retrieveOldMessagesService;
