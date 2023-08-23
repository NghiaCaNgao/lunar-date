import { describe, expect, test } from '@jest/globals';
import Calendar, { ICalendarDate } from "@src/calendar";

describe('Test cases: `Calendar` abstract class ', () => {
    interface ISolar extends ICalendarDate { }
    class Solar extends Calendar {
        constructor(date: ISolar) {
            super(date, "solar_calendar");
        }

        setAtt({ jd, leap_year }: { jd: number, leap_year: boolean }) {
            this.jd = jd; this.leap_year = leap_year;
        }

        setDate(date: ICalendarDate): void {
            this.set(date)
        }
    }

    test("Implements calendar", () => {
        var test_calendar = new Solar({ day: 1, month: 1, year: 2022 });

        expect(test_calendar.get()).toEqual({
            day: 1, month: 1, year: 2022,
            leap_year: undefined, julian: undefined,
            name: "solar_calendar"
        });

        test_calendar.setAtt({ jd: 214989, leap_year: false });

        expect(test_calendar.get()).toEqual({
            day: 1, month: 1, year: 2022,
            leap_year: false, julian: 214989,
            name: "solar_calendar"
        })
    })

    test("Test `set` func", () => {
        var test_calendar = new Solar({ day: 1, month: 1, year: 2022 });
        test_calendar.setDate({ day: 10, month: 11, year: 2026 })
        expect(test_calendar.get()).toEqual({
            day: 10, month: 11, year: 2026,
            leap_year: undefined, julian: undefined,
            name: "solar_calendar"
        });
    })
});