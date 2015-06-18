'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment generator load test', function () {

  it('can be imported without blowing up', function () {
    assert(require('../app') !== undefined);
    assert(require('../css') !== undefined);
    assert(require('../html') !== undefined);
    assert(require('../js') !== undefined);
    assert(require('../sql') !== undefined);
  });

  var fragment, genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  describe('load context by name', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        fs.writeFileSync(path.join(__dirname, '../tmp', 'name-x.json'),
"{\
	key: 'value0',\
	func: function () { return 'value1'; } \
}", 'utf8');
        fragment = helpers.createGenerator('fragment:app', [
           '../app'
        ], ['name-x'], genOptions);
        done();
      });
    });
    it('can be loaded by name', function (done) {
      fragment.run({}, function () {
        assert(this.options.args.key == 'value0');
        assert(this.options.args.func() == 'value1');
        done();
      }.bind(fragment));
    });
  });

  describe('load context by name as object', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        fragment = helpers.createGenerator('fragment:app', [
           '../app'
        ], [{
          key: 'value0',
          func: function () { return 'value1'; }
        }], genOptions);
        done();
      });
    });
    it('can be loaded by name as object', function (done) {
      fragment.run({}, function () {
        assert(this.options.args.key == 'value0');
        assert(this.options.args.func() == 'value1');
        done();
      }.bind(fragment));
    });
  });

  describe('load context by arguments', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        fragment = helpers.createGenerator('fragment:app', [
           '../app'
        ], [null], genOptions);
        done();
      });
    });
    it('can be loaded by arguments', function (done) {
      fragment.options.args = {
        key: 'value0',
        func: function () { return 'value1'; }
      };
      fragment.run({}, function () {
        assert(this.options.args.key == 'value0');
        assert(this.options.args.func() == 'value1');
        done();
      }.bind(fragment));
    });
  });

});
