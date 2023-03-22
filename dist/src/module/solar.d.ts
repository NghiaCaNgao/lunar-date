import Calendar, { ICalendar } from "./calendar";
interface ISolarDate extends ICalendar {
}
export default class SolarDate extends Calendar {
    constructor(date: ISolarDate);
    constructor(date: Date);
    private static isLeapYear;
    toJd(): number;
    toDate(): Date;
    static fromJd(jd: number): SolarDate;
}
export {};
