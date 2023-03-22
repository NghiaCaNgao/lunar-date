interface ICalendar {
    day: number;
    month: number;
    year: number;
}
declare abstract class Calendar {
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

interface ISolarDate extends ICalendar {
}
declare class SolarDate extends Calendar {
    constructor(date: ISolarDate);
    constructor(date: Date);
    private static isLeapYear;
    toJd(): number;
    toDate(): Date;
    static fromJd(jd: number): SolarDate;
}

interface ILunarDate extends ICalendar {
    leap?: boolean;
    jd?: number;
}
interface IZodiacHour {
    name: string;
    time: number[];
}
declare class LunarDate extends Calendar {
    constructor(date: ILunarDate);
    private static FIRST_DAY;
    private static LAST_DAY;
    static findLunarDate(jd: number, month_info: Array<LunarDate>): LunarDate;
    static decodeLunarYear(year: number, yearCode: number): Array<LunarDate>;
    static getYearInfo(year: number): Array<LunarDate>;
    getYearInfo(): Array<LunarDate>;
    getYearCanChi(): string;
    getZodiacHour(): Array<IZodiacHour>;
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
