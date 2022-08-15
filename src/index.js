(async () => {
  const session = process.env.SESSION || null;
  if (!session) {
    console.log('No session provided');
    return;
  }
  const channel = makeWppConnectSession(session);
});
