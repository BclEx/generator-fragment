/*
 * generator-fragment
 * https://github.com/BclEx/generator-fragment
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        'script-base.js',
        'util.js',
        'app/*.js',
        'cs/*.js',
        'css/*.js',
        'html/*.js',
        'js/*.js',
        'sql/*.js',
        'test/**/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },

    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'spec'
      },
      all: 'test/**/*.js'
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'simplemocha']);
};