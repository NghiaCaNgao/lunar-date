import { describe, expect, test } from '@jest/globals';
import LunarDate, { ILunarDate } from "@src/lunar";
import SolarDate, { ISolarDate } from "@src/solar";

import decode_lunar_new_year_1 from "./data/decode_lunar_new_year_1.json"
import decode_lunar_new_year_2 from "./data/decode_lunar_new_year_2.json"

describe("Test cases: `LunarDate`", () => {
    test("Creating instance", () => {
        let lunar1 = new LunarDate({ day: 2, month: 5, year: 2023 });
        expect(lunar1).toEqual({
            "name": "lunar_calendar",
            "day": 2, "month": 5, "year": 2023, "jd": undefined,
            "leap_month": undefined, "leap_year": undefined,
        });

        lunar1.init();
        expect(lunar1).toEqual({
            "name": "lunar_calendar",
            "day": 2, "month": 5, "year": 2023, "jd": 2460115,
            "leap_month": false, "leap_year": true,
        });

        let lunar2 = new LunarDate({ day: 3, month: 5, year: 2023, jd: 2460116, leap_month: false, leap_year: true });
        expect(lunar2).toEqual({
            "name": "lunar_calendar",
            "day": 3, "month": 5, "year": 2023, "jd": 2460116,
            "leap_month": false, "leap_year": true,
        });
    })

    test("Tests `getYearCode` func", () => {
        expect(LunarDate["getYearCode"](2023)).toBe(2775890)
        expect(LunarDate["getYearCode"](2022)).toBe(4107600)
        expect(LunarDate["getYearCode"](1250)).toBe(4384048)
        expect(LunarDate["getYearCode"](1350)).toBe(4894112)
        expect(LunarDate["getYearCode"](1450)).toBe(1774961)
        expect(LunarDate["getYearCode"](1550)).toBe(2271910)
        expect(LunarDate["getYearCode"](1650)).toBe(4090715)
        expect(LunarDate["getYearCode"](1750)).toBe(4868832)
        expect(LunarDate["getYearCode"](1850)).toBe(5547216)
        expect(LunarDate["getYearCode"](1950)).toBe(6188192)
        expect(LunarDate["getYearCode"](2150)).toBe(3689190)
    })

    test("Tests `generateJdOfNewYear` func", () => {
        const year_code_1 = LunarDate["getYearCode"](2023);
        const year_code_2 = LunarDate["getYearCode"](2022);

        expect(LunarDate["generateJdOfNewYear"](2023, year_code_1)).toBe(2459967)
        expect(LunarDate["generateJdOfNewYear"](2022, year_code_2)).toBe(2459612)
    })

    test("Tests `decodeLunarYear` func", () => {
        const year_code_1 = LunarDate["getYearCode"](2023);
        const year_code_2 = LunarDate["getYearCode"](2022);
        // console.log(LunarDate["decodeLunarYear"](2023, year_code_1));

        expect(LunarDate["decodeLunarYear"](2023, year_code_1)).toEqual(decode_lunar_new_year_1)
        expect(LunarDate["decodeLunarYear"](2022, year_code_2)).toEqual(decode_lunar_new_year_2)
    })

    test("Test `findLunarDate` func", () => {
        const year_code_1 = LunarDate["getYearCode"](2023);
        const lunar_months_1 = LunarDate["decodeLunarYear"](2023, year_code_1)

        const jd_1 = 2460115 // 2023-06-19 dl -> 2023-05-02 al
        const jd_2 = 2460041 // 2023-04-06 dl -> 2023-02-16 al

        expect(LunarDate["findLunarDate"](jd_1, lunar_months_1)).toEqual(
            {
                "name": "lunar_calendar",
                "day": 2, "month": 5, "year": 2023, "jd": 2460115,
                "leap_month": false, "leap_year": true,
            }
        )

        expect(LunarDate["findLunarDate"](jd_2, lunar_months_1)).toEqual(
            {
                "name": "lunar_calendar",
                "day": 16, "month": 2, "year": 2023, "jd": 2460041,
                "leap_month": true, "leap_year": true,
            }
        )
    })

    test("Tests `fromSolarDate` func", () => {
        const dl1 = new SolarDate(new Date(2023, 5, 19)) // 2023-06-19
        expect(LunarDate.fromSolarDate(dl1)).toEqual({
            "name": "lunar_calendar",
            "day": 2, "month": 5, "year": 2023, "jd": 2460115,
            "leap_month": false, "leap_year": true
        })

        const dl2 = new SolarDate(new Date(2023, 0, 1)) // 2023-01-01
        expect(LunarDate.fromSolarDate(dl2)).toEqual({
            "name": "lunar_calendar",
            "day": 10, "month": 12, "year": 2022, "jd": 2459946,
            "leap_month": false, "leap_year": false
        })
    })

    test("Tests `getSunLongitudeByJd` func", () => {
        expect(LunarDate["getSunLongitudeByJd"](2460115)).toBe(1.535354586742642)
        expect(LunarDate["getSunLongitudeByJd"](2460100)).toBe(1.2850851093476763)
    })

    test("Tests `getSunLongitude` func", () => {
        expect(LunarDate["getSunLongitude"](2460115, 7)).toBe(5)
        expect(LunarDate["getSunLongitude"](2460100, 7)).toBe(4)
    })

    test("Tests `getSolarTerm` func", () => {
        let al = new LunarDate({ day: 2, month: 5, year: 2023 });
        al.init();
        expect(al.getSolarTerm()).toBe("Mang chủng")
    })

    test("Tests `getYearName` func", () => {
        let al = new LunarDate({ day: 2, month: 5, year: 2023 });
        al.init();
        expect(al.getYearName()).toBe("Quý Mão")
    })

    test("Tests `getMonthName` func", () => {
        let al1 = new LunarDate({ day: 2, month: 5, year: 2023 });
        al1.init();
        expect(al1.getMonthName()).toBe("Mậu Ngọ")

        let al2 = new LunarDate({ day: 2, month: 2, year: 2023, leap_month: true });
        al2.init();
        expect(al2.getMonthName()).toBe("Ất Mão (nhuận)")
    })

    test("Tests `getDayName` func", () => {
        let al = new LunarDate({ day: 2, month: 5, year: 2023 });
        al.init();
        expect(al.getDayName()).toBe("Mậu Thân")
    })

    test("Tests `getHourName` func", () => {
        let al = new LunarDate({ day: 2, month: 5, year: 2023 });
        al.init();
        expect(al.getHourName()).toBe("Nhâm Tý")
    })

    test("Tests `getHourName` func", () => {
        let al = new LunarDate({ day: 2, month: 5, year: 2023 });
        al.init();
        expect(al.getDayOfWeek()).toBe("Thứ hai")
    })

    test("Tests `getLuckyHours` func", () => {
        let al = new LunarDate({ day: 2, month: 5, year: 2023 });
        al.init();
        expect(al.getLuckyHours()).toEqual([
            { "name": "Tý", "time": [23, 1] }, { "name": "Sửu", "time": [1, 3] }, { "name": "Thìn", "time": [7, 9] }, { "name": "Tỵ", "time": [9, 11] }, { "name": "Mùi", "time": [13, 15] }, { "name": "Tuất", "time": [19, 21] }])
    })

    test("Tests `toSolarDate` func", () => {
        let al = new LunarDate({ day: 2, month: 5, year: 2023 });
        let dl = new SolarDate({ day: 19, month: 6, year: 2023 });
        al.init();
        expect(al.toSolarDate()).toEqual(dl);
    })

    test("Test `setDate` func", () => {
        let al = new LunarDate({ day: 2, month: 5, year: 2023 });
        al.init();
        al.setDate({ day: 3, month: 5, year: 2023 })
        expect(al).toEqual({
            "name": "lunar_calendar",
            "day": 3, "month": 5, "year": 2023, "jd": 2460116,
            "leap_month": false, "leap_year": true
        });
    })

    test("Tests `get` func", () => {
        let al = new LunarDate({ day: 2, month: 5, year: 2023 });
        al.init();

        expect(al.get()).toEqual({
            "day": 2, "month": 5, "year": 2023,
            "name": "lunar_calendar", "julian": 2460115, "leap_month": false,
            "leap_year": true, "year_name": "Quý Mão"
        })
    })
})