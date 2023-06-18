import { describe, expect, test } from '@jest/globals';
import Calendar, { ICalendarDate } from "@src/calendar";

describe('Test cases: `Calendar` abstract class ', () => {
    test("Implements calendar", () => {
        interface ISolar extends ICalendarDate { }
        class Solar extends Calendar {
            constructor(date: ISolar) {
                super(date, "solar_calendar");
            }

            setAtt({ jd, leap_year }: { jd: number, leap_year: boolean }) {
                this.jd = jd; this.leap_year = leap_year;
            }
        }

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

    test("Tests `jdn` func", () => {
        expect(Calendar['jdn']({ day: 1, month: 10, year: 2022 })).toEqual(2459854) // Apply for time: 12:00:00
        expect(Calendar['jdn'](new Date(2022, 9, 1))).toEqual(2459854)
        expect(Calendar['jdn']({day: 1, month: 10, year:1582})).toEqual(2299157) // Apply for time: 12:00:00
    })
});