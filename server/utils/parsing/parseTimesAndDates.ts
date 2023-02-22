export function parseTimesAndDates({ startDate, endDate }: { startDate: Date; endDate: Date }) {
    const days =
        startDate.getDate() === endDate.getDate()
            ? startDate.getDate().toString()
            : `${startDate.getDate()}-${endDate.getDate()}`;
    const durationInHours = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;

    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;

    let time = `${startDate.getHours().toString().padStart(2, '0')}:${startDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    if (time === '00:00') {
        time = null;
    }

    return { days, durationInHours, year, month, time };
}
