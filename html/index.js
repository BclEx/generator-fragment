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
var cheerio = require('cheerio');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
	var done = this.async();
	this.on('end', function () {
		done();
	});
};

util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles() {
  debug('Building html');
  var ctx = this.options.ctx;

  // build content
  var source;
  try {
    var $ = cheerio.load('');
    source = this.generateSource(ctx, isValid, toSource, cheerioMap.bind(this), $);
  } catch (e) { this.log(chalk.bold(e)); return; }
  
  // write content
  var path = ctx._file;
  debug(path, source);
  this.fs.write(path, source);
};

function isValid(name) {
  return name.charAt(0) !== '_' && name !== 'constructor';
}

function toSource(obj) {
  return obj.html() + '\n';
}

// [https://github.com/cheeriojs/cheerio]
function cheerioMap(prop, args, p) {
};
