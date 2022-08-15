const sendMessage = async (client, to, message) => {
  return await client.sendText(to, message);
}

module.exports = sendMessage;
