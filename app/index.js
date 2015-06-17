/*
 * generator-fragment
 * https://github.com/BclEx/generator-fragment
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var util = require('util');
var scriptBase = require('../script-base.js');
var chalk = require('chalk');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
  
  this.on('end', function () {
    this.log(chalk.green('Building app...'));
    if (this.options.args.css) {
      this.invoke('fragment:css', {
        args: [this.options.args.css]
      });
    }
    if (this.options.args.html) {
      this.invoke('fragment:html', {
        args: [this.options.args.html]
      });
    }
    if (this.options.args.js) {
      this.invoke('fragment:js', {
        args: [this.options.args.js]
      });
    }
    if (this.options.args.sql) {
      this.invoke('fragment:sql', {
        args: [this.options.args.sql]
      });
    }
  });
};

util.inherits(Generator, scriptBase);