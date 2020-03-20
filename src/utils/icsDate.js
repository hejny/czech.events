'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function icsDate(date) {
    // TODO: Maybe create VTIMEZONE not shift the dates
    date = new Date(date.getTime() - 1000 * 60 * 60);
    const day =
        date.getFullYear().toString() +
        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) +
        (date.getDate() + 1 < 10 ? '0' + date.getDate().toString() : date.getDate().toString());
    const hour =
        (date.getHours() % 12).toString().padStart(2, '0') +
        date
            .getMinutes()
            .toString()
            .padStart(2, '0') +
        '00';
    return day + 'T' + hour + 'Z';
}
exports.icsDate = icsDate;
