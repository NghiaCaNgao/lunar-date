import Calendar, { ICalendar } from "./calendar";
import SolarDate from "./solar";
interface ILunarDate extends ICalendar {
    leap?: boolean;
    jd?: number;
}
interface IZodiacHour {
    name: string;
    time: number[];
}
export default class LunarDate extends Calendar {
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
export {};
