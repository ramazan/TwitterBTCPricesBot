# TwitterCoinBot  - @CoinPriceNow
Coin Prices Bot For Twitter   https://twitter.com/coinpricenow

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

<img src="https://i.imgur.com/XRBXt6X.png" height="400px" width="725px"/>

![Secret](https://i.imgur.com/tj65QYN.png)


## Run

![Run]( https://image.ibb.co/niyJ46/Screen_Shot_2018_01_13_at_23_42_06.png)


## Finally Coin Prices :)
![Sample](https://image.ibb.co/cwtnE6/Screen_Shot_2018_01_13_at_23_38_01.png)
