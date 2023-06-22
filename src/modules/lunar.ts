import * as Constants from "./constants";
import Calendar, { ICalendarDate, PI, INT } from "./calendar";
import SolarDate from "./solar";

export interface ILunarDate extends ICalendarDate {
    leap_month?: boolean;
}
interface ILunarDateEx extends ILunarDate {
    jd?: number;
    leap_year?: boolean;
    length?: number;
}

interface ILunarDateLeap {
    jd?: number
    leap_year?: boolean;
    length?: number;
}

interface ILuckyHour {
    name: string;
    time: number[];
}
export default class LunarDate extends Calendar {
    private leap_month?: boolean
    private length?: number

    constructor(date: ILunarDate) {
        super(date, "lunar_calendar");
        this.leap_month = date.leap_month;
    }

    /**
     * Set extra parameters (for private constructor).
     * @param date 
     */
    private setExAttribute(date: ILunarDateLeap): void {
        this.leap_year = this.leap_year || date.leap_year;
        this.jd = this.jd || date.jd;
        this.length = this.length || date.length;
    }

    /**
     * Initialize the instance.
     */
    init(force_change: boolean = false) {
        if (!LunarDate.isValidDate({ day: this.day, month: this.month, year: this.year }))
            throw new Error("Invalid date");

        const recommendation = LunarDate.getRecommended(
            {
                day: this.day, month: this.month, year: this.year,
                leap_month: this.leap_month
            });

        if (force_change) {
            this.leap_month = recommendation.leap_month;
            this.leap_year = recommendation.leap_year;
            this.jd = recommendation.jd;
            this.length = recommendation.length;
        } else {
            this.leap_month = this.leap_month || recommendation.leap_month;
            this.leap_year = this.leap_year || recommendation.leap_year;
            this.jd = this.jd || recommendation.jd;
            this.length = this.length || recommendation.length;
        }
    }

    /**
     * 
     * @returns Check if date is valid or not.
     */
    private static isValidDate(date: ICalendarDate): boolean {
        if (date.day <= 0 || date.day > 30) return false;
        if (date.month <= 0 || date.month > 12) return false;

        if (date.year === 1200) {
            if (date.month === 1) {
                if (date.day < 14) {
                    return false;
                }
            }
        } else if (date.year < 1200) return false;

        if (date.year === 2199) {
            if (date.month === 11) {
                if (date.day > 14) {
                    return false;
                }
            }
        } else if (date.year > 2199) return false;

        return true
    }

    /**
     * Return the recommended info.
     * @param date Lunar Date
     * @returns recommended info
     */
    private static getRecommended(date: ILunarDate): ILunarDateEx {
        const year_code = LunarDate.getYearCode(date.year);
        const lunar_months = LunarDate.decodeLunarYear(date.year, year_code)

        const rcm = {
            jd: 0,
            leap_month: false,
            leap_year: false,
            length: 0
        }

        for (let i = 0; i < lunar_months.length; i++) {
            if (lunar_months[i].month === date.month) {
                let ref_months = (
                    date.leap_month && lunar_months[i + 1] != undefined &&
                    lunar_months[i + 1].month === date.month)
                    ? lunar_months[i + 1]
                    : lunar_months[i];

                if (date.day > ref_months.length) throw new Error("Invalid date")

                rcm.jd = ref_months.jd + date.day - 1;
                rcm.leap_month = ref_months.leap_month;
                rcm.leap_year = ref_months.leap_year;
                rcm.length = ref_months.length

                break;
            }
        }

        return {
            ...date,
            ...rcm
        } as ILunarDateEx
    }

    /**
     * Get year code from given year.
     * @param year 
     * @returns year code
     */
    private static getYearCode(year: number): number {
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

        return yearCode;
    }

