import process from 'process';
import Bot from './index.js';

const bot = new Bot('https://oapi.dingtalk.com/robot/send?access_token=' + process.env.TOKEN);

let data = await bot.text('I am robot.');
console.log(data);

data = await bot.link({
  'text': '这个即将发布的新版本，创始人陈航（花名“无招”）称它为“红树林”。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是“红树林”？',
  'title': '时代的火车向前开',
  'picUrl': '',
  'messageUrl': 'https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI'
});
console.log(data);

data = await bot.markdown('杭州天气', '#### 杭州天气\n> 9度，西北风1级，空气良89，相对温度73%\n\n> ![screenshot](http://image.jpg)\n###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n');
console.log(data);
