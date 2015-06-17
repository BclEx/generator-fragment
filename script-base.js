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

Generator.prototype.generateSource = function (args, isValid, methodArgs, propMethod) {

  //var self = this;
  var props = Object.getOwnPropertyNames(args);
  var validProps = props.filter(isValid);
  assert(validProps.length, 'This Context is empty. Add at least one method for it to run.');

  function toSource(obj) {
      return obj.toString() + '\n';
  }

  var source = '';
  validProps.forEach(function (name) {
    var item = args[name];
    if (_.isFunction(item)) {
      try {
        source += toSource(item.call(this, args, methodArgs));
      } catch (err) { this.log(chalk.bold(err)); }
      return;
    } else if (_.isObject(item)) {
      try {
        source += toSource(propMethod.call(this, item, args, methodArgs));
      } catch (err) { this.log(chalk.bold(err)); }
      return;
    }
  }.bind(this));
  
  return source;
};
