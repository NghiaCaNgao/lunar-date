import RootDate, { IRootDate } from "./calendar";
export default class SolarDate extends RootDate {
    constructor(date: IRootDate);
    constructor(date: Date);
    static isLeapYear(year: number): boolean;
    toJdn(): number;
    static fromJdn(jdn: number): SolarDate;
}
