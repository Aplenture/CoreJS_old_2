/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { expect } from "chai";
import { Milliseconds, addUTCDate, calcUTCDate, reduceUTCDate, trimTime } from "../src/utils"

describe("Time", () => {
    const date = new Date();
    const today = new Date(trimTime(Milliseconds.Day, Number(date)));
    const lastMillisecond = calcUTCDate(date, 31, 12, 2022, { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 });
    const firstMillisecond = calcUTCDate(date, 1, 1, 2023);

    describe("calc date", () => {
        it(today.toISOString(), () => expect(calcUTCDate(date).toISOString()).equals(today.toISOString()));
        it("2022-09-25T00:00:00.000Z", () => expect(calcUTCDate(date, 25, 9, 2022).toISOString()).equals("2022-09-25T00:00:00.000Z"));
        it("2022-09-25T11:57:02.391Z", () => expect(calcUTCDate(date, 25, 9, 2022, { hours: 11, minutes: 57, seconds: 2, milliseconds: 391 }).toISOString()).equals("2022-09-25T11:57:02.391Z"));
    });

    describe("add date", () => {
        it("a millisecond", () => expect(addUTCDate({ date: lastMillisecond, milliseconds: 1 }).toISOString()).equals("2023-01-01T00:00:00.000Z"));
        it("a second", () => expect(addUTCDate({ date: lastMillisecond, seconds: 1 }).toISOString()).equals("2023-01-01T00:00:00.999Z"));
        it("a minute", () => expect(addUTCDate({ date: lastMillisecond, minutes: 1 }).toISOString()).equals("2023-01-01T00:00:59.999Z"));
        it("a hour", () => expect(addUTCDate({ date: lastMillisecond, hours: 1 }).toISOString()).equals("2023-01-01T00:59:59.999Z"));
        it("a day", () => expect(addUTCDate({ date: lastMillisecond, days: 1 }).toISOString()).equals("2023-01-01T23:59:59.999Z"));
        it("a month", () => expect(addUTCDate({ date: lastMillisecond, months: 1 }).toISOString()).equals("2023-01-31T23:59:59.999Z"));
        it("a year", () => expect(addUTCDate({ date: lastMillisecond, years: 1 }).toISOString()).equals("2023-12-31T23:59:59.999Z"));
    });

    describe("reduce date", () => {
        it("a millisecond", () => expect(reduceUTCDate({ date: firstMillisecond, milliseconds: 1 }).toISOString()).equals("2022-12-31T23:59:59.999Z"));
        it("a second", () => expect(reduceUTCDate({ date: firstMillisecond, seconds: 1 }).toISOString()).equals("2022-12-31T23:59:59.000Z"));
        it("a minute", () => expect(reduceUTCDate({ date: firstMillisecond, minutes: 1 }).toISOString()).equals("2022-12-31T23:59:00.000Z"));
        it("a hour", () => expect(reduceUTCDate({ date: firstMillisecond, hours: 1 }).toISOString()).equals("2022-12-31T23:00:00.000Z"));
        it("a day", () => expect(reduceUTCDate({ date: firstMillisecond, days: 1 }).toISOString()).equals("2022-12-31T00:00:00.000Z"));
        it("a month", () => expect(reduceUTCDate({ date: firstMillisecond, months: 1 }).toISOString()).equals("2022-12-01T00:00:00.000Z"));
        it("a year", () => expect(reduceUTCDate({ date: firstMillisecond, years: 1 }).toISOString()).equals("2022-01-01T00:00:00.000Z"));
    });
});