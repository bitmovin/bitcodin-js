/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

var RestClient = function(baseUrl, defaultHeaders) {
  var load = function(method, url, body) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, baseUrl + url, true);

      for (var prop in defaultHeaders) {
        if (defaultHeaders.hasOwnProperty(prop)) {
          xhr.setRequestHeader(prop, defaultHeaders[prop]);
        }
      }

      xhr.onreadystatechange = function() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            try {
              var result = JSON.parse(this.responseText);
              resolve(result);
            } catch(e) {
              reject('parse error');
            }
          } else {
            reject(method + ': `' + baseUrl + url + '` failed with status: [' + this.status + ']');
          }
        }
      };

      xhr.send(JSON.stringify(body));
    });
  };

  this.get    = function(url, body) { load('get', url, body); };
  this.post   = function(url, body) { load('post', url, body); };
  this.patch  = function(url, body) { load('patch', url, body); };
  this.delete = function(url, body) { load('delete', url, body); };
};
