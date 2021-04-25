const Discord = require("discord.js");

const mapping = {
  " ": "   ",
   "0": "<a:blood_0:811886100343554108>",
  "1": "<a:blood_1:811886132785971211>",
  "2": "<a:blood_2:811886168454594561>",
  "3": "<a:blood_3:811886195764101180>",
  "4": "<a:blood_4:811886226360893450>",
  "5": "<a:blood_5:811886253938835457>",
  "6": "<a:blood_6:811886282706780171>",
  "7": "<a:blood_7:811886313426255902>",
  "8": "<a:blood_8:811886339301441557>",
  "9": "<a:blood_9:811886367449677876>",
  "!": "❕",
  "?": "❔",
  "#": "#️⃣",
  "*": "*️⃣"
};
let tag1 = "ቐ";
let tag2 = "ᴮˡᵒᵒᵈ";

"abcdefghijklmnopqr".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});

exports.run = function(client, message, args) {
  const samblem = client.emojis.cache.get('810500929236500510');
  const alev = client.emojis.cache.get('810500929236500510');

  let offlinesayi = message.guild.members.cache.filter(
    m => m.user.presence.status === "offline"
  ).size; 
  let offline = `**Çevrimdışı Kişi** ` +
     `${offlinesayi}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")
  let toplam = message.guild.memberCount;
  let sunucu = `**Sunucudaki Kişi:** ` + 
      `${toplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
  let online = message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size;;
  let offline2 =  `**Çevrimiçi Kişi:** ` +
     `${online}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")

  
  let tagsayi1 = message.guild.members.cache.filter(m => m.user.username.includes(tag1)).size
  let tagsayi2 = message.guild.members.cache.filter(m => m.user.username.includes(tag2)).size
  let tagsayi = tagsayi1+tagsayi2; 

    let tag = `**Tagdaki :** ` +
      `${tagsayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
const embed = new Discord.MessageEmbed()
.setTitle(`${samblem} Sunucu İstatistikleri ${samblem}`)
.setColor('BLACK')
.setDescription('' + sunucu + '\n \n' + offline2 + '\n \n' + offline + '\n \n'+ tag)
.setFooter('')

  message.channel.send(embed)
  let onnl = `**Toplam Üye:** ${sunucu}\n**Aktif Üye:** ${offline2}\n**Tagdaki Üye:** ${tag}`
message.channel.setTopic(onnl)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["onlinesayi"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
};