'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment:css generator tests', function () {

  var fragment, genOptions = {
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
        fragment = helpers.createGenerator('fragment:css', [
          '../css'
        ], [], genOptions);
        done();
      });
    });
    it('can have methods and properties intermixed', function (done) {
      fragment.options.ctx = {
        _path: 'name0',
        build0: function (args, $) {
          var css = $.root();
          for (var i = 1; i <= 3; i++) {
            var rule = $.rule({ selector: '[data-heading="' + i + '"]' });
            rule.append($.decl({ prop: 'width', value: (i * 10) }));
            css.append(rule);
          }
          return css;
        },
        build1: [{
          rule: { selector: '[data-heading="60"]' }
        }]
      };
      fragment.run(function () {
        assert.file(['../tmp/name0.css']);
        // assert.fileContent('../tmp/name0.css', /create/);
        done();
      }.bind(fragment));
    });
  });

});
