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
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var Generator = module.exports = yeoman.generators.NamedBase.extend({
  	constructor: function () {
    	yeoman.Base.apply(this, arguments);

    	// Next, add your custom code
    	this.option('coffee'); // This method adds support for a `--coffee` flag
  	},
  	method1: function () {
    	this.log('method 1 just ran');
  	},
  	method2: function () {
    	this.log('method 2 just ran');
  	}
});
