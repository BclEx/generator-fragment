'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment:css generator tests', function () {
  
  var angular;
  var genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };
  
  describe('css endpoints reached', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        angular = helpers.createGenerator('fragment:css', [
           '../css'
        ], [{
	         'build': function (knex) {

           }
        }], genOptions);
        done();
      });
    });
    it('can be loaded by object', function (done) {
        angular.run({ }, function () {
          assert.file(['tmp/name.css']);
          assert.fileContent('tmp/name.css', /create/);
          done();
        }.bind(angular));
    });
  });
  
});
