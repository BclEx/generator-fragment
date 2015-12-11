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
var program = require('ast-query');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
};

util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles() {
  this.log(chalk.green('Building js...'));
  var ctx = this.options.ctx;

  // build content
  var source;
  var $ = null;
  try {
    $ = program('');
  } catch (e) { this.log(chalk.bold(e)); return; }
  source = this.generateSource(ctx, isValid, toSource, astMap, $);
  this.log(source);

  // write content
  var path = ctx._path + '.js';
  this.fs.write(path, source);
};

function isValid(name) {
  return name.charAt(0) !== '_' && name !== 'constructor';
}

function toSource(obj) {
    return obj.toString() + '\n';
}

// [https://github.com/SBoudrias/AST-query]
// [https://github.com/ariya/esprima]
function astMap(prop, args, p) {
  return null;
};
