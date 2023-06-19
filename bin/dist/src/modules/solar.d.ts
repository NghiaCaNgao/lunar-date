import Calendar, { ICalendarDate } from "./calendar";
import LunarDate from "./lunar";
export interface ISolarDate extends ICalendarDate {
}
export default class SolarDate extends Calendar {
    static readonly FIRST_DAY: number;
    static readonly LAST_DAY: number;
    constructor(date: ISolarDate);
    constructor(date: Date);
    private static isLeapYear;
    private static isValidDate;
    static fromJd(jd: number): SolarDate;
    static jdn(date: ICalendarDate | Date): number;
    toDate(): Date;
    toLunarDate(): LunarDate;
    setDate(date: ICalendarDate | Date): void;
}
