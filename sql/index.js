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
};

function isValid(name) {
  return name.charAt(0) !== '_' && name !== 'constructor';
}

function toSource(obj) {
    return obj.toString() + '\n';
}

// [http://knexjs.org/]
function knexMap(prop, args, p) {
  var self = this;
  var cb = function (table) {
    return knexSchemaBuildingMap.call(self, prop, args, table);
  };
  if (prop.hasOwnProperty('createTable')) return p.schema.createTable(prop.createTable, cb);
  else if (prop.hasOwnProperty('renameTable')) return p.schema.renameTable(prop.renameTable.from, prop.renameTable.to);
  else if (prop.hasOwnProperty('dropTable')) return p.schema.dropTable(prop.dropTable);
  else if (prop.hasOwnProperty('dropTableIfExists')) return p.schema.dropTableIfExists(prop.dropTableIfExists);
  else if (prop.hasOwnProperty('table')) return p.schema.table(prop.table, cb);
  else if (prop.hasOwnProperty('raw')) return p.schema.raw(prop.raw);
  else this.log(chalk.bold('ERR! ' + chalk.green(JSON.stringify(prop)) + ' not defined'));
  return null;
};

function knexSchemaBuildingMap(element, args, t) {
  if (!element.t) {
    this.log(chalk.bold('ERR! ' + chalk.green('{ t: }') + ' not defined' ));
    return;
  }
  _.forEach(element.t, function (prop) {
    var self = this;
    var c = function (column) {
      return knexChainableMap.call(self, prop, column);
    };
    if (prop.hasOwnProperty('dropColumn')) c(t.dropColumn(prop.dropColumn));
    else if (prop.hasOwnProperty('dropColumns')) c(t.dropColumns(prop.dropColumns));
    else if (prop.hasOwnProperty('renameColumn')) c(t.renameColumn(prop.renameColumn.from, prop.renameColumn.to));
    else if (prop.hasOwnProperty('increments')) c(t.increments(prop.increments));
    else if (prop.hasOwnProperty('integer')) c(t.integer(prop.integer.name));
    else if (prop.hasOwnProperty('bigInteger')) c(t.bigInteger(prop.bigInteger.name));
    else if (prop.hasOwnProperty('text')) c(t.text(prop.text.name, prop.text.textType));
    else if (prop.hasOwnProperty('string')) c(t.string(prop.string.name, prop.string.length));
    else if (prop.hasOwnProperty('float')) c(t.float(prop.float.name, prop.float.precision, prop.float.scale));
    else if (prop.hasOwnProperty('decimal')) c(t.decimal(prop.decimal.name, prop.decimal.precision, prop.decimal.scale));
    else if (prop.hasOwnProperty('boolean')) c(t.boolean(prop.boolean.name));
    else if (prop.hasOwnProperty('date')) c(t.date(prop.date.name));
    else if (prop.hasOwnProperty('datetime')) c(t.datetime(prop.datetime.name));
    else if (prop.hasOwnProperty('time')) c(t.time(prop.time.name));
    else if (prop.hasOwnProperty('timestamp')) c(t.timestamp(prop.timestamp.name, prop.timestamp.standard));
    else if (prop.hasOwnProperty('timestamps')) c(t.timestamps());
    else if (prop.hasOwnProperty('binary')) c(t.binary(prop.binary.name, prop.binary.length));
    else if (prop.hasOwnProperty('enu')) c(t.enu(prop.enu.name, prop.enu.values));
    else if (prop.hasOwnProperty('json')) c(t.json(prop.json.name, prop.json.jsonb));
    else if (prop.hasOwnProperty('uuid')) c(t.uuid(prop.uuid.name));
    else if (prop.hasOwnProperty('comment')) c(t.comment(prop.comment));
    else if (prop.hasOwnProperty('engine')) {
      if (element.createTable && args.client == 'mysql') c(t.engine(prop.engine));
      else this.log(chalk.red('only available within a createTable call, and only applicable to MySQL.'));
    }
    else if (prop.hasOwnProperty('charset')) {
      if (element.createTable && args.client == 'mysql') c(t.charset(prop.charset));
      else this.log(chalk.red('only available within a createTable call, and only applicable to MySQL.'));
    }
    else if (prop.hasOwnProperty('collate')) {
      if (element.createTable && args.client == 'mysql') c(t.collate(prop.collate));
      else this.log(chalk.red('only available within a createTable call, and only applicable to MySQL.'));
    } else if (prop.specificType) c(t.specificType(prop.specificType.name, prop.specificType.value));
    else this.log(chalk.bold('ERR! ' + chalk.green(JSON.stringify(prop)) + ' not defined'));
  }.bind(this));
};

function knexChainableMap(prop, c) {
  if (prop.hasOwnProperty('index')) c = c.index(prop.index.indexName, prop.index.indexType);
  if (prop.hasOwnProperty('primary')) c = c.primary();
  if (prop.hasOwnProperty('unique')) c = c.unique();
  if (prop.hasOwnProperty('references')) c = c.references(prop.references);
  if (prop.hasOwnProperty('inTable')) c = c.inTable(prop.inTable);
  if (prop.hasOwnProperty('onDelete')) c = c.onDelete(prop.onDelete);
  if (prop.hasOwnProperty('onUpdate')) c = c.onUpdate(prop.onUpdate);
  if (prop.hasOwnProperty('defaultTo')) c = c.defaultTo(prop.defaultTo);
  if (prop.hasOwnProperty('unsigned')) c = c.unsigned();
  if (prop.hasOwnProperty('notNullable')) c = c.notNullable();
  if (prop.hasOwnProperty('nullable')) c = c.nullable();
  if (prop.hasOwnProperty('first')) c = c.first();
  if (prop.hasOwnProperty('after')) c = c.after(prop.after);
  if (prop.hasOwnProperty('comment')) c = c.comment(prop.comment);
  return c;
}