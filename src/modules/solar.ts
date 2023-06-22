import Calendar, { ICalendarDate, INT } from "./calendar";
import LunarDate from "./lunar";

export interface ISolarDate extends ICalendarDate { }

export default class SolarDate extends Calendar {
    public static readonly FIRST_DAY: number = SolarDate.jdn(new Date(1200, 0, 31)); //1200-1-31
    public static readonly LAST_DAY: number = SolarDate.jdn(new Date(2199, 11, 31)); //2199-12-31

    public constructor(date: ISolarDate); // Eg., new SolarDate({day:1, month:1, year:2012})
    public constructor(date: Date); // Eg., new SolarDate(new Date());

    public constructor(...args: any[]) {
        const date = args[0];

        if (date instanceof Date) { // Date object
            if (SolarDate.isValidDate(date)) {
                super({
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear()
                }, "solar_calendar");
                this.jd = SolarDate.jdn(date);
            } else {
                throw new Error("Invalid date")
            }
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
        return (year % 100 != 0 && year % 4 == 0) || year % 400 == 0;
    }

    /**
     * Check if the date is valid or not.
     * @param {Date} date given in ICalendarDate format
     * @returns True if the date is valid
     */
    private static isValidDate(date: ICalendarDate | Date): boolean {
        function isInBounds(date: Date): boolean {
            // 05-14/10/1582 is not existed in the history
            if (date.getFullYear() === 1582 && date.getMonth() === 9 &&
                date.getDate() >= 5 && date.getDate() <= 14) {
                return false;
            }

            // 31-01-1200 -> 21-12-2199 is valid date
            if (date.getFullYear() === 1200) {
                if (date.getMonth() === 0) {
                    if (date.getDate() < 31) {
                        return false;
                    }
                }
            } else if (date.getFullYear() < 1200 || date.getFullYear() > 2199) {
                return false;
            }

            return true;
        }

        if (date instanceof Date) {
            return isInBounds(date);
        } else {
            const test_date = new Date(date.year, date.month - 1, date.day);

            // Check if input is correct syntax
            if (test_date.getFullYear() !== date.year ||
                test_date.getMonth() !== date.month - 1 ||
                test_date.getDate() !== date.day) {
                return false
            }

            return isInBounds(test_date);
        }
    }

    /**
     * Create a new Solar Date object from the Julian date
     * @param {number} jd Julian date
     * @returns {SolarDate}
     */
    static fromJd(jd: number): SolarDate {
        if (jd < 2159387 || jd > 2524593) {
            throw new Error("Out of calculation");
        }

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

    /**
     * Convert from Solar date to Julian date.
     * Ref: https://ssd.jpl.nasa.gov/tools/jdc/#/jd
     * @param {Date} date
     * @returns julian date
    */
    static jdn(date: ICalendarDate | Date): number {
        if (SolarDate.isValidDate(date)) {
            const day = date instanceof Date ? date.getDate() : date.day;
            const month = date instanceof Date ? date.getMonth() + 1 : date.month;
            const year = date instanceof Date ? date.getFullYear() : date.year;

            const a = INT((14 - month) / 12);
            const y = year + 4800 - a;
            const m = month + 12 * a - 3;
            var jd = day + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;

            // https://github.com/NghiaCaNgao/lunarDate/wiki/Julian-calendar-conversion-problem
            if (jd < 2299161) {
                jd = day + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
            }

            return jd;
        }
        else {
            throw new Error("Invalid date")
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
     * Convert to Lunar date
     */
    toLunarDate(): LunarDate {
        return LunarDate.fromSolarDate(this);
    }

    setDate(date: ICalendarDate | Date): void {
        if (date instanceof Date) {
            if (SolarDate.isValidDate(date)) {
                this.set({
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear()
                })
                this.jd = SolarDate.jdn(date);
            } else {
                throw new Error("Invalid date")
            }
        }
        else {
            if (SolarDate.isValidDate(date)) {
                this.set(date);
                this.jd = SolarDate.jdn(new Date(date.year, date.month - 1, date.day));
            } else {
                throw new Error("Invalid date")
            }
        }
        this.leap_year = SolarDate.isLeapYear(this.year);
    }
}