const retrieveOldMessagesService = async (retrieveOldMessagesRepository) => {
  return {
    handle: (callable) => {
      const chats = await retrieveOldMessagesRepository.getAllChats();
      for (let chat of chats) {
        try {
          await retrieveOldMessagesRepository.applyCallableToChat(chat, callable);
        } catch (e) {
          console.error('Something went wrong when trying to get old message: ', e.message);
        }
      }
      resolve();
    },
  };
}

module.exports = retrieveOldMessagesService;
