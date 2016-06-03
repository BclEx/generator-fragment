'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment:sc test', function () {

  var fragment, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('js endpoints reached', function () {
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
        _path: 'name0',
        build0: function (args, $) {
          return $;
        },
        _build1: [
          { rule: { selector: '[data-heading="1"]' } }
        ]
      };
      fragment.run(function () {
        assert.file(['../tmp/name0.js']);
        // assert.fileContent('../tmp/name0.js', /create/);
        done();
      }.bind(fragment));
    });
  });

});
