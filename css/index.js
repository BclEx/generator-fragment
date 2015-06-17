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

Generator.prototype.createFiles = function (args) {
  this.log(chalk.green('Building sql...'));
  args = args || this.options.args;
  args.client = args.client || 'mysql';

  // build content
  var source;
  if (args.client == 'mssql') {
    source = this.generateSource(args, isValid, null, mssqlMap);
  } else {
    var knex_ = null;
    try {
      knex_ = knex({ client: args.client });
    } catch (e) { this.log(chalk.bold(e)); return null; }
    source = this.generateSource(args, isValid, knex_, knexMap);
  }
  this.log(source);

  // write content
  this.dest.write('name.css', source);
};

// Ensure a prototype method is a candidate run by default
function isValid(name) {
  return name.charAt(0) !== '_' && name !== 'constructor';
}


// [https://github.com/postcss/postcss/blob/master/docs/api.md]
function postCSSMap(k, ctx) {
  ctx.forEach(function (prop) {
    var cb = function (table) {
      return knexSchemaBuildingMap(ctx, prop, table);
    };
    if (prop.createTable) {
      return k.schema.createTable(prop.createTable, cb);
    } else if (prop.renameTable) {
      return k.schema.renameTable(prop.renameTable.from, prop.renameTable.to);
    } else if (prop.dropTable) {
      return k.schema.dropTable(prop.dropTable);
    } else if (prop.dropTableIfExists) {
      return k.schema.dropTableIfExists(prop.dropTableIfExists);
    } else if (prop.table) {
      return k.schema.table(prop.table, cb);
    } else if (prop.raw) {
      return k.schema.raw(prop.raw);
    } else {
      this.log(chalk.red('ERR! { [field]: not defined }'));
    }
    return null;
  });
};