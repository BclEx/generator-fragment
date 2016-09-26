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
var postcss = require('postcss');
var _ = require('lodash');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
  var done = this.async();
  this.on('end', function () {
    done();
  });
};

util.inherits(Generator, scriptBase);

function isValid(name) {
  return name.charAt(0) !== '_' && name !== 'constructor';
}

function toSource(obj) {
  return obj.toString() + '\n';
}

// [https://github.com/postcss/postcss/blob/master/docs/api.md]
function map(x, args, $, $$) {
  // jshint validthis:true
  if (x.hasOwnProperty('root')) { return $.root(x.root); }
  else if (x.hasOwnProperty('atRule')) { return $.atRule(x.atRule); }
  else if (x.hasOwnProperty('rule')) { return $.rule(x.rule); }
  else if (x.hasOwnProperty('decl')) { return $.decl(x.decl); }
  else if (x.hasOwnProperty('comment')) { return $.comment(x.comment); }
  else { this.log(chalk.red('ERR! ' + JSON.stringify(x) + ' not defined')); }
  return null;
}

function buildContent(ctx, parentCtx) {
  // jshint validthis:true
  // build content
  var source;
  try {
    var $ = postcss; var $$ = $.parse('');
    source = this.generateSource(ctx, isValid, toSource, map.bind(this), $, $$);
  } catch (e) { this.log(chalk.bold(e)); return; }

  // write content
  var path = ctx._file;
  debug(path, source);
  this.fs.write(path, source);

  // call children
  var self = this;
  if (ctx.hasOwnProperty('_children')) {
    _.forEach(ctx._children, function (childCtx) {
      buildContent.call(self, childCtx, parentCtx);
    });
  }
}

Generator.prototype.createFiles = function createFiles() {
  debug('Building css');
  var ctx = this.options.ctx;
  buildContent.call(this, ctx, ctx);
};