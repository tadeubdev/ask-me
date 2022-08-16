const manipulateMessage = async (messages, callable) => {
  if (!messages || messages.length === 0) {
    return;
  }
  for (let message of messages) {
    await callable(message);
  }
}

const handleGetOldMessages = async (client, callable) => {
  const chats = await client.getAllChatsWithMessages(true);
  if (!chats || chats.length === 0) {
    return;
  }
  for (let chat of chats) {
    await manipulateMessage(chat.msgs || [], callable);
    await client.sendSeen(chat.from);
  }
}

module.exports = handleGetOldMessages;

