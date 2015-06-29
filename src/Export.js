/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * Created on: 6/29/15
 * Author: Daniel Weinberger <daniel.weinberger@bitmovin.net>
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

if (typeof define === 'function' && define.amd) {
  // AMD anonymous module
  define([], function() {
    return Bitcodin;
  });
} else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
  // CommonJS/Node.js
  if (module['exports']) {
    module.exports = Bitcodin;
  } else {
    exports = Bitcodin;
  }
} else {
  global.Bitcodin = Bitcodin
}
