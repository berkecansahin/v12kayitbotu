const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  
    message.delete()
  
  if(!message.member.roles.cache.some(r => r.name === "'ቐ") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("Üyeleri kayıt etmek için Kayıt Görevlisi rolünü almanız veya Yönetici olmanız Lazım")

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const teyitmiktar = args.slice(1).join('')
    let teyit = await db.add(`erkek.${member.id}.${message.guild.id}`, +teyitmiktar);
  let guncelteyit = await db.fetch(`erkek.${member.id}.${message.guild.id}`,);
  message.channel.send(`${member} Teyit Sayısı Eklendi. **Eklenen Teyit Sayısı:** ${teyitmiktar}, **Güncel Teyit Sayısı:** ${guncelteyit} `)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'teyit-ekle',
  description: '!!teyit-ekle @etiket [MIKTAR]',
  usage: 'teyit-ekle'
};