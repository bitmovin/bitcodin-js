/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

describe('RestClientSpec', function() {
  var client;
  var settings = '{{SETTINGS}}';

  beforeEach(function() {
    JasminePromiseMatchers.install();
    client = new RestClient('http://portal.bitcodin.com/api/', {
      'Content-Type'        : 'application/json',
      'bitcodin-api-version': 'v1',
      'bitcodin-api-key'    : settings.apikey
    });
  });

  afterEach(function() {
    JasminePromiseMatchers.uninstall();
  });

  it('should reject a not existing route with the object in the response', function(done) {
    var url = 'test';
    var expectedResult = {
      "status":  404,
      "message": "unknown api-request-url"
    };

    expect(client.get(url)).toBeRejectedWith(jasmine.objectContaining(expectedResult), done);
  });

  it('should resolve an existing URL w/o JSON object with the response message', function(done) {
    var url = '';
    client = new RestClient('http://portal.bitcodin.com/');

    expect(client.get(url)).toBeResolved(done);
  });

  it('should reject a not existing URL w/o response with a defined error message', function(done) {
    client = new RestClient('http://www.example.com/');
    var url = 'bitcodin';
    var expectedResult = 'GET: `http://www.example.com/bitcodin` failed with status: [0]';

    expect(client.get(url)).toBeRejectedWith(expectedResult, done);
  });
});
