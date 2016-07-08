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
var knex = require('knex');
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
  debug('Building sql');
  var ctx = this.options.ctx;
  ctx._client = ctx._client || 'mssql';
  buildContent.call(this, ctx, ctx);
};

function buildContent(ctx, parentCtx) {
  ctx._client = ctx._client || parentCtx._client;

  // build content
  var source;
  try {
    var $ = knex({ client: ctx._client, formatting: true });
    source = this.generateSource(ctx, isValid, toSource, knexMap.bind(this), $);
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

// [http://knexjs.org/]
function knexMap(x, args, $) {
  var self = this;
  var cb = function (table) {
    return knexSchemaMap.call(self, x, args, table);
  };
  var cv = function (t, $) {
    return t.call(self, $);
  }
  var schemaName = x.schemaName || '';
  if (x.hasOwnProperty('createTable')) return $.schema.withSchema(schemaName).createTable(x.createTable, cb);
  else if (x.hasOwnProperty('renameTable')) return $.schema.renameTable(x.renameTable.from, x.renameTable.to);
  else if (x.hasOwnProperty('dropTable')) return $.schema.withSchema(schemaName).dropTable(x.dropTable);
  else if (x.hasOwnProperty('dropTableIfExists')) return $.schema.withSchema(schemaName).dropTableIfExists(x.dropTableIfExists);
  else if (x.hasOwnProperty('table')) return $.schema.withSchema(schemaName).table(x.table, cb);
  else if (x.hasOwnProperty('raw')) return $.schema.raw(x.raw);
  else if (x.hasOwnProperty('createView')) { return $.schema.raw('CREATE VIEW ?? \nAS (\n' + x.t.call(self, $) + '\n)', [schemaName + '.' + x.createView]); }
  else this.log(chalk.bold('ERR! ' + chalk.green(JSON.stringify(x)) + ' not defined'));
  return null;
};

function knexSchemaMap(element, args, t) {
  if (!element.t) {
    this.log(chalk.bold('ERR! ' + chalk.green('{ t: }') + ' not defined'));
    return;
  }
  _.forEach(element.t, function (x) {
    var self = this;
    var c = function (column) {
      return knexChainableMap.call(self, x, column);
    };
    if (x.hasOwnProperty('dropColumn')) c(t.dropColumn(x.dropColumn));
    else if (x.hasOwnProperty('dropColumns')) c(t.dropColumns(x.dropColumns));
    else if (x.hasOwnProperty('renameColumn')) c(t.renameColumn(x.renameColumn.from, x.renameColumn.to));
    else if (x.hasOwnProperty('increments')) c(t.increments(x.increments));
    else if (x.hasOwnProperty('integer')) c(t.integer(x.integer.name));
    else if (x.hasOwnProperty('bigInteger')) c(t.bigInteger(x.bigInteger.name));
    else if (x.hasOwnProperty('text')) c(t.text(x.text.name, x.text.textType));
    else if (x.hasOwnProperty('string')) c(t.string(x.string.name, x.string.length));
    else if (x.hasOwnProperty('float')) c(t.float(x.float.name, x.float.precision, x.float.scale));
    else if (x.hasOwnProperty('decimal')) c(t.decimal(x.decimal.name, x.decimal.precision, x.decimal.scale));
    else if (x.hasOwnProperty('boolean')) c(t.boolean(x.boolean.name));
    else if (x.hasOwnProperty('date')) c(t.date(x.date.name));
    else if (x.hasOwnProperty('datetime')) c(t.datetime(x.datetime.name));
    else if (x.hasOwnProperty('time')) c(t.time(x.time.name));
    else if (x.hasOwnProperty('timestamp')) c(t.timestamp(x.timestamp.name, x.timestamp.standard));
    else if (x.hasOwnProperty('timestamps')) c(t.timestamps());
    else if (x.hasOwnProperty('binary')) c(t.binary(x.binary.name, x.binary.length));
    else if (x.hasOwnProperty('enu')) c(t.enu(x.enu.name, x.enu.values));
    else if (x.hasOwnProperty('json')) c(t.json(x.json.name, x.json.jsonb));
    else if (x.hasOwnProperty('uuid')) c(t.uuid(x.uuid.name));
    else if (x.hasOwnProperty('x')) c(t.specificType(x.x.name, x.x.type));
    else if (x.hasOwnProperty('comment')) c(t.comment(x.comment));
    else if (x.hasOwnProperty('engine')) {
      if (element.createTable && args.client == 'mysql') c(t.engine(x.engine));
      else this.log(chalk.red('only available within a createTable call, and only applicable to MySQL.'));
    }
    else if (x.hasOwnProperty('charset')) {
      if (element.createTable && args.client == 'mysql') c(t.charset(x.charset));
      else this.log(chalk.red('only available within a createTable call, and only applicable to MySQL.'));
    }
    else if (x.hasOwnProperty('collate')) {
      if (element.createTable && args.client == 'mysql') c(t.collate(x.collate));
      else this.log(chalk.red('only available within a createTable call, and only applicable to MySQL.'));
    } else if (x.specificType) c(t.specificType(x.specificType.name, x.specificType.value));
    // knex method
    else if (x.hasOwnProperty('primary')) t.primary(x.primary);
    else if (x.hasOwnProperty('unique')) t.unique(x.unique);
    // custom
    else if (x.hasOwnProperty('formula')) formula(t, x.formula.name, x.formula.sql, x.formula.persistant || false);
    else this.log(chalk.bold('ERR! ' + chalk.green(JSON.stringify(x)) + ' not defined'));
  }.bind(this));
};

function knexChainableMap(x, c) {
  if (x.hasOwnProperty('index')) c = c.index(x.index.indexName, x.index.indexType);
  if (x.hasOwnProperty('primary')) c = c.primary();
  if (x.hasOwnProperty('unique')) c = c.unique();
  if (x.hasOwnProperty('references')) c = c.references(x.references).on(x.on);
  if (x.hasOwnProperty('inTable')) c = c.inTable(x.inTable);
  if (x.hasOwnProperty('onDelete')) c = c.onDelete(x.onDelete);
  if (x.hasOwnProperty('onUpdate')) c = c.onUpdate(x.onUpdate);
  if (x.hasOwnProperty('defaultTo')) c = c.defaultTo(x.defaultTo);
  if (x.hasOwnProperty('unsigned')) c = c.unsigned();
  if (x.hasOwnProperty('notNullable')) c = c.notNullable();
  if (x.hasOwnProperty('nullable')) c = c.nullable();
  if (x.hasOwnProperty('first')) c = c.first();
  if (x.hasOwnProperty('after')) c = c.after(x.after);
  if (x.hasOwnProperty('comment')) c = c.comment(x.comment);
  return c;
}

function formula(t, name, sql, persistant) {
  var type = 'AS (' + sql + (persistant ? ') PERSISTED' : ')');
  t.specificType(name, type)
}