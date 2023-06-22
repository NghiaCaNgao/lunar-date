import { describe, expect, test } from '@jest/globals';
import SolarDate, { ISolarDate } from "@src/solar";
import LunarDate, { ILunarDate } from '@src/lunar';

describe("Test cases: `SolarDate`", () => {
    test("Creating instance", () => {
        let date1 = new Date(2022, 1, 1) // 2022-02-01
        let date2 = new Date(2020, 1, 1) // 2020-02-01
        let date3 = new Date(1582, 9, 14) // 1852-10-14
        let date4: ISolarDate = { day: 1, month: 2, year: 2022 } // 2022-02-01
        let date5: ISolarDate = { day: 14, month: 10, year: 1582 } // 1852-10-14

        let test_solar1 = new SolarDate(date1)
        expect(test_solar1.get()).toEqual({
            day: 1, month: 2, year: 2022,
            leap_year: false, julian: 2459612,
            name: "solar_calendar"
        })

        let test_solar2 = new SolarDate(date2)
        expect(test_solar2.get()).toEqual({
            day: 1, month: 2, year: 2020,
            leap_year: true, julian: 2458881,
            name: "solar_calendar"
        })

        expect(() => new SolarDate(date3)).toThrow("Invalid date")

        var test_solar4 = new SolarDate(date4)
        expect(test_solar4.get()).toEqual({
            day: 1, month: 2, year: 2022,
            leap_year: false, julian: 2459612,
            name: "solar_calendar"
        })

        expect(() => new SolarDate(date5)).toThrow("Invalid date")


    })

    test("Tests `isLeapYear` func", () => {
        expect(SolarDate["isLeapYear"](2022)).toBe(false)
        expect(SolarDate["isLeapYear"](2020)).toBe(true)
        expect(SolarDate["isLeapYear"](1600)).toBe(true)
        expect(SolarDate["isLeapYear"](1800)).toBe(false)
    })

    test("Tests `isValidDate` func", () => {
        expect(SolarDate["isValidDate"](new Date(2022, 1, 1))).toBe(true) // 2022-02-01
        expect(SolarDate["isValidDate"](new Date(2022, 1, 30))).toBe(true) // 2022-02-30 -> 2022-03-02 (auto correct)
        expect(SolarDate["isValidDate"](new Date(1582, 9, 3))).toBe(true)
        expect(SolarDate["isValidDate"](new Date(1582, 9, 10))).toBe(false)
        expect(SolarDate["isValidDate"](new Date(1200, 0, 29))).toBe(false) // 1200-01-29
        expect(SolarDate["isValidDate"](new Date(1200, 0, 31))).toBe(true) // 1200-01-31
        expect(SolarDate["isValidDate"](new Date(1199, 0, 31))).toBe(false) // 1199-01-31
        expect(SolarDate["isValidDate"](new Date(2200, 0, 31))).toBe(false) // 2200-01-31

        expect(SolarDate["isValidDate"]({ day: 1, month: 1, year: 2022 })).toBe(true)
        expect(SolarDate["isValidDate"]({ day: 30, month: 2, year: 2022 })).toBe(false)
        expect(SolarDate["isValidDate"]({ day: 10, month: 10, year: 1582 })).toBe(false)


    })

    test("Tests `toDate` func", () => {
        let date = new Date(2022, 1, 1) // 2022-02-01
        let solar_date = new SolarDate(date)

        expect(solar_date.toDate()).toEqual(date)
    })

    test("Tests `fromJd` func", () => {
        let jd1 = 2458881;
        let date1 = new Date(2020, 1, 1) // 2020-02-01
        let solar_date1 = new SolarDate(date1);

        let jd2 = 2299157;
        let date2 = new Date(1582, 9, 1) // 1582-10-01
        let solar_date2 = new SolarDate(date2);

        let jd3 = 2299158;
        let date3 = new Date(1582, 9, 2)
        // 1582-10-12 (2299158) -> 1582-10-02 (2299158). See: https://github.com/NghiaCaNgao/lunarDate/wiki/Julian-calendar-conversion-problem
        let solar_date3 = new SolarDate(date3);

        expect(SolarDate.fromJd(jd1)).toEqual(solar_date1)
        expect(SolarDate.fromJd(jd2)).toEqual(solar_date2)
        expect(SolarDate.fromJd(jd3)).toEqual(solar_date3)

        expect(() => SolarDate.fromJd(2159386)).toThrowError("Out of calculation")
        expect(() => SolarDate.fromJd(2524594)).toThrowError("Out of calculation")
    })

    test("Tests `setDate` func", () => {
        let date = new Date(2020, 1, 1); // 2020-02-01
        let solar_date = new SolarDate(date);

        solar_date.setDate({ day: 1, month: 4, year: 2026 }) // 2026-04-01
        expect(solar_date.get()).toEqual({
            day: 1, month: 4, year: 2026,
            leap_year: false, julian: 2461132,
            name: "solar_calendar"
        });

        solar_date.setDate(new Date(2020, 4, 6)) // 2020-05-06
        expect(solar_date.get()).toEqual({
            day: 6, month: 5, year: 2020,
            leap_year: true, julian: 2458976,
            name: "solar_calendar"
        });

        expect(() => solar_date.setDate(new Date(1582, 9, 10))).toThrowError("Invalid date")
        expect(() => solar_date.setDate({ day: 10, month: 10, year: 1582 })).toThrowError("Invalid date")
    })

    test("Tests `jdn` func", () => {
        expect(SolarDate['jdn']({ day: 1, month: 10, year: 2022 })).toEqual(2459854) // Apply for time: 12:00:00
        expect(SolarDate['jdn'](new Date(2022, 9, 1))).toEqual(2459854)
        expect(SolarDate['jdn']({ day: 1, month: 10, year: 1582 })).toEqual(2299157) // Apply for time: 12:00:00
        expect(() => SolarDate['jdn']({ day: 32, month: 10, year: 2100 })).toThrowError("Invalid date")
    })

    test("Tests `toLunarDate` func", () => {
        const al = new LunarDate({ day: 2, month: 5, year: 2023 }); // 2023-05-02
        const dl = new SolarDate(new Date(2023, 5, 19)); // 2023-06-19
        al.init()

        expect(dl.toLunarDate()).toEqual(al);
    })
})