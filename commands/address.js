const { SlashCommandBuilder } = require("@discordjs/builders");
const Address = require("../schemas/Address");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("address")
    .setDescription("Show your registered address 显示已经登记的地址"),
  async execute(interaction) {
    if (!interaction.user.id) {
      throw new Error("Cannot find user");
    }

    const userId = interaction.user.id;

    // find if the userId exists
    Address.findOne(
      { userId: userId },
      "address userId",
      async (err, address) => {
        if (err) throw new Error("Cannot find record");

        // if existed show the address
        if (address.address) {
          interaction.reply({
            content: `${address.address}`,
            ephemeral: true,
          });
          return;
        }

        interaction.reply({
          content: `No address was found 你的地址还没提交呢~`,
          ephemeral: true,
        });
      }
    );
  },
};
