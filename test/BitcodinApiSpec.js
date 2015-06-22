/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

describe('BitcodinApiSpec', function() {
  var api;

  beforeEach(function() {
    api = new BitcodinApi('{{API_KEY}}');
    JasminePromiseMatchers.install();
  });

  afterEach(function() {
    JasminePromiseMatchers.uninstall();
  });

  it('should list available inputs', function(done) {
    expect(api.listInputs()).toBeResolved(done);
  });
});
