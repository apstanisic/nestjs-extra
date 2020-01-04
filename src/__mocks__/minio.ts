import { Stream } from 'stream';

export const removeObject = jest.fn();
removeObject
  .mockImplementationOnce((...params) => params[2](null))
  .mockImplementationOnce((...params) => params[2]('some-non-null-value'))
  .mockImplementation((...params) => params[2](null));

export const removeObjects = jest.fn();
removeObjects
  .mockImplementationOnce((...params) => params[2](null))
  .mockImplementationOnce((...params) => params[2]('some-non-null-value'))
  .mockImplementation((...params) => params[2](null));

export const Client = jest.fn(() => ({
  putObject: jest.fn(),

  listObjectsV2: jest.fn().mockImplementation((bucket: string, prefix: string) => {
    const stream = new Stream();
    Array(5).forEach(i => {
      stream.emit('data', 'file-name');
    });
    stream.emit('end');
  }),

  removeObject,

  removeObjects,
}));

// export default {
//   Client,
// };
