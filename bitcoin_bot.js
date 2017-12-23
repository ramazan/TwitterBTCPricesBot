var Twit = require('twit'); // reference twit module..

var configuration = require('./config'); // reference config.js file

var T = new Twit(configuration);

var request = require('request');

var waterfall = require('async-waterfall');

tweetIt();
setInterval(tweetIt, 1000 * 60 * 120); // 120 minute time interval
console.log("Btc app is running :)");

function tweetIt() {

      waterfall([
            function (callback) {
                  request({
                        url: 'https://www.bitstamp.net/api/ticker',
                        json: true
                  }, function (err, res, json) {

                        bitstamp = json.last;
                        callback(null, bitstamp);
                  });
            },
            function (bitstamp, callback) {
                  request({
                        url: 'https://www.paribu.com/ticker',
                        json: true
                  }, function (err, res, json) {

                        paribu = json.BTC_TL.last;
                        callback(null, paribu, bitstamp);
                  });
            },
            function (paribu, bitstamp, callback) {

                  var date = new Date();
                  var year = date.getFullYear();
                  var month = date.getMonth() + 1;
                  var day = date.getDate();
                  var hour = date.getHours();
                  var minute = date.getMinutes();
                  var fullHour = hour + ':' + minute;
                  var fullDate = day + "." + month + "." + year;

                  var tweetPrp = "1 Bitcoin \nDollar: " + bitstamp + " $ \nTRY: " + paribu +
                        " ₺\n\nTime : " + fullHour + "\nDate: " + fullDate + "\n#Bitcoin #BTCUSD #BTCTRY #BTC";
                  var tweet = {
                        status: tweetPrp
                  }
                  callback(null, tweet);
            }
      ], function (err, result) {
            T.post('statuses/update', result, tweeted);

            function tweeted(err, data, response) {
                  if (err) {
                        console.log("someting went wrong while tweeting :( !!");
                  }
            }
      });

}