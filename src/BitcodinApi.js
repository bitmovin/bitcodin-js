/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

var BitcodinApi = function(apiKey) {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('No bitcodin API Key given');
  }

  var BASE_URL = 'http://portal.bitcodin.com/api/';
  var API_VERSION = 'v1';
  var restClient;

  // Inputs

  this.createInput = function(httpInputConfig) {
    return restClient.post('input/create', httpInputConfig);
  };

  this.analayzeInput = function() {
    // TODO
  };

  this.listInputs = function(pageNumber) {
    if (pageNumber !== undefined && !isNaN(pageNumber)) {
      pageNumber = '/' + pageNumber
    } else {
      pageNumber = ''
    }
    return restClient.get('inputs' + pageNumber);
  };

  this.getInput = function(id) {
    return restClient.get('input/' + id);
  };

  this.deleteInput = function(id) {
    return restClient.delete('input/' + id);
  };

  // Output

  this.createS3Output = function(s3OutputConfig) {
    return restClient.get('input/' + s3OutputConfig);
  };

  this.createGCSOutput = function(gcsOutputConfig) {
    return restClient.get('input/' + gcsOutputConfig);
  };

  this.createFTPOutput = function() {
    // TODO
  };

  this.listOutputs = function() {
    // TODO
  };

  this.getOutputDetails = function() {
    // TODO
  };

  this.deleteOutput = function() {
    // TODO
  };

  // Encoding Profiles

  this.createEncodingProfile = function() {
    // TODO
  };

  this.listEncodingProfiles = function() {
    // TODO
  };

  this.getEncodingProfile = function() {
    // TODO
  };

  // Jobs

  this.createJob = function() {
    // TODO
  };

  this.listJobs = function() {
    // TODO
  };

  this.getJobDetails = function() {
    // TODO
  };

  this.getJobStatus = function() {
    // TODO
  };

  this.createTransferJob = function() {
    // TODO
  };

  this.listTransferJob = function() {
    // TODO
  };

  // Statistics

  this.getOutputStatistics = function() {
    // TODO
  };

  this.getJobStatistics = function() {
    // TODO
  };

  // Payment Routes

  this.updateInvoiceInfos = function() {
    // TODO
  };

  this.getInvoiceInfos = function() {
    // TODO
  };

  // Wallet Routes

  this.getWalletInformation = function() {
    // TODO
  };

  this.listDeposits = function() {
    // TODO
  };

  this.listBills = function() {
    // TODO
  };

  (function() {
    var defaultHeaders = {
      'Content-Type'        : 'application/json',
      'bitcodin-api-version': API_VERSION,
      'bitcodin-api-key'    : apiKey
    };

    restClient = new RestClient(BASE_URL, defaultHeaders);
  })();
};
