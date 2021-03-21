const { decryptMedia } = require("@open-wa/wa-automate");
const fs = require("fs");

// Tools
const { prefix, ownerNumber } = require("./setting");

// Text
// const txt_hanyaGrup = "Maaf, perintah ini hanya dapat digunakan didalam grup!";
// const txt_hanyaAdmin =
//   "Maaf, perintah ini hanya dapat digunakan oleh admin grup!";
// const txt_chatMuted = `Bot telah di mute pada chat ini! *${prefix}unmute* untuk unmute!`;
// const txt_chatUnmuted = "Bot telah di unmute di chat ini";
// const txt_alreadyMuted = "Bot sudah di mute pada chat ini!";
// const txt_notReg = `Maaf anda belum terdaftar untuk dapat menggunakan bot ini\ngunakan *${prefix}daftar* untuk mendaftar`;

module.exports = HandleMsg = async (mybot, message) => {
  try {
    const botNumber = (await mybot.getHostNumber()) + "@c.us";

    const {
      type,
      id,
      from,
      t,
      sender,
      author,
      isGroupMsg,
      chat,
      chatId,
      caption,
      isMedia,
      mimetype,
      quotedMsg,
      quotedMsgObj,
      mentionedJidList
    } = message;
    let { body } = message;
    let { name, formattedTitle } = chat;
    let { pushname, verifiedName, formattedName } = sender;
    pushname = pushname || verifiedName || formattedName;

    const groupId = isGroupMsg ? chat.groupMetadata.id : "";
    const groupAdmins = isGroupMsg ? await mybot.getGroupAdmins(groupId) : "";
    const isGroupAdmins = groupAdmins.includes(sender.id) || false;
    const chats =
      type === "chat"
        ? body
        : type === "image" || type === "video"
        ? caption
        : "";
    const pengirim = sender.id;
    const stickermsg = message.type === "sticker";
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;

    // Bot Main
    body =
      type === "chat" && body.startsWith(prefix)
        ? body
        : ((type === "image" && caption) || (type === "video" && caption)) &&
          caption.startsWith(prefix)
        ? caption
        : "";
    const command = body
      .slice(1)
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const args = body
      .trim()
      .split(/ +/)
      .slice(1);
    const isCmd = body.startsWith(prefix);
    const uaOverride = process.env.UserAgent;
    const url = args.length !== 0 ? args[0] : "";
    const isQuotedImage = quotedMsg && quotedMsg.type === "image";
    const isQuotedVideo = quotedMsg && quotedMsg.type === "video";

    // Is Condition
    const isOwnerBot = ownerNumber.includes(pengirim);

    // Auto Read
    mybot.sendSeen(chatId);

    // Cmd
    let start = `Selamat Datang ${pushname}\nini adalah project starter wa-bot`;

    // Main Commands
    switch (command) {
      case "start":
        await mybot.reply(from, start, id);
        break;

      // DEFAULT
      default:
        if (isCmd)
          return mybot.reply(
            from,
            "Maaf command tidak terdaftar",
            id
          );
        break;
    }
  } catch (err) {
    console.log(err);
  }
};
