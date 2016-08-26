'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('fragment:app generator tests', function () {

  var fragment, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('app endpoints reached.', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        fragment = helpers.createGenerator('fragment:app', [
          '../app', '../cs', '../css', '../html', '../js', '../sql'
        ], [], genOptions);
        done();
      });
    });
    it('can have methods and properties intermixed.', function (done) {
      fragment.options.ctx = {
        cs: {
          _file: 'name0.cs',
          build1: [{
            createClass: 'createClass1', t: [
              { string: { name: 'Name' } }]
          }]
        },
        css: {
          _file: 'name0.css',
          build1: [{
            rule: { selector: '[data-heading="60"]' }
          }]
        },
        _html: {
          _file: 'name0.html',
          _build: [{
            rule: { selector: '[data-heading="60"]' }
          }]
        },
        _js: {
          _file: 'name0.js',
          _build: [{
            rule: { selector: '[data-heading="60"]' }
          }]
        },
        sql: {
          _file: 'name0.sql',
          dropTable0: { dropTable: 'dropTable0' },
        },
      };
      fragment.run(function () {
        // assert.file(['../tmp/name0.css', '../tmp/name0.sql']);
        // assert.fileContent('../tmp/name0.css', /create/);
        done();
      }.bind(fragment));
    });
  });

});
