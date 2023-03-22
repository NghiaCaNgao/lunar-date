export interface ICalendar {
    day: number;
    month: number;
    year: number;
}
export declare const PI: number;
export declare const INT: (d: number) => number;
export default abstract class Calendar {
    protected readonly day: number;
    protected readonly month: number;
    protected readonly year: number;
    protected jd?: number;
    protected leap?: boolean;
    constructor(date: ICalendar);
    static jdn(date: Date): number;
    get(): {
        day: number;
        month: number;
        year: number;
        leap: boolean;
        julian: number;
    };
}