    /**
     * Return a JD date of Lunar New Year (year-01-01 in lunar date).
     * @param year 
     * @param year_code 
     * @returns JD date of Lunar New Year
     */
    private static generateJdOfNewYear(year: number, year_code: number): number {
        let offsetOfTet = year_code >> 17;
        let currentJD = SolarDate.jdn(new Date(year, 0, 1)) + offsetOfTet;
        return currentJD
    }

    /**
     * Create a list of lunar months in given year.
     * @param year 
     * @param year_code 
     * @returns list of lunar months
     */
    private static decodeLunarYear(year: number, year_code: number): Array<LunarDate> {
        let lunar_months = new Array<LunarDate>(); // A list of lunar months
        let month_len = new Array(29, 30); // A month has 29 or 30 days
        let reg_month_lens = new Array(12); // Create 12 cells specifying the length of the lunar month

        let leapMonth = year_code & 0xf; // Find leap month in the year. Eg., In the year 2023, the leap month is 02
        let leapMonthLength = month_len[year_code >> 16 & 0x1]; // The length of the leap month
        let currentJD = LunarDate.generateJdOfNewYear(year, year_code) // Get the julian date of solar date: year-01-01

        // Build a list of length of 12 regular month 
        let j = year_code >> 4;
        for (let i = 0; i < 12; i++) {
            reg_month_lens[12 - i - 1] = month_len[j & 0x1];
            j >>= 1;
        }

        // Build a list of info of each month in the year
        for (let month = 1; month <= 12; month++) {
            const date: ICalendarDate = { day: 1, month, year };

            let normal_lunar = new LunarDate({ ...date, leap_month: false })
            normal_lunar.setExAttribute({
                leap_year: leapMonth !== 0,
                jd: currentJD,
                length: reg_month_lens[month - 1]
            })
            lunar_months.push(normal_lunar);

            currentJD += reg_month_lens[month - 1];

            // Add a leap month to list
            if (leapMonth === month) {
                let leap_lunar = new LunarDate({ ...date, leap_month: true })
                leap_lunar.setExAttribute({
                    leap_year: leapMonth !== 0,
                    jd: currentJD,
                    length: leapMonthLength
                })
                lunar_months.push(leap_lunar);

                currentJD += leapMonthLength;
            }
        }

        return lunar_months;
    }

    /**
     * Find exactly the lunar date from jd and lunar month.
     * @param jd 
     * @param lunar_months 
     * @returns Exactly the lunar date
     */
    private static findLunarDate(jd: number, lunar_months: Array<LunarDate>): LunarDate {
        // TODO: find test case
        if (lunar_months[0].jd > jd) {
            throw new Error("Out of calculation");
        }

        let index = lunar_months.length - 1;
        while (jd < lunar_months[index].jd) {
            index--;
        }

        let offset = jd - lunar_months[index].jd;

        let lunar = new LunarDate({
            day: lunar_months[index].day + offset,
            month: lunar_months[index].month,
            year: lunar_months[index].year,
            leap_month: lunar_months[index].leap_month
        });

        lunar.setExAttribute({
            jd: jd,
            leap_year: lunar_months[index].leap_year,
            length: lunar_months[index].length
        })
        return lunar;
    }

    /**
     * Compute the longitude of the sun at any time.
     * @param jd 
     * @returns 
     * @algorithm "Astronomical Algorithms" by Jean Meeus, 1998
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

    /**
     * Compute the sun segment at start (00:00) of the day with the given integral Julian day number.
     * @param jd 
     * @param timeZone 
     * @returns sun segment
     * @note From the day after March equinox and the 1st major term after March equinox, 0 is returned. After that, return 1, 2, 3 ...
     */
    private static getSunLongitude(jd: number, timeZone: number): number {
        return INT(LunarDate.getSunLongitudeByJd(jd - 0.5 - timeZone / 24.0) / PI * 12);
    }

