/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * Created on: 6/19/15
 * Author: Daniel Weinberger <daniel.weinberger@bitmovin.net>
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

describe('BitcodinSpec', function() {
  var originalTimeout;
  var inputIds = [];
  var outputIds = [];
  var encodingProfileIds = [];
  var jobIds = [];
  var bitcodin;
  var settings = '{{SETTINGS}}';

  beforeEach(function() {
    bitcodin = new Bitcodin(settings.apikey);
    JasminePromiseMatchers.install();

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    JasminePromiseMatchers.uninstall();

    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should throw an error if no API key is given to the constructor', function() {
    expect(Bitcodin).toThrowError('No bitcodin API key given');
  });

  it('should create an input from a URL string', function(done) {
    var url = 'http://bitbucketireland.s3.amazonaws.com/Sintel-original-short.mkv';
    var promise = bitcodin.input.create(url);

    promise.then(function(data) {
      inputIds.push(data.inputId);
    });

    expect(promise).toBeResolved(done);
  });

  // TODO Test content / server is needed
  //it('should create an input from a URL string with credentials', function(done) {
  //  var url = '';
  //  var username = '';
  //  var password = '';
  //  expect(bitcodin.input.create(url, username, password)).toBeResolved(done);
  //});

  it('should create an input from a http input config object', function(done) {
    var httpInputConfig = {
      url: 'http://bitbucketireland.s3.amazonaws.com/Sintel-original-short.mkv'
    };
    var promise = bitcodin.input.create(httpInputConfig);

    promise.then(function(data) {
      inputIds.push(data.inputId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should create an input from a http input config object (which has multiple audio streams)', function(done) {
    var httpInputConfig = {
      url: 'http://bitbucketireland.s3.amazonaws.com/Sintel-two-audio-streams-short.mkv'
    };
    var promise = bitcodin.input.create(httpInputConfig);

    promise.then(function(data) {
      inputIds.push(data.inputId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should analyze an input', function(done) {
    expect(bitcodin.input.analayze(inputIds[0])).toBeResolved(done);
  });

  it('should list available inputs', function(done) {
    expect(bitcodin.input.list()).toBeResolved(done);
  });

  it('should list available inputs of a given page', function(done) {
    var page = 2;
    expect(bitcodin.input.list(page)).toBeResolved(done);
  });

  it('should get input details for a given input id', function(done) {
    expect(bitcodin.input.get(inputIds[0])).toBeResolved(done);
  });

  it('should create a S3 output config', function(done) {
    var promise = bitcodin.output.s3.create(settings.s3OutputEUWest);

    promise.then(function(data) {
      outputIds.push(data.outputId);
    });

    expect(promise).toBeResolved(done);
  });

  // TODO not implemented yet on the server side
  //it('should create a Google Cloud Storage output config', function(done) {
  //  var promise = bitcodin.output.gcs.create(settings.gcsOutputConfig);
  //
  //  promise.then(function(data) {
  //    outputIds.push(data.outputId);
  //  });
  //
  //  expect(promise).toBeResolved(done);
  //});

  it('should create a FTP output config', function(done) {
    var ftpOutputConfig = settings.ftpOutput;
    var promise = bitcodin.output.ftp.create(ftpOutputConfig);

    promise.then(function(data) {
      outputIds.push(data.outputId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should list outputs', function(done) {
    expect(bitcodin.output.list()).toBeResolved(done);
  });

  it('should list outputs of a given page', function(done) {
    var page = 2;
    expect(bitcodin.output.list(page)).toBeResolved(done);
  });

  it('should get output details for a given output id', function(done) {
    expect(bitcodin.output.getDetails(outputIds[0])).toBeResolved(done);
  });

  it('should create a new encoding profile', function(done) {
    var encodingProfile = {
      "name": "bitcodin Encoding Profile",
      "videoStreamConfigs": [
        {
          "defaultStreamId": 0,
          "bitrate": 1024000,
          "profile": "Main",
          "preset": "premium",
          "height": 204,
          "width": 480
        }
      ],
      "audioStreamConfigs": [
        {
          "defaultStreamId": 0,
          "bitrate": 256000
        }
      ]
    };
    var promise = bitcodin.encodingProfile.create(encodingProfile);

    promise.then(function(data) {
      encodingProfileIds.push(data.encodingProfileId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should create a new encoding profile for inputs with multiple audio streams', function(done) {
    var encodingProfile = {
      "name": "bitcodin Encoding Profile",
      "videoStreamConfigs": [
        {
          "defaultStreamId": 0,
          "bitrate": 512000,
          "profile": "Main",
          "preset": "premium",
          "height": 204,
          "width": 480
        }
      ],
      "audioStreamConfigs": [
        {
          "defaultStreamId": 0,
          "bitrate": 192000
        },
        {
          "defaultStreamId": 1,
          "bitrate": 192000
        }
      ]
    };
    var promise = bitcodin.encodingProfile.create(encodingProfile);

    promise.then(function(data) {
      encodingProfileIds.push(data.encodingProfileId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should list available encoding profiles', function(done) {
    expect(bitcodin.encodingProfile.list()).toBeResolved(done);
  });

  it('should list available encoding profiles of a given page', function(done) {
    var page = 2;
    expect(bitcodin.encodingProfile.list(page)).toBeResolved(done);
  });

  it('should get the encoding profile for a given id', function(done) {
    expect(bitcodin.encodingProfile.get(encodingProfileIds[0])).toBeResolved(done);
  });

  it('should create a new job', function(done) {
    var jobConfig = {
      'inputId': inputIds[0],
      'encodingProfileId': encodingProfileIds[0],
      'manifestTypes': [
        'mpd',
        'm3u8'
      ]
    };
    var promise = bitcodin.job.create(jobConfig);

    promise.then(function(data) {
      jobIds.push(data.jobId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should create a new job with widevine drm configuration', function(done) {
    var jobConfig = {
      'inputId': inputIds[0],
      'encodingProfileId': encodingProfileIds[0],
      'manifestTypes': [
        'mpd',
        'm3u8'
      ],
      'speed': 'standard',
      'drmConfig': {
        system: 'widevine',
        provider: 'widevine_test',
        signingKey: '1ae8ccd0e7985cc0b6203a55855a1034afc252980e970ca90e5202689f947ab9',
        signingIV: 'd58ce954203b7c9a9a9d467f59839249',
        requestUrl: 'http://license.uat.widevine.com/cenc/getcontentkey',
        contentId: '746573745f69645f4639465043304e4f',
        method: 'mpeg_cenc'
      }
    };

    var promise = bitcodin.job.create(jobConfig);

    promise.then(function(data) {
      jobIds.push(data.jobId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should create a new job with playready drm configuration', function(done) {
    var jobConfig = {
      'inputId': inputIds[0],
      'encodingProfileId': encodingProfileIds[0],
      'manifestTypes': [
        'mpd',
        'm3u8'
      ],
      'speed': 'standard',
      'drmConfig': {
        "system": "playready",
        "keySeed": "XVBovsmzhP9gRIZxWfFta3VVRPzVEWmJsazEJ46I",
        "laUrl": "http://playready.directtaps.net/pr/svc/rightsmanager.asmx",
        "method": "mpeg_cenc",
        "kid": "746573745f69645f4639465043304e4f"
      }
    };

    var promise = bitcodin.job.create(jobConfig);

    promise.then(function(data) {
      jobIds.push(data.jobId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should create a new job with widevine and playready (combined) drm configuration', function(done) {
    var jobConfig = {
      'inputId': inputIds[0],
      'encodingProfileId': encodingProfileIds[0],
      'manifestTypes': [
        'mpd',
        'm3u8'
      ],
      'speed': 'standard',
      'drmConfig': {
        "system": "widevine_playready",
        "kid": "eb676abbcb345e96bbcf616630f1a3da",
        "key": "100b6c20940f779a4589152b57d2dacb",
        "laUrl": "http://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&ContentKey=EAtsIJQPd5pFiRUrV9Layw==",
        "method": "mpeg_cenc",
        "pssh": "#CAESEOtnarvLNF6Wu89hZjDxo9oaDXdpZGV2aW5lX3Rlc3QiEGZrajNsamFTZGZhbGtyM2oqAkhEMgA="
      }
    };

    var promise = bitcodin.job.create(jobConfig);

    promise.then(function(data) {
      jobIds.push(data.jobId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should create a new job with hls encryption configuration', function(done) {
    var jobConfig = {
      'inputId': inputIds[0],
      'encodingProfileId': encodingProfileIds[0],
      'manifestTypes': [
        'mpd',
        'm3u8'
      ],
      'speed': 'standard',
      'hlsEncryptionConfig': {
        "method": "SAMPLE-AES",
        "key": "cab5b529ae28d5cc5e3e7bc3fd4a544d",
        "iv": "08eecef4b026deec395234d94218273d"
      }
    };

    var promise = bitcodin.job.create(jobConfig);

    promise.then(function(data) {
      jobIds.push(data.jobId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should create a job with an input which has multiple audio streams', function(done) {
    var jobConfig = {
      'inputId': inputIds[2],
      'encodingProfileId': encodingProfileIds[1],
      'manifestTypes': [
        'mpd',
        'm3u8'
      ],
      'speed': 'standard',
      'audioMetaData': [
        {
          'defaultStreamId': 0,
          'language': 'de',
          'label': 'Just Sound'
        },
        {
          'defaultStreamId': 1,
          'language': 'en',
          'label': 'Sound and Voice'
        }
      ]
    };

    var promise = bitcodin.job.create(jobConfig);

    promise.then(function(data) {
      jobIds.push(data.jobId);
    });

    expect(promise).toBeResolved(done);
  });


  it('should list jobs', function(done) {
    expect(bitcodin.job.list()).toBeResolved(done);
  });

  it('should list jobs of a given page', function(done) {
    var page = 2;
    expect(bitcodin.job.list(page)).toBeResolved(done);
  });

  it('should get the job details for a given job id', function(done) {
    expect(bitcodin.job.getDetails(jobIds[0])).toBeResolved(done);
  });

  it('should get the job status for a given job id', function(done) {
    expect(bitcodin.job.getStatus(jobIds[0])).toBeResolved(done);
  });

  it('should create a new transfer job', function(done) {
    var transferJobConfig = {
      'jobId': 2846,
      'outputId': outputIds[0]
    };
    expect(bitcodin.job.transfer.create(transferJobConfig)).toBeResolved(done);
  });

  it('should get the transfer job details for a given id', function(done) {
    expect(bitcodin.job.transfer.list(2846)).toBeResolved(done);
  });

  it('should get the output statistics for the current calendar month', function(done) {
    expect(bitcodin.statistic.get()).toBeResolved(done);
  });

  it('should get the job statistics for the given time window', function(done) {
    var from = '2000-12-24';
    var to   = '2100-12-24';
    expect(bitcodin.statistic.jobs(from, to)).toBeResolved(done);
  });

  it('should update invoice information', function(done) {
    var invoiceInfo = {
      'companyName': 'bitmovin GmbH',
      'firstName': 'Stefan',
      'lastName': 'Lederer',
      'address': 'Lakeside B01',
      'addressLineOptional': '',
      'postalCode': '9020',
      'city': 'Klagenfurt',
      'country': 'Austria',
      'vatNumber': 'ATU68021428'
    };
    expect(bitcodin.payment.invoice.updateInfo(invoiceInfo)).toBeResolved(done);
  });

  it('should get the invoice information', function(done) {
    expect(bitcodin.payment.invoice.getInfo()).toBeResolvedWith(jasmine.objectContaining({
      'firstName': 'Stefan',
      'lastName': 'Lederer',
      'address': 'Lakeside B01',
      'postalCode': '9020',
      'city': 'Klagenfurt',
      'country': 'Austria',
      'vatNumber': 'ATU68021428'
    }), done);
  });

  it('should get the wallet information', function(done) {
    expect(bitcodin.wallet.get()).toBeResolved(done);
  });

  it('should list deposits', function(done) {
    expect(bitcodin.wallet.listDeposits()).toBeResolved(done);
  });

  it('should list deposits of a given page', function(done) {
    var page = 2;
    expect(bitcodin.wallet.listDeposits(page)).toBeResolved(done);
  });

  it('should list bills', function(done) {
    expect(bitcodin.wallet.listBills()).toBeResolved(done);
  });

  it('should list bills of a given page', function(done) {
    var page = 2;
    expect(bitcodin.wallet.listBills(page)).toBeResolved(done);
  });

  it('should delete inputs', function(done) {
    for (var i = 0; i < inputIds.length; i++) {
      expect(bitcodin.input.delete(inputIds[i])).toBeResolved(done);
    }
  });

  it('should delete an output for a given output id', function(done) {
    for (var i = 0; i < outputIds.length; i++) {
      expect(bitcodin.output.delete(outputIds[i])).toBeResolved(done);
    }
  });

  it('should delete encoding profiles', function(done) {
    for (var i = 0; i < encodingProfileIds.length; i++) {
      expect(bitcodin.encodingProfile.delete(encodingProfileIds[i])).toBeResolved(done);
    }
  });
});
