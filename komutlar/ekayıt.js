const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");

exports.run = async (client, message, args) => {
 if(!message.member.roles.cache.some(r => r.name === "ቐ`Ocean óf Blood") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("Üyeleri kayıt etmek için Kayıt Görevlisi rolünü almanız veya Yönetici olmanız Lazım")
  const kisi = message.mentions.members.first();
  let username = args[1]
  let yas = args.slice(2).join(" ");
  let rol = message.guild.roles.cache.get("807251931458043944")
  let rols = message.guild.roles.cache.get("807262884505714698")

  if (!username) return message.channel.send(`Üyenin ismini belirtmelisin.`);
  if (username.length > 16) return message.channel.send(`Daha kısa bir isim yaz.`);
  if (!yas) return message.channel.send(`Üyenin yaşını belirtmelisin.`);
  
  kisi.roles.add(rol)
  kisi.roles.remove(rols)
  
  db.add(`erkek.${message.author.id}.${message.guild.id}`, "1");

  
  message.guild.members.cache.get(kisi.id).setNickname(`ቐ ${username} | ${yas}`);
  client.channels.cache.get("807185038448787469").send(`${kisi} Aramıza Katıldı.`).then(message => {setTimeout(() => {message.delete()}, 60000);})  
  
  const samblem = client.emojis.cache.get('810500929236500510');
  const alev = client.emojis.cache.get('811677388735774760');

  let log = new Discord.MessageEmbed()
  .setColor()
  .setTitle("• Bir Kullanıcı Kayıt Oldu.")
  .setDescription(`
  ${samblem} **• Kayıt Olan Kullanıcı:** ${kisi} ${alev}
  ${samblem} **• İsim:** \`${username}\` ${alev}
  ${samblem} **• Yaş:** \`${yas}\` ${alev}
  ${samblem} **• Cinsiyet:** \`Erkek\` ${alev}
  ${samblem} **• Teyit Eden:** ${message.author} ${alev}
  `)
    client.channels.cache.get("835944163521331263").send(log)
  
  let tkanal = "835945335532027904";
  kisi.voice.setChannel(tkanal);
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: 0
};

exports.help = {
  name: 'ekayıt',
  description: '',
  usage: 'ekayıt'
};