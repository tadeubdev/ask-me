const retrieveOldMessagesService = async (repository, callable) => {
  return new Promise(async (resolve) => {
    try {
      const chats = await repository.getAllChats();

      for (let chat of chats) {
        await repository.applyCallableToChat(chat, callable);
      }
    } catch (e) {
      console.error('Something went wrong when trying to get old messages: ', e.message);
    } finally {
      resolve();
    }
  });
}

module.exports = retrieveOldMessagesService;
