/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

describe('BitcodinApiSpec', function() {
  var originalTimeout;
  var inputIds = [];
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

  it('should delete inputs', function(done) {
    for (var i = 0; i < inputIds.length; i++) {
      expect(api.deleteInput(inputIds[i])).toBeResolved(done);
    }
  });

  it('should list outputs', function(done) {
    expect(api.listOutputs()).toBeResolved(done);
  });

  it('should list outputs of a given page', function(done) {
    var page = 2;
    expect(api.listOutputs(page)).toBeResolved(done);
  });

  it('should list available encoding profiles', function(done) {
    expect(api.listEncodingProfiles()).toBeResolved(done);
  });

  it('should list available encoding profiles of a given page', function(done) {
    var page = 2;
    expect(api.listEncodingProfiles(page)).toBeResolved(done);
  });

  it('should list jobs', function(done) {
    expect(api.listJobs()).toBeResolved(done);
  });

  it('should list jobs of a given page', function(done) {
    var page = 2;
    expect(api.listJobs(page)).toBeResolved(done);
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
});
