const { create, Client } = require("@open-wa/wa-automate");

const keep_alive = require("./keep_alive");
const HandleMsg = require("./HandleMsg");

const options = (headless, start) => {
  return {
    sessionId: "rahasia",
    headless: true,
    qrTimeout: 0,
    authTimeout: 0
  };
};

const start = (mybot = new Client()) => {
  mybot.onStateChanged(state => {
    if (state === "CONFLICT" || state === "UNLAUNCHED") mybot.forceRefocus();
  });

  mybot.onIncomingCall(async callData => {
    await mybot.sendText(callData.peerJid, "Mohon tidak menelfon nomor ini");
  });

  mybot.onMessage(async message => {
    HandleMsg(mybot, message);
  });
};

create(options(true, start))
  .then(mybot => start(mybot))
  .catch(err => new Error(err));
