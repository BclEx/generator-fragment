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
var debug = require('debug')('generator:fragment');
var chalk = require('chalk');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
  var done = this.async();
  this.on('end', function () {
    done();
  });
};

util.inherits(Generator, scriptBase);

Generator.prototype.dummy = function dummy(args) {
  debug('Building app');
  if (this.options.ctx.cs) {
    this.composeWith('fragment:cs', { ctx: [this.options.ctx.cs] });
  }
  if (this.options.ctx.css) {
    this.composeWith('fragment:css', { ctx: [this.options.ctx.css] });
  }
  if (this.options.ctx.html) {
    this.composeWith('fragment:html', { ctx: [this.options.ctx.html] });
  }
  if (this.options.ctx.js) {
    this.composeWith('fragment:js', { ctx: [this.options.ctx.js] });
  }
  if (this.options.ctx.sql) {
    this.composeWith('fragment:sql', { ctx: [this.options.ctx.sql] });
  }
};