import Calendar, { ICalendar } from "./calendar";
export default class SolarDate extends Calendar {
    constructor(date: ICalendar);
    constructor(date: Date);
    static isLeapYear(year: number): boolean;
    toJdn(): number;
    static fromJdn(jdn: number): SolarDate;
}
