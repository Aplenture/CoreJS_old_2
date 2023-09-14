/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { expect } from "chai";
import { Currency } from "../src/utils"

describe("Currency", () => {
    describe("toString()", () => {
        it("1 => 0.01$", () => expect(Currency.toString(1, "$")).equals("0.01$"));
        it("99 => 0.99$", () => expect(Currency.toString(99, "$")).equals("0.99$"));
        it("101 => 1.01$", () => expect(Currency.toString(101, "$")).equals("1.01$"));
        it("199 => 1.99$", () => expect(Currency.toString(199, "$")).equals("1.99$"));
        it("200 => 2.00$", () => expect(Currency.toString(200, "$")).equals("2.00$"));
        it("999 => 9.99$", () => expect(Currency.toString(999, "$")).equals("9.99$"));
        it("1000 => 10.00$", () => expect(Currency.toString(1000, "$")).equals("10.00$"));
        it("1001 => 10.01$", () => expect(Currency.toString(1001, "$")).equals("10.01$"));
        it("9999 => 99.99$", () => expect(Currency.toString(9999, "$")).equals("99.99$"));
        it("10000 => 100.00$", () => expect(Currency.toString(10000, "$")).equals("100.00$"));
        it("10001 => 100.01$", () => expect(Currency.toString(10001, "$")).equals("100.01$"));
        it("99999 => 999.99$", () => expect(Currency.toString(99999, "$")).equals("999.99$"));
        it("100000 => 1,000.00$", () => expect(Currency.toString(100000, "$")).equals("1,000.00$"));
        it("999999 => 9,999.99$", () => expect(Currency.toString(999999, "$")).equals("9,999.99$"));
        it("9999999 => 99,999.99$", () => expect(Currency.toString(9999999, "$")).equals("99,999.99$"));
        it("99999999 => 999,999.99$", () => expect(Currency.toString(99999999, "$")).equals("999,999.99$"));
        it("999999999 => 9,999,999.99$", () => expect(Currency.toString(999999999, "$")).equals("9,999,999.99$"));
        it("999999999 => 9.999.999,99€", () => expect(Currency.toString(999999999, "€", { decimalSeperator: ",", thousandsSeparator: "." })).equals("9.999.999,99€"));
        it("999999999 => 9.999.999,99", () => expect(Currency.toString(999999999, "", { decimalSeperator: ",", thousandsSeparator: "." })).equals("9.999.999,99"));
        it("999999999 => 9999999.99$", () => expect(Currency.toString(999999999, "$", { thousandsSeparator: "" })).equals("9999999.99$"));
        it("999999999 => 9,999,99999$", () => expect(Currency.toString(999999999, "$", { decimalSeperator: "" })).equals("9,999,99999$"));
        it("999999999 => 999999999", () => expect(Currency.toString(999999999, "", { decimalSeperator: "", thousandsSeparator: "" })).equals("999999999"));
    });

    describe("percentage()", () => {
        describe("100", () => {
            it("  1% => 1", () => expect(Currency.percentage(100, 1)).equals(1));
            it("  3% => 3", () => expect(Currency.percentage(100, 3)).equals(3));
            it(" 33% => 33", () => expect(Currency.percentage(100, 33)).equals(33));
            it(" 66% => 66", () => expect(Currency.percentage(100, 66)).equals(66));
            it(" 99% => 99", () => expect(Currency.percentage(100, 99)).equals(99));
            it("100% => 100", () => expect(Currency.percentage(100, 100)).equals(100));
            it("133% => 133", () => expect(Currency.percentage(100, 133)).equals(133));
        });

        describe("101", () => {
            it("  1% => 1", () => expect(Currency.percentage(101, 1)).equals(1));
            it("  3% => 3", () => expect(Currency.percentage(101, 3)).equals(3));
            it(" 33% => 33", () => expect(Currency.percentage(101, 33)).equals(33));
            it(" 66% => 66", () => expect(Currency.percentage(101, 66)).equals(66));
            it(" 99% => 99", () => expect(Currency.percentage(101, 99)).equals(99));
            it("100% => 101", () => expect(Currency.percentage(101, 100)).equals(101));
            it("133% => 134", () => expect(Currency.percentage(101, 133)).equals(134));
        });

        describe("110", () => {
            it("  1% => 1", () => expect(Currency.percentage(110, 1)).equals(1));
            it("  3% => 3", () => expect(Currency.percentage(110, 3)).equals(3));
            it(" 33% => 36", () => expect(Currency.percentage(110, 33)).equals(36));
            it(" 66% => 72", () => expect(Currency.percentage(110, 66)).equals(72));
            it(" 99% => 108", () => expect(Currency.percentage(110, 99)).equals(108));
            it("100% => 110", () => expect(Currency.percentage(110, 100)).equals(110));
            it("133% => 146", () => expect(Currency.percentage(110, 133)).equals(146));
        });

        describe("111", () => {
            it("  1% => 1", () => expect(Currency.percentage(111, 1)).equals(1));
            it("  3% => 3", () => expect(Currency.percentage(111, 3)).equals(3));
            it(" 33% => 36", () => expect(Currency.percentage(111, 33)).equals(36));
            it(" 66% => 73", () => expect(Currency.percentage(111, 66)).equals(73));
            it(" 99% => 109", () => expect(Currency.percentage(111, 99)).equals(109));
            it("100% => 111", () => expect(Currency.percentage(111, 100)).equals(111));
            it("133% => 147", () => expect(Currency.percentage(111, 133)).equals(147));
        });
    });
});