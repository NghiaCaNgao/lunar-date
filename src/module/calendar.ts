export interface ICalendar {
    day: number
    month: number
    year: number
    leap?: boolean
    jd?: number
}

export const PI = Math.PI;
export const INT = (d: number): number => Math.floor(d);

export default abstract class Calendar {
    protected readonly day: number
    protected readonly month: number
    protected readonly year: number
    protected readonly jd: number // Julian Date
    protected leap?: boolean

    constructor(date: ICalendar) {
        this.day = date.day;
        this.month = date.month;
        this.year = date.year;
        this.leap = date.leap;
        this.jd = date.jd || Calendar.jdn(this.day, this.month, this.year);
    }

    /**
     * Convert from Solar date to Julian date.
     * @param day
     * @param month 
     * @param year 
     * @returns 
     */
    static jdn(day: number, month: number, year: number): number {
        var a = INT((14 - month) / 12);
        var y = year + 4800 - a;
        var m = month + 12 * a - 3;
        var jd = day + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
        if (jd < 2299161) {
            jd = day + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
        }
        return jd;
    }

    get() {
        return {
            day: this.day,
            month: this.month,
            year: this.year,
            leap: this.leap,
            julian: this.jd
        }
    }
}