'use strict';

const httpx = require('httpx');

class Bot {
  constructor(webhook) {
    this.webhook = webhook;
  }

  send(content) {
    return httpx.request(this.webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(content)
    }).then((response) => {
      return httpx.read(response, 'utf8');
    }).then((data) => {
      return JSON.parse(data);
    });
  }

  text(content, at = {}) {
    return this.send({
      'msgtype': 'text',
      'text': {
        'content': content
      },
      'at': at
    });
  }

  link(link) {
    return this.send({
      'msgtype': 'link',
      'link': link
    });
  }

  markdown(title, text) {
    return this.send({
      'msgtype': 'markdown',
      'markdown': {
        'title': title,
        'text': text
      }
    });
  }
}

module.exports = Bot;
