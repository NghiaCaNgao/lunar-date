import * as Constants from "./constants";
import Calendar, { ICalendar } from "./calendar";
import SolarDate from "./solar";

export default class LunarDate extends Calendar {
    constructor(date: ICalendar) {
        super(date);
    }

    static FIRST_DAY = LunarDate.jdn(31, 1, 1200);
    static LAST_DAY = LunarDate.jdn(31, 12, 2199);

    static findLunarDate(julian_date: number, month_info: Array<LunarDate>) {
        if (julian_date > LunarDate.LAST_DAY
            || julian_date < LunarDate.FIRST_DAY
            || month_info[0].jd > julian_date) {
            throw new Error("Out of calculations");
        }

        let index = month_info.length - 1;
        while (julian_date < month_info[index].jd) {
            index--;
        }

        let off = julian_date - month_info[index].jd;

        return new LunarDate({
            day: month_info[index].day + off,
            month: month_info[index].month,
            year: month_info[index].year,
            leap: month_info[index].leap,
            jd: julian_date
        });
    }

    static decodeLunarYear(year: number, yearCode: number): Array<LunarDate> {
        let monthInfo = new Array<LunarDate>(); // A list of months specifying whether a month is leap or not
        let monthLengths = new Array(29, 30);
        let regularMonths = new Array(12); // create 12 cells corresponding to 12 months

        let offsetOfTet = yearCode >> 17;
        let leapMonth = yearCode & 0xf;
        let leapMonthLength = monthLengths[yearCode >> 16 & 0x1];
        let currentJD = Calendar.jdn(1, 1, year) + offsetOfTet;

        let j = yearCode >> 4;
        for (let i = 0; i < 12; i++) {
            regularMonths[12 - i - 1] = monthLengths[j & 0x1];
            j >>= 1; // j = j >> 1
        }

        for (let month = 1; month <= 12; month++) {
            if (leapMonth == month) {
                monthInfo.push(new LunarDate({
                    day: 1, month: leapMonth, year, leap: true, jd: currentJD
                }));
                currentJD += leapMonthLength;
            } else {
                monthInfo.push(new LunarDate({
                    day: 1, month, year, leap: false, jd: currentJD
                }))
                currentJD += regularMonths[month - 1];
            }
        }

        return monthInfo;
    }

    static getYearInfo(year: number): Array<LunarDate> {
        let yearCode: number;

        if (year < 1300) {
            yearCode = Constants.C13[year - 1200];
        } else if (year < 1400) {
            yearCode = Constants.C14[year - 1300];
        } else if (year < 1500) {
            yearCode = Constants.C15[year - 1400];
        } else if (year < 1600) {
            yearCode = Constants.C16[year - 1500];
        } else if (year < 1700) {
            yearCode = Constants.C17[year - 1600];
        } else if (year < 1800) {
            yearCode = Constants.C18[year - 1700];
        } else if (year < 1900) {
            yearCode = Constants.C19[year - 1800];
        } else if (year < 2000) {
            yearCode = Constants.C20[year - 1900];
        } else if (year < 2100) {
            yearCode = Constants.C21[year - 2000];
        } else {
            yearCode = Constants.C22[year - 2100];
        }
        return this.decodeLunarYear(year, yearCode);
    }

    getYearInfo(): Array<LunarDate> {
        return LunarDate.getYearInfo(this.year);
    }

    getYearCanChi(): string {
        return Constants.CAN[(this.year + 6) % 10] + " "
            + Constants.CHI[(this.year + 8) % 12];
    }

    toSolarDate(): SolarDate {
        const { day, month, year } = this;

        if (year < 1200 || year > 2199) {
            return new SolarDate({ day: 0, month: 0, year: 0 });
        }

        let monthInfo = this.getYearInfo();
        let currentMonthInfo = monthInfo[month - 1];
        if (currentMonthInfo.month != month) {
            currentMonthInfo = monthInfo[month];
        }
        var ld = currentMonthInfo.jd + day - 1;
        return SolarDate.fromJdn(ld);
    }

    static fromSolarDate(date: SolarDate): LunarDate {
        const { day, month, year } = date.get();
        if (year < 1200 || year > 2199) {
            return new LunarDate({ day: 0, month: 0, year: 0 });
        }

        let monthInfo = LunarDate.getYearInfo(year);
        let jd = Calendar.jdn(day, month, year);

        if (jd < monthInfo[0].jd) {
            monthInfo = LunarDate.getYearInfo(year - 1);
        }
        return LunarDate.findLunarDate(jd, monthInfo);
    }

    get() {
        return {
            ...super.get(),
            name: this.getYearCanChi()
        }
    }
}
