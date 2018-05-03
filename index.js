const { Wechaty } = require('wechaty')
const bot = Wechaty.instance()
console.log(bot.version())

bot
.on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
.on('login',       user => console.log(`User ${user} logined`))
.on('message',  message => console.log(`Message: ${message}`))
.start()