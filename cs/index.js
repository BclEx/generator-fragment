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
    source = this.generateSource(ctx, isValid, toSource, programMap.bind(this), $);
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

function programMap(prop, args, $) {
  var self = this;
  var cb = function (table) {
    return programClassMap.call(self, prop, args, table);
  };
  var usings = prop.usings;
  var schemaName = prop.schemaName || '';
  if (prop.hasOwnProperty('append')) return append(prop.append, '', $);
  else if (prop.hasOwnProperty('createClass')) return $.schema.addUsing(prop.usings).withSchema(schemaName).createClass(prop.createClass, cb);
  else if (prop.hasOwnProperty('createClassIfNotExists')) return $.schema.addUsing(prop.usings).withSchema(schemaName).createClass(prop.createClassIfNotExists, cb);
  else if (prop.hasOwnProperty('dropClass')) return $.schema.withSchema(schemaName).dropClass(prop.dropClass);
  else if (prop.hasOwnProperty('dropClassIfExists')) return $.schema.withSchema(schemaName).dropClassIfExists(prop.dropClassIfExists);
  else if (prop.hasOwnProperty('renameClass')) return $.schema.renameClass(prop.renameClass.from, prop.renameClass.to);
  else if (prop.hasOwnProperty('class')) return $.schema.addUsing(prop.usings).withSchema(schemaName).class(prop.class, cb);
  else if (prop.hasOwnProperty('raw')) return $.schema.raw(prop.raw);
  else this.log(chalk.bold('ERR! ' + chalk.green(JSON.stringify(prop)) + ' not defined'));
  return null;
};

function append(objs, selector, $) {
  objs.forEach(function (method) {
    method(selector, $);
  });
  return $;
}

function programClassMap(element, args, t) {
  if (!element.t) {
    this.log(chalk.bold('ERR! ' + chalk.green('{ t: }') + ' not defined'));
    return;
  }
  _.forEach(element.t, function (prop) {
    var self = this;
    var c = function (column) {
      return knexChainableMap.call(self, prop, column);
    };
    if (prop.hasOwnProperty('dropMember')) c(t.dropMember(prop.dropMember));
    else if (prop.hasOwnProperty('renameMember')) c(t.renameMember(prop.renameColumn.from, prop.renameColumn.to));
    // Numeric
    else if (prop.hasOwnProperty('byte')) c(t.byte(prop.byte.name));
    else if (prop.hasOwnProperty('sbyte')) c(t.sbyte(prop.sbyte.name));
    else if (prop.hasOwnProperty('short')) c(t.short(prop.short.name));
    else if (prop.hasOwnProperty('ushort')) c(t.ushort(prop.ushort.name));
    else if (prop.hasOwnProperty('int')) c(t.int(prop.int.name));
    else if (prop.hasOwnProperty('uint')) c(t.uint(prop.uint.name));
    else if (prop.hasOwnProperty('long')) c(t.long(prop.long).name);
    else if (prop.hasOwnProperty('ulong')) c(t.ulong(prop.ulong.name));
    else if (prop.hasOwnProperty('single')) c(t.single(prop.single.name));
    else if (prop.hasOwnProperty('float')) c(t.float(prop.float.name));
    else if (prop.hasOwnProperty('decimal')) c(t.decimal(prop.decimal.name));
    // String
    else if (prop.hasOwnProperty('char')) c(t.char(prop.char.name));
    else if (prop.hasOwnProperty('string')) c(t.string(prop.string.name));
    // Additional
    else if (prop.hasOwnProperty('void')) c(t.void(prop.void.name));
    else if (prop.hasOwnProperty('bool')) c(t.bool(prop.bool.name));
    else if (prop.hasOwnProperty('dateTime')) c(t.dateTime(prop.dateTime.name));
    else if (prop.hasOwnProperty('guid')) c(t.guid(prop.guid.name));
    else if (prop.hasOwnProperty('x')) c(t.time(prop.x.name));
    //
    else if (prop.hasOwnProperty('method')) t.method(prop.method);
    else if (prop.hasOwnProperty('dropMethod')) t.dropMethod(prop.dropMethod);
    else this.log(chalk.bold('ERR! ' + chalk.green(JSON.stringify(prop)) + ' not defined'));
  }.bind(this));
};

function knexChainableMap(prop, c) {
  if (prop.hasOwnProperty('defaultTo')) c = c.defaultTo(prop.defaultTo);
  if (prop.hasOwnProperty('attribute')) c = c.attribute(prop.attribute);
  if (prop.hasOwnProperty('array')) c = c.array(prop.array);
  if (prop.hasOwnProperty('comment')) c = c.comment(prop.comment);
  return c;
}