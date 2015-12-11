'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

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
           '../app', '../css', '../html', '../js', '../sql', '../sql'
        ], [], genOptions);
        done();
      });
    });
    it('can have methods and properties intermixed.', function (done) {
      fragment.options.ctx = {
        sql: {
          _path: 'name0',
          dropTable0: { dropTable: 'dropTable0' },
        },
        css: {
          _path: 'name0',
          build: [{
            rule: {selector: '[data-heading="60"]'}
          }]
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
