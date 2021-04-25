const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  // AntiCode Development 
  
   if(!message.member.roles.cache.some(r => r.name === "'ቐ") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("Bu Komutu Kullana Bilmek İçin Yönetici Permi veya 'ቐ Rolüne Olmalısınız.")

  const kisi = message.mentions.members.first();

  if(!kisi.roles.cache.find(x => x.name === "ቐ`Ocean óf Blood")){
    message.channel.send(`${kisi}'nin Stats Bilgileri Olması İçin Kayıt Sorumlusu Olması Gerekli..`)
  }else{
      let u = message.mentions.users.first() || message.author;
  
  let yetkili = message.mentions.users.first();
  let erkek = db.fetch(`erkek.${u.id}.${message.guild.id}`);
  let kız = db.fetch(`kız.${u.id}.${message.guild.id}`);
  let toplam = erkek + kız;
  var embed = new Discord.MessageEmbed()
    .setTitle(`• \`Kayıt Bilgileri\``)

    .setDescription(
      `

• **Yetkili :** ${u}
__\`{${u.id}}\`__

• **Toplam üye kayıt sayısı :** __\`${toplam ? toplam : '0'}\`__

• **Toplam kız kayıt sayısı :** __\`${kız ? kız : '0'}\`__

• **Toplam erkek kayıt sayısı :** __\`${erkek ? erkek : '0'}\`__

`
    )
    .setThumbnail(u.avatarURL())
    .setImage(
      "https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif"
    );
  message.reply(embed);
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yetkilistat","ys"],
  permLevel: 0
};

exports.help = {
  name: "yetkilistats"
}; //AntiCode Development 
