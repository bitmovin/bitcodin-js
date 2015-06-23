/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

var BitcodinApi = function(apiKey) {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('No bitcodin API key given');
  }

  var BASE_URL = 'http://portal.bitcodin.com/api/';
  var API_VERSION = 'v1';
  var restClient;

  var getOptionalNumberParameterAsString = function(param) {
    if (param !== undefined && !isNaN(param)) {
      param = '/' + param
    } else {
      param = ''
    }
    return param;
  };

  // Inputs

  /**
   * Create a new input.
   * @link http://docs.bitcodinrestapi.apiary.io/reference/inputs/create-inputs/create-an-input
   *
   * @param {String | Object} source The URL as string, or a HTTP input config object
   * @param {String} [username] Basic Auth username
   * @param {String} [password] Basic Auth password
   * @returns {Promise}
   */
  this.createInput = function(source, username, password) {
    if (typeof source === 'string') {
      source = {
        "url" : source
      };

      if (username && password) {
        source.username = username;
        source.password = password;
      }
    }

    return restClient.post('input/create', source);
  };

  /**
   * Anaylize an existing input.
   * @link http://docs.bitcodinrestapi.apiary.io/reference/inputs/analyze-inputs/analyze-an-input
   *
   * @param {int} id
   * @returns {Promise}
   */
  this.analayzeInput = function(id) {
    return restClient.patch('input/' + id + '/analyze');
  };

  /**
   * List all inputs. 10 inputs per page are returned.
   * @link http://docs.bitcodinrestapi.apiary.io/reference/inputs/list-inputs/list-all-inputs
   *
   * @param {int} [pageNumber]
   * @returns {Promise}
   */
  this.listInputs = function(pageNumber) {
    pageNumber = getOptionalNumberParameterAsString(pageNumber);
    return restClient.get('inputs' + pageNumber);
  };

  this.getInput = function(id) {
    return restClient.get('input/' + id);
  };

  /**
   * Delete the input specified by id
   * @link http://docs.bitcodinrestapi.apiary.io/reference/inputs/input-details/delete-input
   *
   * @param id
   * @returns {Promise}
   */
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

  /**
   * List existing outputs. 10 outputs per page are returned.
   * @link http://docs.bitcodinrestapi.apiary.io/reference/output/list-outputs/list-outputs
   *
   * @param {int} [pageNumber]
   * @returns {Promise}
   */
  this.listOutputs = function(pageNumber) {
    pageNumber = getOptionalNumberParameterAsString(pageNumber);
    return restClient.get('outputs' + pageNumber);
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

  /**
   * List existing encoding profiles. 10 encoding profiles per page are returned.
   * @link http://docs.bitcodinrestapi.apiary.io/reference/encoding-profiles/list-encoding-profiles/list-encoding-profiles
   *
   * @param {int} [pageNumber]
   * @returns {Promise}
   */
  this.listEncodingProfiles = function(pageNumber) {
    pageNumber = getOptionalNumberParameterAsString(pageNumber);
    return restClient.get('encoding-profiles' + pageNumber);
  };

  this.getEncodingProfile = function() {
    // TODO
  };

  // Jobs

  this.createJob = function() {
    // TODO
  };

  /**
   *
   * @link http://docs.bitcodinrestapi.apiary.io/reference/jobs/list-jobs/list-all-jobs
   *
   * @param {int} [pageNumber]
   * @returns {Promise}
   */
  this.listJobs = function(pageNumber) {
    pageNumber = getOptionalNumberParameterAsString(pageNumber);
    return restClient.get('jobs' + pageNumber);
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

  /**
   *
   * @link http://docs.bitcodinrestapi.apiary.io/reference/payment-routes/invoice-info/update-invoice-infos
   *
   * @param invoiceInfo
   * @returns {Promise}
   */
  this.updateInvoiceInfos = function(invoiceInfo) {
    return restClient.post('payment/invoiceinfo', invoiceInfo);
  };

  /**
   *
   * @link http://docs.bitcodinrestapi.apiary.io/reference/payment-routes/invoice-info/get-invoice-infos
   *
   * @returns {Promise}
   */
  this.getInvoiceInfos = function() {
    return restClient.get('payment/invoiceinfo');
  };

  // Wallet Routes

  /**
   *
   * @link http://docs.bitcodinrestapi.apiary.io/reference/wallet-routes/wallet/get-wallet-information
   *
   * @returns {Promise}
   */
  this.getWalletInformation = function() {
    return restClient.get('wallet');
  };

  /**
   *
   * @link http://docs.bitcodinrestapi.apiary.io/reference/wallet-routes/deposits/get-a-list-of-all-deposits
   *
   * @param {int} [pageNumber]
   * @returns {Promise}
   */
  this.listDeposits = function(pageNumber) {
    pageNumber = getOptionalNumberParameterAsString(pageNumber);
    return restClient.get('wallet/deposits' + pageNumber);
  };

  /**
   *
   * @link http://docs.bitcodinrestapi.apiary.io/reference/wallet-routes/bills/get-a-list-of-all-bills
   *
   * @param {int} [pageNumber]
   * @returns {Promise}
   */
  this.listBills = function(pageNumber) {
    pageNumber = getOptionalNumberParameterAsString(pageNumber);
    return restClient.get('wallet/bills' + pageNumber);
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
