"use strict";
const fs = jest.genMockFromModule('fs');
const mock = jest.fn();
mock.mockImplementation((...values) => {
    return Buffer.from(`
  EXAMPLE=1
  TEST=string-test
  `);
});
fs.readFileSync = mock;
module.exports = fs;
//# sourceMappingURL=fs.js.map