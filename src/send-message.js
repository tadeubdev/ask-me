const sendMessage = async (client, to, message) => {
  return new Promise(async (resolve, reject) => {
    console.log('Sending message: ', message, ' to: ', to);
    client.sendText(to, message).catch(e => {
      console.log('Something went wrong when sending the message', e.message);
      reject(e);
    }).then(() => {
      resolve();
    });
  }
}

module.exports = sendMessage;
