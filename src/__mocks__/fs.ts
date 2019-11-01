const fs: any = jest.genMockFromModule('fs');

const mock = jest.fn();
// mock.mockReturnValue({
//   example: 1,
//   test: 'string-test',
// });

mock.mockImplementation((...values: any) => {
  return Buffer.from(`
  EXAMPLE=1
  TEST=string-test
  `);
});

fs.readFileSync = mock;

module.exports = fs;
