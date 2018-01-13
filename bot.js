const Twit = require('twit'); // reference twit module..
const configuration = require('./config');
const T = new Twit(configuration);
const request = require('request');
const waterfall = require('async-waterfall');

tweetIt();
setInterval(tweetIt, 1000 * 60 * 20); // 120 minute time interval
console.log("Cryptocurrency app is running :)");

// Ripple XRP
// Etherium ETH
// LiteCoin LTC
// Bitcoin Cash BCH
// IOTA IOT
// Dash DASH

function tweetIt() {

  String.prototype.insertAt=function(index, string) { 
    return this.substr(0, index) + string + this.substr(index);
  }
  
  const btcTask = (callback) => {
   
    request({
      url: 'https://www.bitstamp.net/api/v2/ticker/btcusd',
      json: true,
    },
    (err, res, json) => {
      btcUsd = json.last;
      btcUsd  = btcUsd.insertAt(2, ",");
      callback(null, btcUsd);
    });
  };

  const ethTask = (btcUsd, callback) => {
    request({
      url: 'https://www.bitstamp.net/api/v2/ticker/ethusd',
      json: true,
    },
    (err, res, json) => {
      ethUsd = json.last;
      ethUsd  = ethUsd.insertAt(1, ",");
      callback(null, btcUsd ,ethUsd);
    });
  };

  const xrpTask = (btcUsd,ethUsd,callback) => {
    request({
      url: 'https://www.bitstamp.net/api/v2/ticker/xrpusd',
      json: true,
    },
    (err, res, json) => {
      xrpUsd = json.last;
      callback(null,btcUsd,ethUsd,xrpUsd);
    });
  };

  const bchTask = (btcUsd,ethUsd,xrpUsd,callback) => {
    request({
      url: 'https://www.bitstamp.net/api/v2/ticker/bchusd',
      json: true,
    },
    (err, res, json) => {
      bchUsd = json.last;
      bchUsd = bchUsd.insertAt(1,",");
      timestamp = json.timestamp;    
      callback(null,btcUsd,ethUsd,xrpUsd,bchUsd,timestamp);
    });
  };

  const UsdTryTask = (btcUsd,ethUsd,xrpUsd,bchUsd,timestamp,callback) => {
  
    var a = new Date(timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var datetimestamp = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;

    let tweetProp = `
1 Bitcoin ( #BTC )
Dollar: ${btcUsd}$ 

1 Bitcoin Cash ( #BCH )
Dollar: ${bchUsd}$ 

1 Ethereum ( #ETH )
Dollar: ${ethUsd}$ 

1 Ripple ( #XRP )
Dollar: ${xrpUsd}$ 

Date: ${datetimestamp}

#Bitcoin #Ethereum #cryptocurrency #crypto #altcoin #Blockchain #Ripple
    `;

    let tweet = {
      status : tweetProp
    };

    callback(null, tweet);
  }

  waterfall([btcTask, ethTask, xrpTask,bchTask,UsdTryTask], (err, result) => {
    
    T.post('statuses/update', result, tweeted);

    function tweeted (err, data, response) {
      if (err) {
        console.log(err);
        console.log("someting went wrong while tweeting :( !!");
      }
    };
  });
}