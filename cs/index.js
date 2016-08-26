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
var program = require('ast-query.edge');
var _ = require('lodash');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
  var done = this.async();
  this.on('end', function () {
    done();
  });
};

util.inherits(Generator, scriptBase);

Generator.prototype.createFiles = function createFiles() {
  debug('Building cs');
  var ctx = this.options.ctx;
  buildContent.call(this, ctx, ctx);
};

function buildContent(ctx, parentCtx) {
  // build content
  var source;
  try {
    var $ = program('');
    source = this.generateSource(ctx, isValid, toSource, map.bind(this), $);
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

function toSource(obj, $) {
  if (obj.toAST) {
    obj.toAST();
  }
  return $.toString() + '\n';
}

function map(x, args, $) {
  var self = this;
  var cb = function (table) {
    return classMap.call(self, x, args, table);
  };
  var usings = x.usings;
  var schemaName = x.schemaName || '';
  if (x.hasOwnProperty('append')) return append(x.append, '', $);
  else if (x.hasOwnProperty('createClass')) return $.schema.addUsing(x.usings).withSchema(schemaName).createClass(x.createClass, cb);
  else if (x.hasOwnProperty('createClassIfNotExists')) return $.schema.addUsing(x.usings).withSchema(schemaName).createClass(x.createClassIfNotExists, cb);
  else if (x.hasOwnProperty('dropClass')) return $.schema.withSchema(schemaName).dropClass(x.dropClass);
  else if (x.hasOwnProperty('dropClassIfExists')) return $.schema.withSchema(schemaName).dropClassIfExists(x.dropClassIfExists);
  else if (x.hasOwnProperty('renameClass')) return $.schema.renameClass(x.renameClass.from, x.renameClass.to);
  else if (x.hasOwnProperty('class')) return $.schema.addUsing(x.usings).withSchema(schemaName).class(x.class, cb);
  else if (x.hasOwnProperty('raw')) return $.schema.raw(x.raw);
  else this.log(chalk.bold('ERR! ' + chalk.green(JSON.stringify(x)) + ' not defined'));
  return null;
};

function append(objs, selector, $) {
  objs.forEach(function (method) {
    method(selector, $);
  });
  return $;
}

function classMap(element, args, t) {
  if (!element.t) {
    this.log(chalk.bold('ERR! ' + chalk.green('{ t: }') + ' not defined'));
    return;
  }
  _.forEach(element.t, function (x) {
    var self = this;
    var c = function (column) {
      return chainableMap.call(self, x, column);
    };
    if (x.hasOwnProperty('dropMember')) c(t.dropMember(x.dropMember));
    else if (x.hasOwnProperty('renameMember')) c(t.renameMember(x.renameColumn.from, x.renameColumn.to));
    // Numeric
    else if (x.hasOwnProperty('byte')) c(t.byte(x.byte.name));
    else if (x.hasOwnProperty('sbyte')) c(t.sbyte(x.sbyte.name));
    else if (x.hasOwnProperty('short')) c(t.short(x.short.name));
    else if (x.hasOwnProperty('ushort')) c(t.ushort(x.ushort.name));
    else if (x.hasOwnProperty('int')) c(t.int(x.int.name));
    else if (x.hasOwnProperty('uint')) c(t.uint(x.uint.name));
    else if (x.hasOwnProperty('long')) c(t.long(x.long).name);
    else if (x.hasOwnProperty('ulong')) c(t.ulong(x.ulong.name));
    else if (x.hasOwnProperty('single')) c(t.single(x.single.name));
    else if (x.hasOwnProperty('float')) c(t.float(x.float.name));
    else if (x.hasOwnProperty('decimal')) c(t.decimal(x.decimal.name));
    // String
    else if (x.hasOwnProperty('char')) c(t.char(x.char.name));
    else if (x.hasOwnProperty('string')) c(t.string(x.string.name));
    // Additional
    else if (x.hasOwnProperty('void')) c(t.void(x.void.name));
    else if (x.hasOwnProperty('bool')) c(t.bool(x.bool.name));
    else if (x.hasOwnProperty('dateTime')) c(t.dateTime(x.dateTime.name));
    else if (x.hasOwnProperty('guid')) c(t.guid(x.guid.name));
    else if (x.hasOwnProperty('x')) c(t.time(x.x.name));
    //
    else if (x.hasOwnProperty('method')) t.method(x.method);
    else if (x.hasOwnProperty('dropMethod')) t.dropMethod(x.dropMethod);
    else this.log(chalk.bold('ERR! ' + chalk.green(JSON.stringify(x)) + ' not defined'));
  }.bind(this));
};

function chainableMap(x, c) {
  if (x.hasOwnProperty('defaultTo')) c = c.defaultTo(x.defaultTo);
  if (x.hasOwnProperty('attribute')) c = c.attribute(x.attribute);
  if (x.hasOwnProperty('array')) c = c.array(x.array);
  if (x.hasOwnProperty('comment')) c = c.comment(x.comment);
  return c;
}