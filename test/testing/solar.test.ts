import { describe, expect, test } from '@jest/globals';
import SolarDate, { ISolarDate } from "@src/solar";

describe("Test cases: `SolarDate`", () => {
    test("Creating instance", () => {
        let date1 = new Date(2022, 1, 1) // 2022-02-01
        let date2 = new Date(2020, 1, 1) // 2020-02-01
        let date3 = new Date(1582, 9, 14) // 1852-10-14
        let date4 = { day: 1, month: 2, year: 2022 } // 2022-02-01
        let date5 = { day: 14, month: 10, year: 1582 } // 1852-10-14

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

        expect(SolarDate.fromJd(jd1)).toEqual(solar_date1)
        expect(SolarDate.fromJd(jd2)).toEqual(solar_date2)
    })
})