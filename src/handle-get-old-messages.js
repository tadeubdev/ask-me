const manipulateMessage = async (messages, callable) => {
  if (!messages || messages.length === 0) return;
  for (let message of messages) {
    await callable(message);
  }
}

const sendSeenToNumber = async (client, number) => {
  if (!number) return;
  await client.sendSeen(number);
}

const handleGetOldMessages = async (client, callable) => {
  return new Promise(async (resolve) => {
    try {
      const chats = await client.getAllChatsWithMessages(true);
      if (!chats || chats.length === 0) return resolve();

      for (let chat of chats) {
        await manipulateMessage(chat.msgs || [], callable);
        await sendSeenToNumber(client, chat.from);
      }
    } catch (e) {
      console.error('Something went wrong when trying to get old messages: ', e.message);
    } finally {
      resolve();
    }
  });
}

module.exports = handleGetOldMessages;
