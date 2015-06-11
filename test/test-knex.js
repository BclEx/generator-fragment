'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment generator load test', function () {
  
  var angular;
  var genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };
  
  describe('knex endpoints reached', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        angular = helpers.createGenerator('fragment:knex', [
           '../knex'
        ], [{
	         'build': function (knex) {
              // test knex 
          		return knex.schema.createTable('users', function (table) {
            			table.increments();
            			table.string('name');
            			table.timestamps();
          		});
           }
        }], genOptions);
        done();
      });
    });
    it('can be loaded by object', function (done) {
        angular.run({ }, function () {
          assert()
          done();
        }.bind(angular));
    });
  });
  
});
