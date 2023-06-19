interface ICalendarDate {
    day: number;
    month: number;
    year: number;
}
type CalendarName = "solar_calendar" | "lunar_calendar";
declare abstract class Calendar {
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

interface ISolarDate extends ICalendarDate {
}
declare class SolarDate extends Calendar {
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

interface ILunarDate extends ICalendarDate {
    jd?: number;
    leap_month?: boolean;
    leap_year?: boolean;
}
interface ILuckyHour {
    name: string;
    time: number[];
}
declare class LunarDate extends Calendar {
    private leap_month?;
    constructor(date: ILunarDate);
    init(force_change?: boolean): void;
    private static getRecommended;
    private static getYearCode;
    private static generateJdOfNewYear;
    private static decodeLunarYear;
    private static findLunarDate;
    private static getSunLongitudeByJd;
    private static getSunLongitude;
    static fromSolarDate(date: SolarDate): LunarDate;
    getYearName(): string;
    getMonthName(): string;
    getDayName(): string;
    getHourName(): string;
    getDayOfWeek(): string;
    getSolarTerm(): string;
    getLuckyHours(): Array<ILuckyHour>;
    toSolarDate(): SolarDate;
    setDate(date: ILunarDate): void;
    get(): {
        year_name: string;
        leap_month: boolean;
        name: CalendarName;
        day: number;
        month: number;
        year: number;
        leap_year: boolean;
        julian: number;
    };
}

export { ILunarDate, ISolarDate, LunarDate, SolarDate };
