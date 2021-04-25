const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  
    message.delete()
  
  if(!message.member.roles.cache.some(r => r.name === "'ቐ") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("Üyeleri kayıt etmek için Kayıt Görevlisi rolünü almanız veya Yönetici olmanız Lazım")

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const teyitmiktar = "0";
    let teyit = await db.set(`erkek.${member.id}.${message.guild.id}`, +teyitmiktar);
    let teyitk = await db.set(`kiz.${member.id}.${message.guild.id}`, +teyitmiktar);
  let guncelteyit = await db.fetch(`erkek.${member.id}.${message.guild.id}`,);
  message.channel.send(`${member} Teyit Sayısı Sıfırlandı. **Güncel Teyit Sayısı:** ${guncelteyit} `)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'teyit-sıfırla',
  description: '!!teyit-sıfırla @etiket [MIKTAR]',
  usage: 'teyit-sıfırla'
};