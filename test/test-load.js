'use strict';

var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('fragment generator load test', function () {
  it('can be imported without blowing up', function () {
    assert(require('../app') !== undefined);
    assert(require('../css') !== undefined);
    assert(require('../html') !== undefined);
    assert(require('../js') !== undefined);
    assert(require('../knex') !== undefined);
  });
  
  var angular;
  var genOptions = {
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
	'key': 'value0',\
	'func': function () { return 'value1' } \
}", 'utf8');
        angular = helpers.createGenerator('fragment:app', [
           '../app'
        ], ['name-x'], genOptions);
        done();
      });
    });
    it('can be loaded by name', function (done) {
        angular.run({ }, function () {
          assert(this.options.ctx.key == 'value0');
          assert(this.options.ctx.func() == 'value1');
          done();
        }.bind(angular));
    });
  });
  
  describe('load context by object', function () {
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, '../tmp'), function (err) {
        if (err) {
          done(err);
        }
        angular = helpers.createGenerator('fragment:app', [
           '../app'
        ], [{
          'key': 'value0',
	         'func': function () { return 'value1' }
        }], genOptions);
        done();
      });
    });
    it('can be loaded by object', function (done) {
        angular.run({ }, function () {
          assert(this.options.ctx.key == 'value0');
          assert(this.options.ctx.func() == 'value1');
          done();
        }.bind(angular));
    });
  });
  
  
    
});


    // before(function (done) {
    //   helpers.run(path.join(__dirname, '../app'))
    //     .inDir(path.join(__dirname, './tmp'), f  unction (dir) {
    //       //fs.copySync(path.join(__dirname, '../templates/test'), dir);
    //     })
    //     .withOptions({ foo: 'bar' })
    //     .withArguments(['name-x'])
    //     // .on('ready', function (generator) {
    //     //   // var deps = ['./app'];
    //     //   // angular = helpers.createGenerator('fragment:app', deps, { }}, genOptions);
    //     // })
    //    
    // });