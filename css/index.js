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
var postcss = require('postcss');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
};

util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles(args) {
  this.log(chalk.green('Building css...'));
  args = args || this.options.args;

  // build content
  var source;
  // var $ = null;
  // try {
  //   $ = postcss();
  // } catch (e) { this.log(chalk.bold(e)); return; }
  source = this.generateSource(args, isValid, toSource, postCssMap, postcss);
  this.log(source);

  // write content
  var path = args._path + '.css';
  this.fs.write(path, source);
};

function isValid(name) {
  return name.charAt(0) !== '_' && name !== 'constructor';
}

function toSource(obj) {
  return obj.toString() + '\n';
}

// [https://github.com/postcss/postcss/blob/master/docs/api.md]
function postCssMap(prop, args, p) {
  if (prop.hasOwnProperty('root')) return p.root(prop.root);
  else if (prop.hasOwnProperty('atRule')) return p.atRule(prop.atRule);
  else if (prop.hasOwnProperty('rule')) return p.rule(prop.rule);
  else if (prop.hasOwnProperty('decl')) return p.decl(prop.decl);
  else if (prop.hasOwnProperty('comment')) return p.comment(prop.comment);
  else this.log(chalk.red('ERR! ' + JSON.stringify(prop) + ' not defined'));
  return null;
};
