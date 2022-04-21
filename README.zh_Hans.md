# 🍚 GohanGo!! Discord 钱包地址记录 Bot 🍚

[English](README.md)

## ❓ 这是个啥？

这是一个可以隐秘搜集和查询钱包钱包地址的 Discord Bot，有以下这些指令可以试用：

- `/address` 仅对试用指令者展示已提交的钱包地址
- `/submit <address>` 提交或者替换已经提交的钱包地址

同时这个机器人也会验证提交地址是否合法

## 这个 bot 使用了什么编写？

- Node.js
- Discord.js
- MongoDB + Mongoose
- web3.js

## 还会开发其他功能吗？

会的，暂时我们只需要钱包搜集功能，后续有机会再添加其他功能，敬请期待！

## 如何在我自己的服务器使用这个机器人？

### 创建新的应用于机器人

在使用这个机器人之前，你需要在[Discord 的官方开发者平台](https://discord.com/developers) 创建一个新的应用和一个新的机器人。

之后，你需要在 URL Generator 生成你的机器人邀请链接，你需要以下的 scope 和 permission。

Scope:

- Bot
- applications.commands

Permission:

- Send Messages

如果有任何不懂的地方，我建议大家跟着这个教程走：[点我](https://discordjs.guide/#before-you-begin)

### 设置项目与环境变量

你首先需要克隆这个项目的代码到你的本地，之后你需要在根目录创建一个 `.env` 文件并且包括以下变量：

- DISCORD_TOKEN (可以在 Discord Developer Portal 获取)
- GUILD_ID (只需要在测试环境获取)
- ENV (production 或者 development)
- MONGO_URL (你需要在 MongoDB 或者连接到数据库的 URL)

除此之外，你还需要在[MongoDB](https://www.mongodb.com/)创建一个数据库（他们有免费的选项！），创建成功后可以获取连接 URL。

### 运行你的机器人

先运行指令 `npm install` 来安装机器人需要的包，之后只需要运行指令 `npm index.js` 即可。指令会自动在 Discord 注册。之后只需要回到 Discord 测试指令即可
