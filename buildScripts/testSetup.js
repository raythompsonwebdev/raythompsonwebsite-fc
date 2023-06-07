// This file isn't transpiled, so must use CommonJS and ES5

// Register babel to transpile before our tests run.
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("@babel/register")();

// Disable webpack features that Mocha doesn't understand.
// eslint-disable-next-line func-names, @typescript-eslint/no-empty-function
require.extensions[".scss"] = function () {};
