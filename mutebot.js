/* Simple Discord mute all bot
 *  This was an idea for the game 'Among Us' to make muting players easier, 
 it was especially needed because some people didn't know how to mute themselves.
 *  Author: Deniz Sonsal @ github.com/deniz617
 *  Contact: deniz.frosty@gmail.com
 *  Date: 26/09/2020
 
    Note: Make sure your bot has the permissions to mute other members (server mute).
 */

/* Parts to modify - Begin */
const DISCORD_TOKEN = "ENTER_YOUR_TOKEN_HERE"; // Place your secret token here.
const REQUIRED_ROLE = "Admin"; // Enter the 'name' of the allowed role here.
/* Parts to modify - End */

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Online as ${client.user.tag}!`);
});

function isAllowed(user, roles) {
  let allowedRole = roles.cache.find((v) => v.name == REQUIRED_ROLE);
  if (user.roles.cache.find((v) => v == allowedRole)) {
    return true;
  }
  return false;
}

function muteAll(state, user) {
  if (isAllowed(user, user.guild.roles)) {
    let channel = user.voice.channel;
    for (let member of channel.members) {
      member[1].voice.setMute(state);
    }
    return true;
  }
  return false;
}

client.on("message", (msg) => {
  let state = msg.content === "1q";
  if (state || msg.content === "2w") {
    if (!muteAll(state, msg.member)) {
      msg.reply(
        `Error, only users with the role '${REQUIRED_ROLE}' can use this command.`
      );
    }
  }
});

client.login(DISCORD_TOKEN);
