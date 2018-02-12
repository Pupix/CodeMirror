// CodeMirror Lint addon to use ESLint, copyright (c) by Angelo ZERR and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Depends on eslint.js from https://github.com/eslint/eslint

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

  var defaultConfig = {
    "ecmaFeatures": {},
    "parserOptions": {
      "ecmaVersion": 2017,
      "sourceType": 'module'
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    rules: {
        "constructor-super": "error",
        "no-case-declarations": "error",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-const-assign": "error",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-delete-var": "error",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-empty-character-class": "error",
        "no-empty-pattern": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-semi": "error",
        "no-fallthrough": "error",
        "no-func-assign": "error",
        "no-global-assign": "error",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-new-symbol": "error",
        "no-obj-calls": "error",
        "no-octal": "error",
        "no-redeclare": "error",
        "no-regex-spaces": "error",
        "no-self-assign": "error",
        "no-sparse-arrays": "error",
        "no-this-before-super": "error",
        "no-undef": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unused-labels": "error",
        "no-unused-vars": "error",
        "no-useless-escape": "error",
        "require-yield": "error",
        "use-isnan": "error",
        "valid-typeof": "error"
    }
  }

  function validator(text, options, cm) {
  if (!window.eslint) {
    return;
  }

  if (cm.adapter) {
    text = `${cm.adapter.inputPrefix || ''}${text}${cm.adapter.inputSuffix || ''}`;
  }

  var result = [], config = defaultConfig;
  var errors = window.eslint.verify(text, config);
  for (var i = 0; i < errors.length; i++) {
    var error = errors[i];
    result.push({message: error.message,
               severity: getSeverity(error),
               from: getPos(error, true),
                 to: getPos(error, false)});
  }
  return result;
  }

  CodeMirror.registerHelper("lint", "javascript", validator);

  function getPos(error, from) {
    var line = error.line-1, ch = from ? error.column : error.column+1;
    if (error.node && error.node.loc) {
      line = from ? error.node.loc.start.line -1 : error.node.loc.end.line -1;
      ch = from ? error.node.loc.start.column : error.node.loc.end.column;
    }
    return CodeMirror.Pos(line, ch);
  }

  function getSeverity(error) {
  switch(error.severity) {
    case 1:
      return "warning";
    case 2:
    return "error";
    default:
    return "error";
  }
  }

});
