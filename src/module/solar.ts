import Calendar, { ICalendarDate, INT } from "./calendar";

interface ISolarDate extends ICalendarDate { }

export default class SolarDate extends Calendar {
    public constructor(date: ISolarDate); // Eg., new SolarDate({day:1, month:1, year:2012})
    public constructor(date: Date); // Eg., new SolarDate(new Date());

    public constructor(...args: any[]) {
        const date = args[0];

        if (date instanceof Date) { // Date object
            super({
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            }, "solar_calendar");
            this.jd = SolarDate.jdn(date);
        }
        else { // ICalendar
            if (SolarDate.isValidDate(date)) {
                super(date, "solar_calendar");
                this.jd = SolarDate.jdn(new Date(date.year, date.month - 1, date.day));
            } else {
                throw new Error("Invalid date")
            }
        }

        this.leap_year = SolarDate.isLeapYear(this.year);
    }

    /**
     * Check if the given year is leap year.d
     * @param {number} year given year
     * @returns True if the given year is leap year
     */
    private static isLeapYear(year: number): boolean {
        return (year % 100 == 0 && year % 4 == 0) || year % 400 == 0;
    }

    /**
     * Check if the date is valid or not.
     * @param {Date} date given in ICalendarDate format
     * @returns True if the date is valid
     */
    private static isValidDate(date: ICalendarDate | Date): boolean {
        if (date instanceof Date) {
            // 05-14/10/1582 is not existed in the history
            if (date.getFullYear() === 1582 && date.getMonth() === 10 &&
                date.getDate() >= 5 && date.getDate() <= 14) {
                return false;
            }
        } else {
            const test_date = new Date(date.year, date.month - 1, date.day);

            // 05-14/10/1582 is not existed in the history
            if (date.year === 1582 && date.month === 10 &&
                date.day >= 5 && date.day <= 14) {
                return false;
            }

            return test_date.getFullYear() === date.year &&
                test_date.getMonth() === date.month - 1 &&
                test_date.getDay() === date.day
        }
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

        return new SolarDate({ day, month, year });
    }
}