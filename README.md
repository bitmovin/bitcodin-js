# [![bitcodin](http://www.bitcodin.com/wp-content/uploads/2014/10/bitcodin-small.gif)](http://www.bitcodin.com)
[![build status](https://travis-ci.org/bitmovin/bitcodin-js.svg)](https://travis-ci.org/bitmovin/bitcodin-js)
[![Coverage Status](https://coveralls.io/repos/bitmovin/bitcodin-js/badge.svg?branch=master)](https://coveralls.io/r/bitmovin/bitcodin-js?branch=master)

The bitcodin API for JavaScript is a seamless integration with the [bitcodin cloud transcoding system](http://www.bitcodin.com). It enables the generation of MPEG-DASH and HLS content in just some minutes.

# Installation
First download the bitcodin-js package from our git repository. Change directory to where you want to download this package and run the following command:

```bash
git clone https://github.com/bitmovin/bitcodin-js.git
```
When you've downloaded this package successfully, include the `bitcodin.min.js` script - which is placed in the bin folder of the repository - in the head section of your html file.

```html
<head>
  <script type="text/javascript" src="bitcodin-js/bin/bitcodin.min.js></script>
</head>
```

# Usage

Before you can start using the api you need to **set your API key.**

Your API key can be found in the **settings of your bitcodin user account**, as shown in the figure below.

![APIKey](http://www.bitcodin.com/wp-content/uploads/2015/06/api_key.png)

An example how you can set the bitcodin API is shown in the following:

```javascript
var bitcodin = new Bitcodin('YOUR API KEY');
```

# Getting started
First add the JS file to your project by adding a script tag or by using a require statement if RequireJS / AMD etc. is used. All calls return a promise for success or error case.

![APIKey](http://www.bitcodin.com/wp-content/uploads/2015/06/api_key.png)

An example how you can instantiate the bitcodin API is shown in the following:

```javascript
var bitcodin = new Bitcodin('THIS_IS_MY_API_KEY');

bitcodin.input.list()
    .then(function(inputs) {
        console.log('inputs', inputs);
    }, function(err) {
        console.error(err);
    });
```
