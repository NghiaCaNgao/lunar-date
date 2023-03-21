interface IRootDate {
    day: number;
    month: number;
    year: number;
    leap?: boolean;
    jd?: number;
}
declare abstract class RootDate {
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

declare class SolarDate extends RootDate {
    constructor(date: IRootDate);
    constructor(date: Date);
    static isLeapYear(year: number): boolean;
    toJdn(): number;
    static fromJdn(jdn: number): SolarDate;
}

declare class LunarDate extends RootDate {
    constructor(date: IRootDate);
    static FIRST_DAY: number;
    static LAST_DAY: number;
    static findLunarDate(julian_date: number, month_info: Array<LunarDate>): LunarDate;
    static decodeLunarYear(year: number, yearCode: number): Array<LunarDate>;
    static getYearInfo(year: number): Array<LunarDate>;
    getYearInfo(): Array<LunarDate>;
    getYearCanChi(): string;
    toSolarDate(): SolarDate;
    static fromSolarDate(date: SolarDate): LunarDate;
    get(): {
        name: string;
        day: number;
        month: number;
        year: number;
        leap: boolean;
        julian: number;
    };
}

export { LunarDate, SolarDate };
