'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('fragment:sc test', function () {

  var fragment, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('cs endpoints reached', function () {
    before(function (done) {
      var deps = [
        '../cs'
      ];
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        fragment = helpers.createGenerator('fragment:cs', deps, [], genOptions);
        done();
      });
    });
    it('can have methods and properties intermixed', function (done) {
      fragment.options.ctx = {
        _file: 'name0.cs',
        build0: function (args, $) {
          return $.schema.createClass('createClass0', function (c) {
            c.string('Name').attribute({ DisplayName: 'DisplayName' });
            c.dateTime('Date');
          });
        },
        build1: {
          schemaName: 'CORE',
          createClass: 'createClass1', t: [
            { string: { name: 'Name' }, attribute: { DisplayName: 'DisplayName' } },
            { dateTime: { name: 'Date' } }]
        }
      };
      fragment.run(function () {
        assert.file(['../tmp/name0.cs']);
        // assert.fileContent('../tmp/name0.cs', /create/);
        done();
      }.bind(fragment));
    });
  });

});
