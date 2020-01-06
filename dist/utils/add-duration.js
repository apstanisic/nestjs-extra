"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
function getEndTime(duration = moment.duration(1, 'month'), from = moment()) {
    const momentFrom = from instanceof Date ? moment(from) : from;
    if (typeof duration === 'number') {
        momentFrom.add(duration, 'months');
    }
    else {
        momentFrom.add(duration);
    }
    return momentFrom
        .subtract(1, 'day')
        .endOf('day')
        .toDate();
}
exports.getEndTime = getEndTime;
//# sourceMappingURL=add-duration.js.map