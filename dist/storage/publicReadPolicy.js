"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function allowReadPolicy(bucketName) {
    return JSON.stringify({
        Version: '2012-10-17',
        Statement: [
            {
                Sid: 'AllowPublicRead',
                Effect: 'Allow',
                Principal: '*',
                Action: ['s3:GetObject'],
                Resource: [`arn:aws:s3:::${bucketName}/*`],
            },
        ],
    });
}
exports.allowReadPolicy = allowReadPolicy;
//# sourceMappingURL=publicReadPolicy.js.map