const https = require('https');

const URL = 'https://www.ideee.tech/';
const INTERVAL_MSEC = 20 * 60 * 1000; // 10分毎(30分未満ならOK)

setInterval(() => {
  https
    .get(URL, res => {
      console.log(res, URL);
    })
    .on('error', err => {
      console.log(err, URL);
    });
}, INTERVAL_MSEC);
