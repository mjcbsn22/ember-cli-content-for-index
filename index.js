/* jshint node: true */
'use strict';
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var debug = require('debug')('build');

var msgPrefix = '[EMBER-CLI-CONTENT-FOR-INDEX]';

function tryReadFile(path) {
  var fileContents;
  try {
    fileContents = fs.readFileSync(path, 'utf8');
  } catch (err) {
    //no-op
  }
  return fileContents;
}

module.exports = {
  name: 'ember-cli-content-for-index',

  contentFor: function (type, config) {
    var hrstart;
    var hrend;
    if (debug.enabled) {
      hrstart = process.hrtime();
    }
    var env = config.environment;
    var snippet = this._getSnippet(type, env);
    if (debug.enabled) {
      hrend = process.hrtime(hrstart);
    }

    // Performance timer. Invoke addon (e.g. 'ember test' with 'DEBUG=build' to see debug output.

    debug("Execution time: %ds %dms", hrend && hrend[0], hrend && hrend[1]/1000000);
    return snippet;
  },

  included: function () {
    // Thanks to ember-cli-mirage for the following addon directory lookup
    // example
    var app;

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll
    // just use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      var current = this;
      do {
        app = current.app || app;
      } while (current.parent.parent && (current = current.parent));
    }

    this.app = app;
    this.addonConfig = this.app.project.config(app.env)['ember-cli-content-for-index'] || {};
    this.addonBuildConfig = this.app.options['ember-cli-content-for-index'] || {};

    this._super.included.apply(this, arguments);
    if (this.addonBuildConfig.directory) {
      this.snippetDirectory = this.addonBuildConfig.directory;
    } else if (this.addonConfig.directory) {
      this.snippetDirectory = this.addonConfig.directory;
    } else if (app.project.pkg['ember-addon'] && !app.project.pkg['ember-addon'].paths) {
      this.snippetDirectory = path.resolve(app.project.root, path.join('tests', 'dummy', 'lib', 'snippets'));
    } else {
      this.snippetDirectory = path.join(this.app.project.root, 'lib', 'snippets');
    }
  },

  _addToSnippets(snippets, name, env) {
    var subpath = env ? (env + '/' + name ) : name;
    var snippetPath = path.resolve(path.join(this.snippetDirectory, subpath) + '.html');
    var snippet = tryReadFile(snippetPath);
    if (snippet) {
      snippets.push(snippet);
      var subMsg = 'Found ' + (env ? env + ' ' : '') + 'snippet for';
      var message = chalk.green(msgPrefix, subMsg, name);
      console.log(message);
    }
  },

  _getSnippet(name, env) {
    var snippets = [];
    this._addToSnippets(snippets, name);
    this._addToSnippets(snippets, name, env);
    return snippets.join("\n");
  }
};
