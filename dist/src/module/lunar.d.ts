import RootDate, { IRootDate } from "./calendar";
import SolarDate from "./solar";
export default class LunarDate extends RootDate {
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
