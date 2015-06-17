'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment:html generator tests', function () {

  var fragment;
  var genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('html endpoints reached', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        fragment = helpers.createGenerator('fragment:html', [
           '../html'
        ], [null], genOptions);
        done();
      });
    });
    it('can have methods and properties intermixed', function (done) {
      fragment.options.args = {
        _path: 'name0',
        build0: function (args, $) {
          //$('ul', '<ul id="fruits"></ul>');
          return $;
        },
        _build1: [
        ]
      };
      fragment.run({}, function () {
        assert.file(['../tmp/name0.html']);
        // assert.fileContent('../tmp/name0.css', /create/);
        done();
      }.bind(fragment));
    });
  });

});
