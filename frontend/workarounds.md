## Axios

In the _package.json_ file, _transformIgnorePatterns_ is provided for jest, because with axios version > 1, the package is exported as module, not common js and jest is running test in node.js.

## CSS file imports

In the _package.json_ file, _moduleNameMapper_ is provided for jest, because for package **react-responsive-carousel** we are importing its css file and jest gets confused with css files imports.
Also created the \_\_mocks\_\_ folder where we provided the mocks files content to be used by jest.
