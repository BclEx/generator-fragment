'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('fragment:js generator tests', function () {

  var fragment, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('js endpoints reached', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        fragment = helpers.createGenerator('fragment:js', [
          '../js'
        ], [], genOptions);
        done();
      });
    });
    it('can have methods and properties intermixed', function (done) {
      fragment.options.ctx = {
        _file: 'name0.js',
        build0: function (args, $) {
          $.body.append("\
import * as h from '../_lib/h';\n\
let url = 'api/name';\n\
export let findAll = sort => h.get(url, {sort});\n\
export let findByName = name => h.get(url, {name});\n\
export let findById = id => h.get(url + '/' + id);\n\
export let updateItem = property => h.put(url, property);\n\
export let createItem = property => h.post(url, property);\n\
export let deleteItem = id => h.del(url + '/' + id);\n\
");
          return $;
        },
        _build1: [
          { append: null }
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
