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
export {};
