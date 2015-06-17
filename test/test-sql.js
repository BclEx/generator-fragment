'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment:sql generator tests', function () {

  var angular;
  var genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('sql endpoints reached', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        angular = helpers.createGenerator('fragment:sql', [
           '../sql'
        ], [null], genOptions);
        done();
      });
    });
    it('can have methods and properties intermixed', function (done) {
      angular.options.args = {
        _path: 'name0',
        client: 'pg',
        build0: function (args, knex) {
          return knex.schema.createTable('createTable0', function (table) {
            table.increments();
            table.string('name');
            table.timestamps();
          });
        },
        build1: {
          createTable: 'createTable1', t: [
            { increments: null },
            { string: { name: 'name' } },
            { timestamps: null }]
        }
      };
      angular.run({}, function () {
        assert.file(['../tmp/name0.sql']);
        assert.fileContent('../tmp/name0.sql', /create/);
        done();
      }.bind(angular));
    });
  });

  describe('sql knex map', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        angular = helpers.createGenerator('fragment:sql', [
           '../sql'
        ], [null], genOptions);
        done();
      });
    });
    it('test', function (done) {
      angular.options.args = {
        _path: 'name0',
        client: 'pg',
        createTable0: { createTable: 'createTable0', t: [] },
        createTable1: {
          createTable: 'createTable1', t: [
            { increments: 'name' }]
        },
        renameTable0: { renameTable: { from: 'renameTable0a', to: 'renameTable0b' } },
        dropTable0: { dropTable: 'dropTable0' },
        dropTableIfExists0: { dropTableIfExists: 'dropTableIfExists0' },
        table0: { table: 'table0', t: [] },
        table1: {
          table: 'table1', t: [
            { increments: 'name' }]
        },
        raw0: { raw: 'raw0' }
      };
      angular.run({}, function () {
        assert.file(['../tmp/name0.sql']);
        assert.fileContent('../tmp/name0.sql', /create/);
        done();
      }.bind(angular));
    });
  });

});
