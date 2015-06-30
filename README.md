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

Each Api Call with the bitcodin object returns a EC6 conform promise, which can be processed 
like follows:

```javascript
bitcodin.input.list()
    .then(function(inputs) {
        // this code will be processed when the api call succeeded
        console.log('inputs', inputs);
    }, function(err) {
        // this code will be processed when the api call failed
        console.error(err);
    });
```

# (Full) Example

## Creating a new Transcoding Job

This example shows the process of creating a new input and a new encoding profile. 
When the above mentioned objects are created a new transcoding job will be created.

```javascript
<html>
  <head>
    <script type="text/javascript" src="vendor/bitcodin-js/bin/bitcodin.min.js"></script>
  </head>
  <body>
    <p id="information">Creating transcoding Job...</p>
    <ul id="urllist" hidden>
      <li id="mpd"></li>
      <li id="hls"></li>
    </ul>
    <script type="text/javascript">
      var openMovieUrl = 'http://eu-storage.bitcodin.com/inputs/Sintel.2010.720p.mkv';
      var bitcodin = new Bitcodin('YOUR API KEY');

      var information = document.getElementById('information');
      var urllist = document.getElementById('urllist');
      var mpdurl = document.getElementById('mpd');
      var hlsurl = document.getElementById('hls');
      
      var createInputPromise = null;
      var createEncodingProfilePromise = null;
            
      var createLink = function(url) {
        var link = '<a href="' + url + '">' + url + '</a>';
        return link;
      };
      
      // Create bitcodin Input 
      createInputPromise = bitcodin.input.create(openMovieUrl);
      
      // Create bitcodin encoding profile. The ApiAry documentation which explains how such a 
      // encoding profile should look like can be found at the link below
      // http://docs.bitcodinrestapi.apiary.io/#reference/encoding-profiles/create-an-encoding-profile
      var encodingProfileConfiguration = {
        "name": "bitcodin Encoding Profile",
        "videoStreamConfigs": [
          {
            "defaultStreamId": 0,
            "bitrate": 1024000,
            "profile": "Main",
            "preset": "Standard",
            "height": 768,
            "width": 1366
          }
        ],
        "audioStreamConfigs": [
          {
            "defaultStreamId": 0,
            "bitrate": 256000
          }
        ]
      };
      
      createEncodingProfilePromise = bitcodin.encodingProfile.create(encodingProfileConfiguration);
            
      // Create a bitcodin job which transcodes the video to DASH and HLS. The ApiAry documentation which explains 
      // how a job configuration object should look like can be found at the following link below
      // http://docs.bitcodinrestapi.apiary.io/#reference/jobs/job/create-a-job
      
      var jobConfiguration = { 
        "inputId": -1,
        "encodingProfileId": -1,
        "manifestTypes":["mpd", "m3u8"]
      };
      
      Promise.all([createInputPromise, createEncodingProfilePromise])
        .then(
          function(result) {
            console.log('Successfully created input and encoding profile');
            jobConfiguration.inputId = result[0].inputId;
            jobConfiguration.encodingProfileId = result[1].encodingProfileId;
            bitcodin.job.create(jobConfiguration)
              .then(
                function(newlyCreatedJob) {
                  console.log('Successfully created a new transcoding job:');
                  console.log(newlyCreatedJob);
                  information.innerHTML = 'Successfully created Transcoding Job!';
                  mpdurl.innerHTML = createLink(newlyCreatedJob.manifestUrls.mpdUrl);
                  hlsurl.innerHTML = createLink(newlyCreatedJob.manifestUrls.m3u8Url);
                  urllist.removeAttribute('hidden');
                }, 
                function(error) {
                  console.log('Error while creating a new transcoding job:');
                  console.log(error);
                  information.innerHTML = 'Creating a new transcoding job failed!';
                }
              );
          }, 
          function(error) {
            console.log('Error while creating input and/or encoding profile:');
            console.log(error);
            information.innerHTML = 'Error while creating input and/or encoding profile';
          }
        );
      
    </script>
  </body>
</html>
```
