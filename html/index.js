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
var cheerio = require('cheerio'); // [https://github.com/cheeriojs/cheerio]

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
  buildContent.call(this, ctx, ctx);
};

function buildContent(ctx, parentCtx) {
  // build content
  var source;
  try {
    var $ = cheerio.load('<html />');
    source = this.generateSource(ctx, isValid, toSource, cheerioMap.bind(this), $);
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
  return obj.html() + '\n';
}

function cheerioMap(prop, args, $) {
  if (prop.hasOwnProperty('append')) return append(prop.append, 'html', $);
  else this.log(chalk.bold('ERR! ' + chalk.green(JSON.stringify(prop)) + ' not defined'));
  return null;
};

function append(objs, selector, $) {
  objs.forEach(function (method) {
    method(selector, $);
  });
  return $;
}