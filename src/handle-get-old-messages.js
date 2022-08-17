const manipulateMessage = async (messages, callable) => {
  
  try{
    if (!messages || messages.length === 0) return;
    for (let message of messages) {
      await callable(message);
    }
  }catch(e){
    console.log(e)
  }
 
}

const handleGetOldMessages = async (client, callable) => {

  try{
    const chats = await client.getAllChatsWithMessages(true);
    if (!chats || chats.length === 0) return;
    
    for (let chat of chats) {
      await manipulateMessage(chat.msgs || [], callable);
      await client.sendSeen(chat.from);
    }
  }catch(e){
    console.log(e)
  }

}

module.exports = handleGetOldMessages;

