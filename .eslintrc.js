
module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "mocha": true,
  },
  "extends": ["eslint:recommended"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "rules": {
    "no-console": "off",
    "no-inline-comments": "off",
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-empty": "warn",
  },
};
