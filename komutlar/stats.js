const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  //AntiCode Development 
  let yetkili = message.author;
  let erkek = db.fetch(`erkek.${message.author.id}.${message.guild.id}`);
  let kız = db.fetch(`kız.${message.author.id}.${message.guild.id}`);
  let toplam = erkek + kız;
  var embed = new Discord.MessageEmbed()
    .setTitle(`• \`Kayıt Bilgileri\``)

    .setDescription(
      `

• **Yetkili :** ${yetkili}
__\`{${yetkili.id}}\`__

• **Toplam üye kayıt sayısı :** __\`${toplam ? toplam : '0'}\`__

• **Toplam kız kayıt sayısı :** __\`${kız ? kız : '0'}\`__

• **Toplam erkek kayıt sayısı :** __\`${erkek ? erkek : '0'}\`__

`
    )
    .setThumbnail(yetkili.avatarURL())
    .setImage(
      "https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif"
    );
  message.reply(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["stat","s"],
  permLevel: 0
};

exports.help = {
  name: "stats"
}; //AntiCode Development 
