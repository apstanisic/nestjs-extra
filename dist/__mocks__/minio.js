"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
exports.removeObject = jest.fn();
exports.removeObject
    .mockImplementationOnce((...params) => params[2](null))
    .mockImplementationOnce((...params) => params[2]('some-non-null-value'))
    .mockImplementation((...params) => params[2](null));
exports.removeObjects = jest.fn();
exports.removeObjects
    .mockImplementationOnce((...params) => params[2](null))
    .mockImplementationOnce((...params) => params[2]('some-non-null-value'))
    .mockImplementation((...params) => params[2](null));
exports.Client = jest.fn(() => ({
    putObject: jest.fn(),
    listObjectsV2: jest
        .fn()
        .mockImplementation((bucket, prefix) => {
        const stream = new stream_1.Stream();
        Array(5).forEach(i => {
            stream.emit('data', 'file-name');
        });
        stream.emit('end');
    }),
    removeObject: exports.removeObject,
    removeObjects: exports.removeObjects,
}));
//# sourceMappingURL=minio.js.map