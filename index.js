'use strict';

const httpx = require('httpx');

class Bot {
  constructor(webhook) {
    this.webhook = webhook;
  }

  * send(content) {
    var response = yield httpx.request(this.webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(content)
    });
    var data = yield httpx.read(response, 'utf8');
    return JSON.parse(data);
  }

  * text(content, at = {}) {
    return yield this.send({
      'msgtype': 'text',
      'text': {
        'content': content
      },
      'at': at
    });
  }

  * link(link) {
    return yield this.send({
      'msgtype': 'link',
      'link': link
    });
  }

  * markdown(title, text) {
    return yield this.send({
      'msgtype': 'markdown',
      'markdown': {
        'title': title,
        'text': text
      }
    });
  }
}

module.exports = Bot;
