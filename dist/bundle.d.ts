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
    private static findLunarDate;
    private static decodeLunarYear;
    private static getYearInfo;
    private getYearInfo;
    static fromSolarDate(date: SolarDate): LunarDate;
    private static getSunLongitudeByJd;
    private static getSunLongitude;
    getYearCanChi(): string;
    getMonthCanChi(): string;
    getDayCanChi(): string;
    getGioCanChi(): string;
    getDayOfWeek(): string;
    getTietKhi(): string;
    getZodiacHour(): Array<IZodiacHour>;
    toSolarDate(): SolarDate;
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
