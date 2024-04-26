import crypto from "crypto"
import fetch from "node-fetch"

class Bot {
  constructor(url, secret_key) {
    this.webhookUrl = url;
    this.secret_key = secret_key;
  }
  sign(timestamp) {
    const hmac = crypto.createHmac(
      "sha256",
      timestamp + "\n" + this.secret_key
    );
    return hmac.digest("base64");
  }
  post(data) {
    if (this.secret_key) {
      const timestamp = Math.floor(Date.now() / 1000);
      data.timestamp = timestamp;
      data.sign = this.sign(timestamp);
    }
    return fetch(this.webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.StatusMessage === "success") {
          return data;
        } else {
          return data;
        }
      })
      .catch((err) => {
        console.error("发送失败，发生错误！");
        throw err;
      });
  }
  /**
   * @ 单个用户
   * <at user_id="ou_xxx">名字</at>
   * @ 所有人
   * <at user_id="all">所有人</at>
   */
  sendText(text) {
    return this.post({
      msg_type: "text",
      content: {
        text,
      },
    });
  }
  /**
   * 富文本
   * title: 标题 [可选]
   * content 接受二维数组，每个数组代表一行消息
   * [{ tag: "text", "text": "hello" }]
   * 数组内容为内容对象，支持4种类型: text, a, at, img
   * text:
   *  text: 文本内容  [必填]
   *  un_escape: 是否解码 [可选]
   * a:
   *  text: 链接内容  [必填]
   *  href: 地址 [可选]
   * at:
   *  user_id: open_id，union_id或user_id [必填]
   *  user_name: 用户姓名 [可选]
   * img:
   *  image_key: 上传到飞书的文件 key [必填]
   */
  sendRich(content) {
    return this.post({
      msg_type: "post",
      content: {
        post: {
          zh_cn: content,
        },
      },
    });
  }
}

module.exports = Bot;