/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { expect } from "chai";
import { calcDate } from "../src/utils"

describe("Time", () => {
    describe("calc date", () => {
        const date = new Date();

        it("now", () => expect(calcDate(date).toISOString()).equals(date.toISOString()));
        it("2022-09-25 11:57:02 391", () => expect(calcDate(new Date(), { year: 2022, month: 9, day: 25, hours: 11, minutes: 57, seconds: 2, milliseconds: 391, utc: true }).toISOString()).equals("2022-09-25T11:57:02.391Z"));
    });
});