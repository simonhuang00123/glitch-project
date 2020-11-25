const Eris = require("eris");

const bot = new Eris(process.env.DISCORD_BOT_TOKEN); // Replace DISCORD_BOT_TOKEN in .env with your bot accounts token

bot.on("ready", () => {
  // When the bot is ready
  console.log("Ready!"); // Log "Ready!"
});
var serverBalance = {
  "442153602023424010": 1000,
  "307695500209946635": 1000
};


bot.on("messageCreate", msg => {
  if (msg.content === "balance") {
    var user = msg.author.id;
    var userBalances = Object.keys(serverBalance);
    for (var key in userBalances) {
      if (!(userBalances.includes(user))) {
        serverBalance[user] = 1000;
        bot.createMessage(msg.channel.id, serverBalance[user]);
        return;
      } else { 
        bot.createMessage(msg.channel.id, serverBalance[user]);
        return;
      }
    }
  }
  if (msg.content === "work") {
    var user = msg.author.id;
    serverBalance[user] += 500;
    console.log(serverBalance);
    bot.createMessage(msg.channel.id, "Thanks for working, here's $500");
  }

  if (msg.content === "bet") {
    var user = msg.author.id;
    var roll = Math.random();
    if (roll > 0.5) {
      serverBalance[user] += 500;
      bot.createMessage(
        msg.channel.id,
        "You won! Your balance has increased by 500"
      );
    } else {
      serverBalance[user] -= 500;
      bot.createMessage(
        msg.channel.id,
        "You lost. Your balance has decreased by 500"
      );
    }
  }
  if (msg.content === "help") {
    bot.createMessage(msg.channel.id, "working on this...");
  }
});

bot.connect();
