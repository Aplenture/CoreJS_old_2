/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

interface Options {
    readonly decimalPlaces?: number;
    readonly decimalSeperator?: string;
    readonly thousandsSeparator?: string;
}

export namespace Currency {
    export function toString(value: number, currencySymbol: string, options: Options = {}): string {
        const decimalPlaces = options.decimalPlaces ?? 2;
        const decimalSeperator = options.decimalSeperator ?? ".";
        const thousandsSeparator = options.thousandsSeparator ?? ",";

        let v = (value | 0).toString();

        if (v.length <= decimalPlaces)
            v = "0".repeat(decimalPlaces - v.length + 1) + v;

        const intLength = v.length - decimalPlaces;

        // add decimal places
        let result = v.substring(intLength);

        // add decimal seperator
        result = decimalSeperator + result;

        // add first 3 integers
        result = v.substring(Math.max(intLength - 3, 0), intLength) + result;

        // add next integers, seperated by thousands separator
        for (let end = v.length - decimalPlaces - 3, start = end - 3; end > 0; start -= 3, end -= 3)
            result = v.substring(Math.max(start, 0), end) + thousandsSeparator + result;

        // add currency symbol
        result += currencySymbol;

        return result;
    }

    export function percentage(value: number, percentage: number): number {
        return ((value | 0) * (percentage | 0) / 100) | 0;
    }
}