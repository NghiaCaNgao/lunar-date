export interface ICalendarDate {
    day: number
    month: number
    year: number
}

export type CalendarName = "solar_calendar" | "lunar_calendar"

export const PI = Math.PI;
export const INT = (d: number): number => Math.floor(d); // get floor value

export default abstract class Calendar { // Role: Wrapper class
    protected readonly day: number
    protected readonly month: number
    protected readonly year: number
    protected readonly name: CalendarName
    protected jd?: number // Julian Date
    protected leap_year?: boolean

    constructor(date: ICalendarDate, name: CalendarName) {
        this.day = date.day;
        this.month = date.month;
        this.year = date.year;
        this.name = name;
    }

    //TODO: Chuyển sang Solar và thêm kiểm tra ngày hợp lệ
    /**
     * Convert from Solar date to Julian date.
     * Ref: https://ssd.jpl.nasa.gov/tools/jdc/#/jd
     * @param {Date} date
     * @returns julian date
     */
    protected static jdn(date: ICalendarDate | Date): number {
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

    get() {
        return {
            name: this.name,
            day: this.day,
            month: this.month,
            year: this.year,
            leap_year: this.leap_year,
            julian: this.jd
        }
    }
}