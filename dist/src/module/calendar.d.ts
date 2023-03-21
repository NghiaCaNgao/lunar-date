export interface IRootDate {
    day: number;
    month: number;
    year: number;
    leap?: boolean;
    jd?: number;
}
export declare const PI: number;
export declare const INT: (d: number) => number;
export default abstract class RootDate {
    protected readonly day: number;
    protected readonly month: number;
    protected readonly year: number;
    protected readonly jd: number;
    protected leap?: boolean;
    constructor(date: IRootDate);
    static jdn(day: number, month: number, year: number): number;
    get(): {
        day: number;
        month: number;
        year: number;
        leap: boolean;
        julian: number;
    };
}
