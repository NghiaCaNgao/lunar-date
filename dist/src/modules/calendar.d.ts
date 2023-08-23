export interface ICalendarDate {
    day: number;
    month: number;
    year: number;
}
export type CalendarName = "solar_calendar" | "lunar_calendar";
export declare const PI: number;
export declare const INT: (d: number) => number;
export default abstract class Calendar {
    protected day: number;
    protected month: number;
    protected year: number;
    protected name: CalendarName;
    protected jd?: number;
    protected leap_year?: boolean;
    constructor(date: ICalendarDate, name: CalendarName);
    protected set(date: ICalendarDate): void;
    get(): {
        name: CalendarName;
        day: number;
        month: number;
        year: number;
        leap_year: boolean;
        julian: number;
    };
    abstract setDate(date: ICalendarDate): void;
}
