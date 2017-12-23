const Twit = require('twit'); // reference twit module..
const configuration = require('./config');
const T = new Twit(configuration);
const request = require('request');
const waterfall = require('async-waterfall');

tweetIt();
setInterval(tweetIt, 1000 * 60 * 10); // 120 minute time interval
console.log("Cryptocurrency app is running :)");

// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,TRY ====> BTC -> USD,TRY

// Ripple XRP
// Etherium ETH
// LiteCoin LTC
// Bitcoin Cash BCH
// IOTA IOT
// Dash DASH

function tweetIt() {

  const btcTask = (callback) => {
    request({
      url: 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,TRY',
      json: true,
    },
    (err, res, json) => {
      btcUsd = json.USD;
      btcTry = json.TRY;
      callback(null, [btcUsd, btcTry]);
    });
  };

  const ethTask = ([btcUsd, btcTry], callback) => {
    request({
      url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,TRY',
      json: true,
    },
    (err, res, json) => {
      ethUsd = json.USD;
      ethTry = json.TRY;
      callback(null, [btcUsd, btcTry], [ethUsd, ethTry]);
    });
  };

  const iotTask = ([btcUsd, btcTry], [ethUsd, ethTry], callback) => {
    request({
      url: 'https://min-api.cryptocompare.com/data/price?fsym=IOT&tsyms=USD,TRY',
      json: true,
    },
    (err, res, json) => {
      iotUsd = json.USD;
      iotTry = json.TRY;
      callback(null, [iotUsd, iotTry], [btcUsd, btcTry], [ethUsd, ethTry]);
    });
  };

  const UsdTryTask = ([iotUsd, iotTry], [btcUsd, btcTry], [ethUsd, ethTry], callback) => {
    
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let fullHour = hour + ':' + minute;
    let fullDate = day + "." + month + "." + year;

    let tweetProp = `
1 Bitcoin 
Dollar: ${btcUsd}$ 
TRY: ${btcTry} ₺

1 Etherium
Dollar: ${ethUsd}$ 
TRY: ${ethTry} ₺

1 IOTA
Dollar: ${iotUsd}$ 
TRY: ${iotTry} ₺

Time : ${fullHour}
Date: ${fullDate}
    `;

    let tweet = {
      status : tweetProp
    };

    callback(null, tweet);
  }

  waterfall([btcTask, ethTask, iotTask, UsdTryTask], (err, result) => {
    
    T.post('statuses/update', result, tweeted);

    function tweeted (err, data, response) {
      if (err) {
        console.log(err);
        console.log("someting went wrong while tweeting :( !!");
      }
    };
  });
}