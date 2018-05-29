# wx-roomkeeper
wx-roomkeeper. A wx robot. powered by wechaty.

---
每个机器人用户，将机器人绑定到一个微信群中，机器人会自动持久化保存微信群中的图片，视频。
需要一个微信群(也就是Room)对应用户id的map，
将图片下载后，记录图片路径到数据库中，图片拥有者为机器人用户(id),
1.机器人接收到消息，判断消息类型为图片和视频，
2.查询消息所在群是否绑定了用户id(本程序用户的用户id)
  2.1.先从本地缓存中获取 roomId 2 userId, 
  2.2.如果缓存中不存在，从云端数据库(leancloud存储)中查询，
  2.3.将查询结果进行缓存，
  2.4.再次查询缓存，如果不存在，则此消息不进行处理。
  2.5.存在绑定关系，进行下一步。
3.下载图片和视频
4.将下载的文件再次上传到leancloud(对应七牛存储提供的CDN)
5.本程序用户的相册增加相应记录。(使用leancloud提供的云数据库存储服务)

---
### 微信流程
1.打开首页，分配一个随机uuid， 
2.根据该uuid获取二维码图片。 
3.微信客户端扫描该图片，在客户端确认登录。 
4.浏览器不停的调用一个接口，如果返回登录成功，则调用登录接口 
5.此时可以获取联系人列表，可以发送消息。然后不断调用同步接口。 
6.如果同步接口有返回，则可以获取新消息，然后继续调用同步接口。

---
```
const { Wechaty } = require('wechaty')
const bot = Wechaty.instance()
console.log(bot.version())

bot
.on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
.on('login',       user => console.log(`User ${user} logined`))
.on('message',  message => console.log(`Message: ${message}`))
.start()
```
---
```
D:\Sorkin-github\wx-roomkeeper>node index
0.14.1
10:54:26 INFO Wechaty v0.14.1 starting...
Scan QR Code to login: 0
https://login.weixin.qq.com/qrcode/of9zSDbYBg==
Scan QR Code to login: 408
https://login.weixin.qq.com/qrcode/of9zSDbYBg==
Scan QR Code to login: 201
https://login.weixin.qq.com/qrcode/of9zSDbYBg==
Scan QR Code to login: 200
https://login.weixin.qq.com/qrcode/of9zSDbYBg==
User Contact<＊＊＊> logined
```
其中，qrcode所包含的url地址，是需要扫描的二维码的地址。
状态码，0,408,201,200，是二维码的状态。 
201:扫描成功?  / 200:手机上确认登录? / 0:服务端用于登录的二维码生成完成? / 408:登陆超时?



