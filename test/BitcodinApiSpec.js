/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

describe('BitcodinApiSpec', function() {
  var originalTimeout;
  var api;

  beforeEach(function() {
    api = new BitcodinApi('{{API_KEY}}');
    JasminePromiseMatchers.install();

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    JasminePromiseMatchers.uninstall();

    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should list available inputs', function(done) {
    expect(api.listInputs()).toBeResolved(done);
  });

  it('should list available inputs of a given page', function(done) {
    var page = 2;
    expect(api.listInputs(page)).toBeResolved(done);
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
