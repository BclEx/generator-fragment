'use strict';
var fs = require('fs')
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var debug = require('debug')('generator:fragment');
var chalk = require('chalk');
var _ = require('lodash');

var Generator = module.exports = function Generator() {
  //console.log(arguments);
  var ctx = {};
  var a = arguments[0];
  if (typeof a[0] === 'undefined') {
    a = arguments[1];
    ctx = a.ctx || {};
    debug('Base from parent: ' + ctx._name);
  } else if (typeof a[0] != 'string') {
    ctx = a[0] || {};
    arguments[0].shift();
    debug('Base from ctx: ' + ctx._name);
  } else {
    try {
      var filePath = path.join(process.cwd(), a[0] + '.json');
      ctx = eval('[' + fs.readFileSync(filePath, 'utf8') + ']')[0];
      debug('Base from file: ' + ctx._name);
    } catch (e) { this.log(chalk.bold(e)); }
  }
  yeoman.generators.Base.apply(this, arguments);
  this.options.ctx = ctx;
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.generateSource = function (args, isValid, toSource, propMethod, methodArgs) {
  var props = Object.getOwnPropertyNames(args);
  var validProps = props.filter(isValid);
  assert(validProps.length, 'This Context is empty. Add at least one method for it to run.');

  var source = '';
  function parseNode(item) {
    if (_.isFunction(item)) {
      source += toSource(item.call(this, args, methodArgs));
    } else if (_.isArray(item)) {
      _.forEach(item, function (subItem) {
        parseNode(subItem);
      });
    } else if (_.isObject(item)) {
      source += toSource(propMethod.call(this, item, args, methodArgs));
    }
  }

  validProps.forEach(function (name) {
    var item = args[name];
    // try {
      parseNode.call(this, item);
    // } catch (err) { this.log(chalk.bold(err)); }
  }.bind(this));

  return source;
};
