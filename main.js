const aoijs = require("aoi.js")
const setting = require("./settings.js")
const { Util } = require("aoi.js");
const { setup } = require("aoi.parser");
setup(Util);

const bot = new aoijs.AoiClient({
token: setting.BotToken,
prefix: setting.BotPrefix,
intents: ["MessageContent", "Guilds", "GuildMembers", "GuildMessages", "GuildBans", "GuildEmojisAndStickers", "GuildIntegrations", "GuildWebhooks", "GuildInvites", "GuildVoiceStates", "GuildPresences", "GuildMessageReactions", "GuildMessageTyping", "DirectMessages", "DirectMessageReactions", "DirectMessageTyping"],
disableLogs: true,
suppressAllErrors: true,
 database: {
  type : "aoi.db",
  db : require("aoi.db"),
  tables: ["OriginShieldBot"],
  path: "./Database/",
  extraOptions: {
       dbType: "KeyValue",
       dbOptions: {
            storeOption: {
              maxDataPerFile: 10000,
            },
            cacheOption: {
              cacheReference: "DISK",
              limit: 10000,
            },
            methodOption: {
              getTime: 100,
            },
       }
  }
}
})

// Callbacks
bot.onMessage()
bot.onInteractionCreate()

// Loader
const loader = new aoijs.LoadCommands(bot)
loader.load(bot.cmd,"./src/")

loader.setColors({
    walking:["blink","dim","fgWhite"],
    failedWalking:{
        name:["bright","fgYellow","underline"],
        text:["bright","fgRed"]
    },
    typeError:{
        command:["bright","fgYellow"],
        type:["fgYellow"],
        text:["bright","fgRed"]
    },
    failLoad:{
        command:["bright","fgMagenta"],
        type:["fgRed"],
        text:["bright","fgRed"],
        },
    loaded:{
           command:["bright","fgCyan"],
           type:["bright","fgBlue"],
           text:["bright","fgGreen"]
           },
})

// Variables
bot.variables(require("./variables.js"));

// Custom Functions:
bot.functionManager.createFunction({
 name: "$httpStatus",
 type: "djs",
 code: async d => {
 const data = d.util.aoiFunc(d)
 const [url] = data.inside.splits
 var request = require('axios');
await request.get(url).then((response) => {
 data.result = response.status
 }).catch(function(error) {
 if(error.response) {
 data.result = error.response.status
 }
 else {
 data.result = error
 }
 })
return {
 code: d.util.setCode(data)
 }
 }
 })
