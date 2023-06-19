export interface ICalendarDate {
    day: number
    month: number
    year: number
}

export type CalendarName = "solar_calendar" | "lunar_calendar"

export const PI = Math.PI;
export const INT = (d: number): number => Math.floor(d); // get floor value

export default abstract class Calendar { // Role: Wrapper class
    protected day: number
    protected month: number
    protected year: number
    protected name: CalendarName
    protected jd?: number // Julian Date
    protected leap_year?: boolean

    constructor(date: ICalendarDate, name: CalendarName) {
        this.day = date.day;
        this.month = date.month;
        this.year = date.year;
        this.name = name;
    }

    protected set(date: ICalendarDate): void {
        this.day = date.day;
        this.month = date.month;
        this.year = date.year;
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

    abstract setDate(date: ICalendarDate): void;
}