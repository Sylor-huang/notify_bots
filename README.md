## Usage

```sh
npm i --save feishu-webhook-bot
```

或

```sh
yarn add feishu-webhook-bot
```

创建一个 bot 对象来调用方法：

```js
const Bot = require("feishu-webhook-bot");

// class 第一个参数是群组设置里的 webhook 地址，设置了签名校验的话，第二个参数传入密钥。
const bot = new Bot(
  "https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
);

// 返回一个 Promise Promise 结果是飞书返回的 Response { StatusCode: 0, StatusMessage: 'success' }
bot.sendText("hello world!");
```
