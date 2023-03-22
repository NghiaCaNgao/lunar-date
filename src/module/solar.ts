import Calendar, { ICalendar, INT } from "./calendar";

interface ISolarDate extends ICalendar { }

export default class SolarDate extends Calendar {
    public constructor(date: ISolarDate);
    public constructor(date: Date);

    public constructor(...args: any[]) {
        const date = args[0];

        if (date.toJSON) { // Date object
            const d = date as Date;
            super({
                day: d.getDate(),
                month: d.getMonth() + 1,
                year: d.getFullYear()
            });
            this.jd = SolarDate.jdn(date);
        } else { // ICalendar
            super(date);
            this.jd = SolarDate.jdn(new Date(date.year, date.month - 1, date.day));
        }

        this.leap = SolarDate.isLeapYear(this.year);
    }

    private static isLeapYear(year: number): boolean {
        return (year % 100 == 0 && year % 4 == 0) || year % 400 == 0;
    }

    /**
     * Convert to Julian date
     * @returns Julian date
     */
    toJd(): number {
        const { day, month, year } = this;
        return Calendar.jdn(this.toDate());
    }

    /**
     * Convert to Date object
     * @returns Date object
     */
    toDate(): Date {
        const { day, month, year } = this;
        return new Date(year, month - 1, day);
    }

    /**
     * Create a new Solar Date object from the Julian date
     * @param {number} jd Julian date
     * @returns {SolarDate}
     */
    static fromJd(jd: number): SolarDate {
        let A: number;

        if (jd < 2299161) {
            A = jd;
        } else {
            let alpha = INT((jd - 1867216.25) / 36524.25);
            A = jd + 1 + alpha - INT(alpha / 4);
        }

        let B = A + 1524;
        let C = INT((B - 122.1) / 365.25);
        let D = INT(365.25 * C);
        let E = INT((B - D) / 30.6001);

        let day = INT(B - D - INT(30.6001 * E));
        let month = (E < 14) ? E - 1 : E - 13;
        let year = (month < 3) ? C - 4715 : C - 4716;

        return new SolarDate({ day: day, month: month, year: year });
    }
}