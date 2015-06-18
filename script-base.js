'use strict';
var fs = require('fs')
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var chalk = require('chalk');
var _ = require('lodash');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  // Parse file
  if (typeof this.name != 'string') {
    this.options.args = this.name || {};
  } else {
    this.options.args = {};
    try {
      var filePath = path.join(process.cwd(), this.name + '.json');
      this.options.args = eval('[' + fs.readFileSync(filePath, 'utf8') + ']')[0];
    } catch (e) { this.log(chalk.bold(e)); }
  }
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
    try {
      parseNode.call(this, item);
    } catch (err) { this.log(chalk.bold(err)); }
  }.bind(this));
  
  return source;
};
