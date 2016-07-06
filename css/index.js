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

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
  var done = this.async();
  this.on('end', function () {
    done();
  });
};

util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles() {
  debug('Building css');
  var ctx = this.options.ctx;
  buildContent.call(this, ctx, ctx);
};

function buildContent(ctx, parentCtx) {
  // build content
  var source;
  try {
    var $ = postcss();
    source = this.generateSource(ctx, isValid, toSource, postCssMap.bind(this), $);
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
