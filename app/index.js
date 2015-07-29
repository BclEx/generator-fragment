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
      this.composeWith('fragment:css', {
        args: [this.options.args.css]
      });
    }
    if (this.options.args.html) {
      this.composeWith('fragment:html', {
        args: [this.options.args.html]
      });
    }
    if (this.options.args.js) {
      this.composeWith('fragment:js', {
        args: [this.options.args.js]
      });
    }
    if (this.options.args.sql) {
      this.composeWith('fragment:sql', {
        args: [this.options.args.sql]
      });
    }
  });

};

util.inherits(Generator, scriptBase);

Generator.prototype.dummy = function dummy(args) {
};