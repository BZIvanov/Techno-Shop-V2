## Axios

In the _package.json_ file, _transformIgnorePatterns_ is provided for jest, because with axios version > 1, the package is exported as module, not common js and jest is running test in node.js.
