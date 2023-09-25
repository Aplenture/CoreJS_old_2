/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { expect } from "chai";
import { Milliseconds, calcUTCDate, trimTime } from "../src/utils"

describe("Time", () => {
    describe("calc date", () => {
        const date = new Date();
        const today = new Date(trimTime(Milliseconds.Day, Number(date)));

        it(today.toISOString(), () => expect(calcUTCDate(date).toISOString()).equals(today.toISOString()));
        it("2022-09-25T00:00:00.000Z", () => expect(calcUTCDate(date, 25, 9, 2022).toISOString()).equals("2022-09-25T00:00:00.000Z"));
        it("2022-09-25T11:57:02.391Z", () => expect(calcUTCDate(date, 25, 9, 2022, { hours: 11, minutes: 57, seconds: 2, milliseconds: 391 }).toISOString()).equals("2022-09-25T11:57:02.391Z"));
    });
});