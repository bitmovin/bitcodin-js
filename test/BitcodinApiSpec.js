/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

describe('BitcodinApiSpec', function() {
  var originalTimeout;
  var inputIds = [];
  var outputIds = [];
  var encodingProfileIds = [];
  var jobIds = [];
  var api;
  var settings = '{{SETTINGS}}';

  beforeEach(function() {
    api = new BitcodinApi(settings.apikey);
    JasminePromiseMatchers.install();

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    JasminePromiseMatchers.uninstall();

    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should throw an error if no API key is given to the constructor', function() {
    expect(BitcodinApi).toThrowError('No bitcodin API key given');
  });

  it('should create an input from a URL string', function(done) {
    var url = 'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/Sintel.2010.720p.mkv';
    var promise = api.createInput(url);

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
  //  expect(api.createInput(url, username, password)).toBeResolved(done);
  //});

  it('should create an input from a http input config object', function(done) {
    var httpInputConfig = {
      url: 'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/Sintel.2010.720p.mkv'
    };
    var promise = api.createInput(httpInputConfig);

    promise.then(function(data) {
      inputIds.push(data.inputId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should analyze an input', function(done) {
    expect(api.analayzeInput(inputIds[0])).toBeResolved(done);
  });

  it('should list available inputs', function(done) {
    expect(api.listInputs()).toBeResolved(done);
  });

  it('should list available inputs of a given page', function(done) {
    var page = 2;
    expect(api.listInputs(page)).toBeResolved(done);
  });

  it('should get input details for a given input id', function(done) {
    expect(api.getInput(inputIds[0])).toBeResolved(done);
  });

  it('should create a S3 output config', function(done) {
    var promise = api.createS3Output(settings.s3OutputEUWest);

    promise.then(function(data) {
      outputIds.push(data.outputId);
    });

    expect(promise).toBeResolved(done);
  });

  // TODO not implemented yet on the server side
  //it('should create a Google Cloud Storage output config', function(done) {
  //  var promise = api.createGCSOutput(settings.gcsOutputConfig);
  //
  //  promise.then(function(data) {
  //    outputIds.push(data.outputId);
  //  });
  //
  //  expect(promise).toBeResolved(done);
  //});

  it('should create a FTP output config', function(done) {
    var ftpOutputConfig = settings.ftpOutput;
    var promise = api.createFTPOutput(ftpOutputConfig);

    promise.then(function(data) {
      outputIds.push(data.outputId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should list outputs', function(done) {
    expect(api.listOutputs()).toBeResolved(done);
  });

  it('should list outputs of a given page', function(done) {
    var page = 2;
    expect(api.listOutputs(page)).toBeResolved(done);
  });

  it('should get output details for a given output id', function(done) {
    expect(api.getOutputDetails(outputIds[0])).toBeResolved(done);
  });

  it('should create a new encoding profile', function(done) {
    var encodingProfile = {
      "name": "bitcodin Encoding Profile",
      "videoStreamConfigs": [
        {
          "defaultStreamId": 0,
          "bitrate": 1024000,
          "profile": "Main",
          "preset": "Standard",
          "height": 480,
          "width": 204
        }
      ],
      "audioStreamConfigs": [
        {
          "defaultStreamId": 0,
          "bitrate": 256000
        }
      ]
    };
    var promise = api.createEncodingProfile(encodingProfile);

    promise.then(function(data) {
      encodingProfileIds.push(data.encodingProfileId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should list available encoding profiles', function(done) {
    expect(api.listEncodingProfiles()).toBeResolved(done);
  });

  it('should list available encoding profiles of a given page', function(done) {
    var page = 2;
    expect(api.listEncodingProfiles(page)).toBeResolved(done);
  });

  it('should get the encoding profile for a given id', function(done) {
    expect(api.getEncodingProfile(encodingProfileIds[0])).toBeResolved(done);
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
    var promise = api.createJob(jobConfig);

    promise.then(function(data) {
      jobIds.push(data.jobId);
    });

    expect(promise).toBeResolved(done);
  });

  it('should list jobs', function(done) {
    expect(api.listJobs()).toBeResolved(done);
  });

  it('should list jobs of a given page', function(done) {
    var page = 2;
    expect(api.listJobs(page)).toBeResolved(done);
  });

  it('should get the job details for a given job id', function(done) {
    expect(api.getJobDetails(jobIds[0])).toBeResolved(done);
  });

  it('should get the job status for a given job id', function(done) {
    expect(api.getJobStatus(jobIds[0])).toBeResolved(done);
  });

  it('should create a new transfer job', function(done) {
    var transferJobConfig = {
      'jobId': 2846,
      'outputId': outputIds[0]
    };
    expect(api.createTransferJob(transferJobConfig)).toBeResolved(done);
  });

  it('should get the transfer job details for a given id', function(done) {
    expect(api.listTransferJob(2846)).toBeResolved(done);
  });

  it('should get the output statistics for the current calendar month', function(done) {
    expect(api.getOutputStatistics()).toBeResolved(done);
  });

  it('should get the job statistics for the given time window', function(done) {
    var from = '2000-12-24';
    var to   = '2100-12-24';
    expect(api.getJobStatistics(from, to)).toBeResolved(done);
  });

  it('should update invoice information', function(done) {
    var invoiceInfo = {
      'companyName': 'bitmovin GmbH',
      'firstName': 'Stefan',
      'lastName': 'Lederer',
      'address': 'Lakeside B01',
      'addressLineOptional': '',
      'postalCode': 9020,
      'city': 'Klagenfurt',
      'country': 'Austria',
      'vatNumber': 'ATU68021428'
    };
    expect(api.updateInvoiceInfos(invoiceInfo)).toBeResolved(done);
  });

  it('should get the invoice information', function(done) {
    expect(api.getInvoiceInfos()).toBeResolvedWith(jasmine.objectContaining({
      'firstName': 'Stefan',
      'lastName': 'Lederer',
      'address': 'Lakeside B01',
      'postalCode': 9020,
      'city': 'Klagenfurt',
      'country': 'Austria',
      'vatNumber': 'ATU68021428'
    }), done);
  });

  it('should get the wallet information', function(done) {
    expect(api.getWalletInformation()).toBeResolved(done);
  });

  it('should list deposits', function(done) {
    expect(api.listDeposits()).toBeResolved(done);
  });

  it('should list deposits of a given page', function(done) {
    var page = 2;
    expect(api.listDeposits(page)).toBeResolved(done);
  });

  it('should list bills', function(done) {
    expect(api.listBills()).toBeResolved(done);
  });

  it('should list bills of a given page', function(done) {
    var page = 2;
    expect(api.listBills(page)).toBeResolved(done);
  });

  it('should delete inputs', function(done) {
    for (var i = 0; i < inputIds.length; i++) {
      expect(api.deleteInput(inputIds[i])).toBeResolved(done);
    }
  });

  it('should delete an output for a given output id', function(done) {
    for (var i = 0; i < outputIds.length; i++) {
      expect(api.deleteOutput(outputIds[i])).toBeResolved(done);
    }
  });

  it('should delete encoding profiles', function(done) {
    for (var i = 0; i < encodingProfileIds.length; i++) {
      expect(api.deleteEncodingProfile(encodingProfileIds[i])).toBeResolved(done);
    }
  });
});
