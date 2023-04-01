import * as Constants from "./constants";
import Calendar, { ICalendar, PI, INT } from "./calendar";
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
    constructor(date: ILunarDate) {
        super(date);

        this.leap = date.leap;
        this.jd = date.jd;
    }

    private static FIRST_DAY = Calendar.jdn(new Date(1200, 0, 31));
    private static LAST_DAY = Calendar.jdn(new Date(2199, 11, 31));

    private static findLunarDate(jd: number, month_info: Array<LunarDate>) {
        if (jd > LunarDate.LAST_DAY
            || jd < LunarDate.FIRST_DAY
            || month_info[0].jd > jd) {
            throw new Error("Out of calculations");
        }

        let index = month_info.length - 1;
        while (jd < month_info[index].jd) {
            index--;
        }

        let off = jd - month_info[index].jd;

        return new LunarDate({
            day: month_info[index].day + off,
            month: month_info[index].month,
            year: month_info[index].year,
            leap: month_info[index].leap,
            jd: jd
        });
    }

    private static decodeLunarYear(year: number, yearCode: number): Array<LunarDate> {
        let monthInfo = new Array<LunarDate>(); // A list of months specifying whether a month is leap or not
        let monthLengths = new Array(29, 30);
        let regularMonths = new Array(12); // create 12 cells corresponding to 12 months

        let offsetOfTet = yearCode >> 17;
        let leapMonth = yearCode & 0xf;
        let leapMonthLength = monthLengths[yearCode >> 16 & 0x1];
        let currentJD = Calendar.jdn(new Date(year, 0, 1)) + offsetOfTet;

        let j = yearCode >> 4;
        for (let i = 0; i < 12; i++) {
            regularMonths[12 - i - 1] = monthLengths[j & 0x1];
            j >>= 1; // j = j >> 1
        }

        for (let month = 1; month <= 12; month++) {
            const date = { day: 1, month, year };

            monthInfo.push(new LunarDate({
                ...date,
                leap: false,
                jd: currentJD
            }));
            currentJD += regularMonths[month - 1];

            if (leapMonth == month) {
                monthInfo.push(new LunarDate({
                    ...date,
                    leap: true,
                    jd: currentJD
                }));
                currentJD += leapMonthLength;
            }
        }

        return monthInfo;
    }

    private static getYearInfo(year: number): Array<LunarDate> {
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

    private getYearInfo(): Array<LunarDate> {
        return LunarDate.getYearInfo(this.year);
    }

    static fromSolarDate(date: SolarDate): LunarDate {
        const { day, month, year } = date.get();
        if (year < 1200 || year > 2199) {
            return new LunarDate({ day: 0, month: 0, year: 0 });
        }

        let monthInfo = LunarDate.getYearInfo(year);
        let jd = Calendar.jdn(new Date(year, month - 1, day));

        if (jd < monthInfo[0].jd) {
            monthInfo = LunarDate.getYearInfo(year - 1);
        }
        return LunarDate.findLunarDate(jd, monthInfo);
    }

    /* Compute the longitude of the sun at any time.
    * Parameter: floating number jdn, the number of days since 1/1/4713 BC noon
    * Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
    */
    private static getSunLongitudeByJd(jd: number): number {
        const T = (jd - 2451545.0) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
        const T2 = T * T;
        const dr = PI / 180; // degree to radian

        const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
        const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
        let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M)
            + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M)
            + 0.000290 * Math.sin(dr * 3 * M);

        const theta = L0 + DL; // true longitude, degree
        const omega = 125.04 - 1934.136 * T; // obtain apparent longitude by correcting for nutation and aberration
        let lambda = theta - 0.00569 - 0.00478 * Math.sin(omega * dr);

        // Convert to radians
        lambda = lambda * dr;
        lambda = lambda - PI * 2 * (INT(lambda / (PI * 2))); // Normalize to (0, 2*PI)
        return lambda;
    }

    /* Compute the sun segment at start (00:00) of the day with the given integral Julian day number.
    * The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00.
    * The function returns a number between 0 and 23.
    * From the day after March equinox and the 1st major term after March equinox, 0 is returned.
    * After that, return 1, 2, 3 ...
    */
    private static getSunLongitude(dayNumber: number, timeZone: number): number {
        return INT(LunarDate.getSunLongitudeByJd(dayNumber - 0.5 - timeZone / 24.0) / PI * 12);
    }

    getYearCanChi(): string {
        return Constants.CAN[(this.year + 6) % 10] + " "
            + Constants.CHI[(this.year + 8) % 12];
    }

    getMonthCanChi(): string {
        return Constants.CAN[(this.year * 12 + this.month + 3) % 10] + " "
            + Constants.CHI[(this.month + 1) % 12] + " "
            + (this.leap ? "(nhuận)" : "");
    }

    getDayCanChi(): string {
        return Constants.CAN[(this.jd + 9) % 10] + " "
            + Constants.CHI[(this.jd + 1) % 12];
    }

    /*
    * Can cua gio Chinh Ty (00:00) cua ngay voi JDN nay
    */
    getGioCanChi(): string {
        return Constants.CAN[(this.jd - 1) * 2 % 10] + " " + Constants.CHI[0];
    }

    getDayOfWeek(): string {
        return Constants.TUAN[(this.jd + 1) % 7];
    }

    getTietKhi(): string {
        return Constants.TIET_KHI[LunarDate.getSunLongitude(this.jd + 1, 7.0)];
    }

    getZodiacHour(): Array<IZodiacHour> {
        const jd = this.jd;
        const chiOfDay = (jd + 1) % 12;
        const gioHD = Constants.GIO_HD[chiOfDay % 6];

        let zodiacHours: Array<IZodiacHour> = [];

        for (var i = 0; i < 12; i++) {
            if (gioHD.charAt(i) == '1') {
                var zodiac: IZodiacHour = { name: "", time: [] };
                zodiac.name = Constants.CHI[i];
                zodiac.time.push((i * 2 + 23) % 24);
                zodiac.time.push((i * 2 + 1) % 24);
                zodiacHours.push(zodiac);
            }
        }

        return zodiacHours;
    }

    toSolarDate(): SolarDate {
        const { year } = this;

        if (year < 1200 || year > 2199) {
            return new SolarDate({ day: 0, month: 0, year: 0 });
        }
        // Code fail

        // let monthInfo = this.getYearInfo();
        // console.log(monthInfo);

        // let currentMonthInfo = monthInfo[month - 1];

        // if (currentMonthInfo.leap) {
        //     currentMonthInfo = monthInfo[month];
        // }
        // console.log("cur: ", currentMonthInfo);


        // var ld = currentMonthInfo.jd + day - 1;
        return SolarDate.fromJd(this.jd);
    }

    get() {
        return {
            ...super.get(),
            name: this.getYearCanChi()
        }
    }
}
