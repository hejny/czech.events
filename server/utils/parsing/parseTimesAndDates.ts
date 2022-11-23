export function parseTimesAndDates({ startDate, endDate }: { startDate: Date; endDate: Date }) {

// !!! What if startDate is undefined

    const days =
        startDate.getDate() === endDate.getDate()
            ? startDate.getDate().toString()
            : `${startDate.getDate()}-${endDate.getDate()}`;
    const durationInHours = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;

    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;


    return { days, durationInHours,year,month };
}