    /**
     * Convert Solar Calendar to Lunar Calendar.
     * @param date Solar Calendar
     * @returns Lunar Calendar
     */
    static fromSolarDate(date: SolarDate): LunarDate {
        const { day, month, year } = date.get();

        let year_code = LunarDate.getYearCode(year);
        let lunar_months = LunarDate.decodeLunarYear(year, year_code);
        let jd = SolarDate.jdn(new Date(year, month - 1, day));

        // Vì năm dương lịch đã sang năm mới nhưng năm âm lịch chưa sang nên phải lùi năm âm lịch.
        if (jd < lunar_months[0].jd) {
            year_code = LunarDate.getYearCode(year - 1);
            lunar_months = LunarDate.decodeLunarYear(year - 1, year_code);
        }
        return LunarDate.findLunarDate(jd, lunar_months);
    }

    /**
     * Return year's name in Sexagenary cycle (Can Chi).
     * @returns year's name in Sexagenary cycle
     */
    getYearName(): string {
        return Constants.CAN[(this.year + 6) % 10] + " "
            + Constants.CHI[(this.year + 8) % 12];
    }

    /**
     * Return month's name in Sexagenary cycle (Can Chi).
     * @returns month's name in Sexagenary cycle
     */
    getMonthName(): string {
        return Constants.CAN[(this.year * 12 + this.month + 3) % 10] + " "
            + Constants.CHI[(this.month + 1) % 12]
            + (this.leap_month ? " (nhuận)" : "");
    }

    /**
     * Return day's name in Sexagenary cycle (Can Chi).
     * @returns day's name in Sexagenary cycle
     */
    getDayName(): string {
        return Constants.CAN[(this.jd + 9) % 10] + " "
            + Constants.CHI[(this.jd + 1) % 12];
    }

    /**
      * Return hour's name in Sexagenary cycle (Can Chi). Heavenly stem is set to 'Ty'.
      * @returns hour's name in Sexagenary cycle
      */
    getHourName(): string {
        return Constants.CAN[(this.jd - 1) * 2 % 10] + " " + Constants.CHI[0];
    }

    /**
     * Return the day's name in week.
     * @returns day's name in week
     */
    getDayOfWeek(): string {
        return Constants.DAY[(this.jd + 1) % 7];
    }

    /**
     * Get Solar Term (Tiết Khí).
     * @returns solar term
     */
    getSolarTerm(): string {
        return Constants.SOLAR_TERMS[LunarDate.getSunLongitude(this.jd + 1, 7.0)];
    }


    /**
     * Get lucky hours of the day.
     * @returns luck hours
     */
    // TODO: Tên giờ và thêm cả giờ hắc đạo
    getLuckyHours(): Array<ILuckyHour> {
        const jd = this.jd;
        const chiOfDay = (jd + 1) % 12;
        const gioHD = Constants.LUCKY_HOURS[chiOfDay % 6];

        let zodiacHours: Array<ILuckyHour> = [];

        for (var i = 0; i < 12; i++) {
            if (gioHD.charAt(i) == '1') {
                var zodiac: ILuckyHour = { name: "", time: [] };
                zodiac.name = Constants.CHI[i];
                zodiac.time.push((i * 2 + 23) % 24);
                zodiac.time.push((i * 2 + 1) % 24);
                zodiacHours.push(zodiac);
            }
        }

        return zodiacHours;
    }

    /**
     * Convert to Solar Date.
     * @returns Solar Date
     */
    toSolarDate(): SolarDate {
        return SolarDate.fromJd(this.jd);
    }

    setDate(date: ILunarDate): void {
        let backupDate: ILunarDate = {
            day: this.day, month: this.month, year: this.year,
            leap_month: this.leap_month
        };

        try {
            if (!LunarDate.isValidDate(date)) throw new Error("Invalid date");
            this.set(date);
            this.leap_month = date.leap_month;
            this.init(true);
        } catch (error) {
            this.setDate(backupDate)
            throw new Error("Invalid date");
        }
    }

    /**
     * Returns the info of this instance in details
     * @returns 
     */
    get() {
        return {
            ...super.get(),
            year_name: this.getYearName(),
            leap_month: this.leap_month
        }
    }
}
