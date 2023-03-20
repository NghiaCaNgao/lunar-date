import Calendar, { ICalendar, INT } from "./calendar";

export default class SolarDate extends Calendar {
    public constructor(date: ICalendar);
    public constructor(date: Date);

    public constructor(...args: any[]) {
        const date = args[0];

        if (date.toJSON) { // Date object
            const d = date as Date;
            super({ day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() });
        } else { // ICalendar
            super(date);
        }

        this.leap = SolarDate.isLeapYear(this.year);
    }

    static isLeapYear(year:number): boolean {
        return (year % 100 == 0 && year % 4 == 0) || year % 400 == 0;
    }

    /**
     * Convert to Julian date
     * @returns Julian date
     */
    toJdn(): number {
        const { day, month, year } = this;
        return Calendar.jdn(day, month, year);
    }

    /**
     * Create a new Solar Date object from the Julian date
     * @param {number} jdn Julian date
     * @returns {SolarDate}
     */
    static fromJdn(jdn: number): SolarDate {
        let A: number;

        let Z = jdn;
        if (Z < 2299161) {
            A = Z;
        } else {
            let alpha = INT((Z - 1867216.25) / 36524.25);
            A = Z + 1 + alpha - INT(alpha / 4);
        }

        let B = A + 1524;
        let C = INT((B - 122.1) / 365.25);
        let D = INT(365.25 * C);
        let E = INT((B - D) / 30.6001);

        let day = INT(B - D - INT(30.6001 * E));
        let month = (E < 14) ? E - 1 : E - 13;
        let year = (month < 3) ? C - 4715 : C - 4716;

        return new SolarDate({ day: day, month: month, year: year, jd: jdn });
    }
}