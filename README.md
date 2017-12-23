# TwitterBTCBot  - @CoinPriceNow
BTC Prices Bot For Twitter   https://twitter.com/coinpricenow

# Installing

Clone repository  

In projects folder run bottom command .


```shell
npm install 
```

# Configuration

You need to change [Config.js](config.js) bottom parameter from Twitter for OAuth

```javascript
module.exports = {
        consumer_key:         '...',
        consumer_secret:      '...',
        access_token:         '...',
        access_token_secret:  '..',
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
}
 ```
For this keys go  [Twitter Application Management](https://apps.twitter.com/)

Login with your Twitter account and create app  

After creating app  click 'Keys and Access Tokens' section and get tokens 

![Token](https://i.imgur.com/XRBXt6X.png)
![Secret](https://i.imgur.com/tj65QYN.png)


## Run

![RUn]( https://image.ibb.co/cUEGem/Screen_Shot_2017_12_23_at_23_17_25.png)


## Finally BTC Prices :)
![Sample](https://image.ibb.co/dSdEX6/Screen_Shot_2017_12_23_at_23_15_17.png)
