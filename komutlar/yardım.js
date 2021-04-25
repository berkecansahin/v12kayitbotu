const Discord = require('discord.js');

exports.run = async (client, message) => {
  const yasak = client.emojis.cache.get('811958245094326372');
  const elmas = client.emojis.cache.get('810500929236500510');
  const onay = client.emojis.cache.get('816747101803380786');
      message.delete()
  const embed = new Discord.MessageEmbed()
     .setColor('#ff0000')
    .setDescription(`
 ${elmas}***<@${message.author.id}> Yardımcı Oluyoruz Size :)***
${elmas} ** Erkek Teyit Komutu:  \`.e [@ETİKET] [İSİM] [YAŞ]\`**
${elmas} ** Kız Teyit Komutu:  \`.k [@ETİKET] [İSİM] [YAŞ]\`**

${elmas} ** Teyit Ekleme Komutu: \`.teyit-ekle [@ETİKET] [MİKTAR]\`**
${elmas} ** Teyit Silme Komutu: \`.teyit-sil [@ETİKET] [MİKTAR]\`**
${elmas} ** Teyit Sıfırlama Komutu: \`.teyit-sıfırla [@ETİKET]\`**

${elmas} ** Say Komutu: \`.say\`**
${elmas} ** Stats Komutu: \`.s\`**
${elmas} ** Yetkili Stats Komutu: \`.ys [@ETİKET]\`**

${elmas} ** VIP Komutu: \`.vip [@ETİKET]\`**

${elmas} \`Hoşgeldin & Karşılama Sistemi\` ${onay}
${elmas} \`Tag Alınca Rol Alma Sistemi\` ${onay}
`,true)
        .setFooter(`Umarım Yardımcı Olabilmişimdir...`)
message.channel.send(embed).then(message => {setTimeout(() => {message.delete()}, 60000);message.react('810500661829042176')})  
  
};

exports.conf = {
  enabled: true,
  aliases: ['teyardım'],
  permLevel: 0,
};

exports.help = {
  name: "teyit-yardım",
  description: "Bot bulunduğunuz odaya girer.",
  usage: "teyit-yardım",
};