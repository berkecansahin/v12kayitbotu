const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
exports.run = function(client, message, args) {
  
  if(!message.member.roles.cache.some(r => r.name === "ቐ`Ocean óf Blood") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("Üyeleri kayıt etmek için Kayıt Görevlisi rolünü almanız veya Yönetici olmanız Lazım")

  const kisi = message.mentions.members.first();
  let rol = message.guild.roles.cache.get("816300123033698316")

  if(!kisi.roles.cache.find(x => x.name === "Blood V.İ.P.")){
    kisi.roles.add(rol)
    message.channel.send("Vipe Rolü Verildi.")
  }else{
    kisi.roles.remove(rol)
    message.channel.send("Vip Rolü Alındı.")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["v"],
  permLevel: 0
};

exports.help = {
  name: "vip"
};
//splashen
