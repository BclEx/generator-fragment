'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs')
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  // Parse file
  if (typeof this.name != 'string') {
    this.options.ctx = this.name || {};
  } else {
    this.options.ctx = {};
    try {
      var filePath = path.join(process.cwd(), this.name + '.json');
      this.options.ctx = eval('[' + fs.readFileSync(filePath, 'utf8') + ']')[0];
    } catch (e) { this.log(chalk.bold(e)); }
  }
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.generateSourceAndTest = function (appTemplate, testTemplate, targetDirectory, skipAdd) {
};
