

import {request, read} from 'httpx';

export default class Bot {
  constructor(webhook, options = {}) {
    this.webhook = webhook;
    this.options = options;
  }

  async send(content) {
    const response = await request(this.webhook, {
      ...this.options, // the httpx options
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(content)
    });
    const body = await read(response, 'utf8');
    const data = JSON.parse(body);
    if (data.errcode !== 0) {
      throw new Error(`code: ${data.errcode}, ${data.errmsg}`);
    }

    return data;
  }

  async text(content, at = {}) {
    return await this.send({
      'msgtype': 'text',
      'text': {
        'content': content
      },
      'at': at
    });
  }

  async link(link) {
    return await this.send({
      'msgtype': 'link',
      'link': link
    });
  }

  async markdown(title, text) {
    return await this.send({
      'msgtype': 'markdown',
      'markdown': {
        'title': title,
        'text': text
      }
    });
  }
}
