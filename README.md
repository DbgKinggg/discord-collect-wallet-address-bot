# 🍚 GohanGo!! Official Wallet Addresses Collector Discord Bot 🍚

[简体中文](README.zh_Hans.md)

## ❓ What is this?

This is a Discord bot that is built to collect wallet address without disclosing your address to other members, with the following Discord commands:

- `/address` show the current submitted address
- `/submit <address>` submit/replace wallet address in the database

The submitted address will also be validated to make sure only valid addresses are submitted.

## What technology/packages are being used?

- Node.js
- Discord.js
- MongoDB + Mongoose
- web3.js

## More functionality?

Yes! But for now collecting wallet addresses is what we need, we will add more useful functionality in the future

## How to use this in my own server?

### Create application and bot

You will have to create your own discord application and a bot first from the [Discord Developer Portal](https://discord.com/developers).

Once you are done, you need to invite your bot via the URL Generator (In the Developer Portal) with the right scope and permission.

Scope:

- Bot
- applications.commands

Permission:

- Send Messages

I recommend following this useful guide [here](https://discordjs.guide/#before-you-begin).

### Set up project and environment variables

You will need to clone this repo to your local first, and then create a `.env` file in the root directory, and include the following variables:

- DISCORD_TOKEN (Can be obtained from Discord Developer Portal)
- GUILD_ID (Only needed in dev)
- ENV (production or development)
- MONGO_URL (the connection url that you can get on MongoDB)

You will also need to create your [MongoDB](https://www.mongodb.com/) database (they have a free tier!) and obtain the connection url.

### Seed your database

Before running your bot, you might want to seed your already submitted wallet address data, if this is not something you need you may skip to the nest section.
We have created a `seed.js` and `seed.example.json` file, and the javascript will read from a file called `seed.json` to validate and seed the database. You will have to create a `seed.json` file first, and put in your collected data.

To validate the data in `seed.json` is valid (if the addresses are valid/if there is any duplicate), you may run: `node seed.js validate`
To seed the database, please run `node seed.js seed`

### Run the application

To run the application, you will need to `npm install` first and then run `node index.js` to start the bot, and the commands will be registered automatically on the discord server. Go test it out!

### Deploy to production

If might want to find a good server/vps to host your bot, I recommend using something like pm2 to manage your node.js app.
