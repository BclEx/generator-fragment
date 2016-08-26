'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('fragment:sql generator tests', function () {

  var fragment, genOptions = {
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
        fs.mkdirSync('db');
        fragment = helpers.createGenerator('fragment:sql', [
          '../sql'
        ], [], genOptions);
        done();
      });
    });
    it('can have methods and properties intermixed', function (done) {
      fragment.options.ctx = {
        _file: 'name0.sql',
        _client: 'mssql',
        build0: function (args, $) {
          return $.schema.createTable('createTable0', function (table) {
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
      fragment.destinationRoot('db');
      fragment.run(function () {
        assert.file(['./name0.sql']);
        assert.fileContent('./name0.sql', /create/);
        done();
      }.bind(fragment));
    });
  });

  describe('sql knex map', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        fs.mkdirSync('db');
        fragment = helpers.createGenerator('fragment:sql', [
          '../sql'
        ], [], genOptions);
        done();
      });
    });
    it('test', function (done) {
      fragment.options.ctx = {
        _file: 'name0.sql',
        _client: 'mssql',
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
      fragment.destinationRoot('db');
      fragment.run(function () {
        assert.file(['./name0.sql']);
        assert.fileContent('./name0.sql', /create/);
        done();
      }.bind(fragment));
    });
  });

});
