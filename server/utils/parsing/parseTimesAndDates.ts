export function parseTimesAndDates({ startDate, endDate }: { startDate: Date; endDate?: Date }) {
    endDate = endDate || startDate;

    if (isNaN(startDate.getDate()) || isNaN(endDate.getDate())) {
        console.error({ startDate, endDate });
        throw new Error(`Can not parseTimesAndDates because startDate.getDate() or endDate.getDate() is NaN `);
    }

    const days =
        startDate.getDate() === endDate.getDate()
            ? startDate.getDate().toString()
            : `${startDate.getDate()}-${endDate.getDate()}`;
    const durationInHours = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;

    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;

    const hours = startDate.getHours();
    const minutes = startDate.getMinutes();

    let time: string;
    if (isNaN(hours) || isNaN(minutes)) {
        console.error(
            `Something went wrong in parseTimesAndDates, parsing:`,
            { startDate, endDate },
            'but got NaN in hours or minutes:',
            { hours, minutes },
            'rest of the parsed values:',
            { days, durationInHours, year, month },
        );
        time = null;
    } else if (hours === 0 && minutes === 0) {
        time = null;
    } else {
        time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    return { days, durationInHours, year, month, time };
}
