const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.once('ready', () => { //Client hazır olduğunda
    console.log('Bot hazır!'); //Konsola "Bot hazır!" yazdır
    client.user.setActivity("aslanimmm", { //Bot hesabının aktivitesini "Bu bot da Discord'a katıldı" olarak ayarla.
    type: "WATCHING" //Aktivite tipi: Oynuyor
  });
});

// GİRİŞ
client.on("guildMemberAdd", member => {
  const moment = require("moment");
  const kanal = ayarlar.giriskanal;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const tarih = new Date().getTime() - user.createdAt.getTime();
  let rol = ayarlar.kayıtsızROL;
  member.roles.add(rol); //splashen

  var kontrol;
  if (tarih < 1296000000) kontrol = "__**Bu Kullanıcı Şüpheli**__";
  if (tarih > 1296000000) kontrol = "__**Bu Kullanıcı Güvenli**__";
  moment.locale("tr");
  let kanal1 = client.channels.cache.get(kanal);
  let giris = new Discord.MessageEmbed()
    .setTitle(`\`Sunucuya Bir Üye Katıldı!\``)
    .setDescription(
      `
• ** __Hoşgeldin! ${member}__ **

• **__Seninle Birlikte ${member.guild.memberCount} Kişiyiz.__ **

• \`{ ${ayarlar.tag} }\`** __Tagımızı alarak ekibimize katılabilirsin.__ **

• ** <@&${ayarlar.yetkiliROL}> __seninle ilgilenicektir.__ **

• ** __Hesabın Oluşturulma Tarihi:__** \n • \` ${moment(
        member.user.createdAt
      ).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`

•  ${kontrol}

• ** __ Ses teyit odasında kaydınızı yaptırabilirsiniz. __ **

`
    ) //splashen
    .setThumbnail(
      member.user.avatarURL() ||
        "https://cdn.glitch.com/38744001-a274-4028-a285-7abaa4a6f553%2F20210214_151023.gif?v=1613738207713"
    )
    .setImage(
      "https://cdn.glitch.com/38744001-a274-4028-a285-7abaa4a6f553%2F20210214_151023.gif?v=1613738207713"
    )
    .setTimestamp();
  kanal1.send(giris);
});
// GİRİŞ SON


//----------------------TAG-KONTROL----------------------\\     



client.on('userUpdate', async user => {
  let sunucuid = "824709921031061555"; //Buraya sunucunuzun IDsini yazın
  let tag = "†"; //Buraya tagınızı yazın
  let rol = "835944721561550940"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let rol2 = "835944914792742912"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'blood-chat'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.cache.get(sunucuid).members.cache.get(user.id);
  if (!member) return;
  if (!member.roles.cache.has(rol && rol2)) {
    if (member.user.username.includes(tag)) {
      member.roles.add(rol)
      member.roles.add(rol2)
      const tagalma = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını aldığından dolayı <@&${rol}> ve <@&${rol2}> rolünü kazandı.`)
      .setTimestamp()
      channel.send(tagalma)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.roles.remove(rol)
      member.roles.remove(rol2)
      const tagsilme = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını sildiğinden dolayı <@&${rol}> ve <@&${rol2}> rolünü kaybetti.`)
      .setTimestamp()
      channel.send(tagsilme)
    }
  }
});

//-----------------------TAG-KONTROL----------------------\\     