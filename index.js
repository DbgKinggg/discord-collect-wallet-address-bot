const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const mongoose = require("mongoose");
require("dotenv").config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// load commands from the /commands folder
const commandsFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
const commands = [];

client.commands = new Collection();

for (const commandsFile of commandsFiles) {
  const command = require(`./commands/${commandsFile}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

client.on("ready", async () => {
  const CLIENT_ID = client.user.id;
  const rest = new REST({
    version: "9",
  }).setToken(process.env.DISCORD_TOKEN);

  // register commands
  (async () => {
    try {
      if (process.env.ENV === "production") {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });
        console.log("Registered commands globally");
      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
          {
            body: commands,
          }
        );
        console.log("Registered commands locally");
      }
    } catch (exception) {
      if (exception) {
        console.error(exception);
      }
    }
  })();

  // connect to db
  await mongoose.connect(process.env.MONGO_URL || "", {
    keepAlive: true,
  });

  console.log("bot is here");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  // execute the command
  try {
    await command.execute(interaction);
  } catch (err) {
    if (err) console.error(err);

    await interaction.reply({
      content: "An error occurred 粗问题啦！！！",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
