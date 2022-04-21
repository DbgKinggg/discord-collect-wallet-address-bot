const { SlashCommandBuilder } = require("@discordjs/builders");
const Address = require("../schemas/Address");
const Web3 = require("web3");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("submit")
    .setDescription("Submit/replace your registered address 提交/替换钱包地址")
    .addStringOption((option) =>
      option
        .setName("address")
        .setDescription("Your ETH wallet address 你的以太坊钱包地址")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.user.id) {
      throw new Error("Cannot find user");
    }

    const userId = interaction.user.id;
    const enteredAddress = interaction.options.getString("address");

    if (!validateAddress(enteredAddress)) {
      return replyInteraction(
        interaction,
        "Invalid wallet address 钱包地址格式错误 ❌"
      );
    }

    // find if the userId exists
    Address.findOne(
      { userId: userId },
      "address userId",
      async (err, address) => {
        if (err) throw new Error("Cannot find record");

        // if existed check if they are the same
        if (address) {
          if (address.address === enteredAddress) {
            return replyInteraction(
              interaction,
              "Your address has been recorded 你已经提交过相同地址啦！"
            );
          }

          // replace the address
          // if not existed or submitted address is not the same, then overwrite it
          address.address = enteredAddress;
          await address.save();

          // reply message
          return replyInteraction(
            interaction,
            `${enteredAddress} has been updated 地址替换成功`
          );
        }

        await new Address({
          address: enteredAddress,
          userId: userId,
        }).save();

        return replyInteraction(
          interaction,
          `${enteredAddress} has been saved 地址提交成功！`
        );
      }
    );
  },
};

const validateAddress = (address) => {
  return Web3.utils.isAddress(address);
};

const replyInteraction = (interaction, message) => {
  return interaction.reply({
    content: message,
    ephemeral: true,
  });
};
