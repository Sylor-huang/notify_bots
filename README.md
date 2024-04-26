## Usage

```sh
npm i --save notify_bots
```

或

```sh
yarn add notify_bots
```

创建一个 bot 对象来调用方法：

```js
const Bot = require("notify_bots");

// class 第一个参数是群组设置里的 webhook 地址，设置了签名校验的话，第二个参数传入密钥。
const bot = new Bot(
  "https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
);

// 返回一个 Promise Promise 结果是飞书返回的 Response { StatusCode: 0, StatusMessage: 'success' }
bot.sendText("hello world!");
```
## 参考仓库

https://github.com/peidayu/feishu-webhook-bot