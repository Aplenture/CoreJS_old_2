/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

export interface FormatDateTimeOptions extends FormatDateOptions {
    readonly dateSeperator?: string;
    readonly timeSeperator?: string;
}

export interface FormatDateOptions {
    readonly seperator?: string;
    readonly utc?: boolean;
    readonly seconds?: boolean;
}

export interface FormatDurationOptions {
    readonly milliseconds?: boolean;
    readonly seconds?: boolean;
}

export interface CalcDateOpitons {
    readonly date?: Date;
    readonly utc?: boolean;
    readonly monthDay?: number;
    readonly month?: Month;
    readonly year?: number;
    readonly weekDay?: WeekDay;
    readonly hours?: number;
    readonly minutes?: number;
    readonly seconds?: number;
    readonly milliseconds?: number;
}

export interface AddDateOpitons {
    readonly date?: Date;
    readonly utc?: boolean;
    readonly years?: number;
    readonly months?: number;
    readonly days?: number;
    readonly hours?: number;
    readonly minutes?: number;
    readonly seconds?: number;
    readonly milliseconds?: number;
}

export enum Milliseconds {
    Second = 1000,
    Minute = 60000,
    Hour = 3600000,
    Day = 86400000,
    Week = 604800000,
    Month = 2592000000,
    Year = 31536000000
}

export enum WeekDay {
    Sunday = 0,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export enum Month {
    January = 0,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

export enum TimeFrame {
    Second = 1,
    Minute,
    Hour,
    Day,
    Week,
    Month,
    Year
}

export function trimTime(step: number, time = Date.now()): number {
    return step
        ? time - (time % step)
        : time;
}

export function calcDate(options: CalcDateOpitons = {}) {
    const date = options.date || new Date();

    if (options.utc) {
        const result = new Date(Date.UTC(
            options.year ?? date.getUTCFullYear(),
            options.month ?? date.getUTCMonth(),
            options.monthDay ?? date.getUTCDate(),
            options.hours || 0,
            options.minutes || 0,
            options.seconds || 0,
            options.milliseconds || 0
        ));

        if (undefined != options.weekDay) {
            const weekDay: WeekDay = result.getUTCDay();

            if (weekDay < options.weekDay)
                result.setUTCDate(result.getUTCDate() - weekDay + options.weekDay - 7);
            else
                result.setUTCDate(result.getUTCDate() - weekDay + options.weekDay);
        }

        return result;
    }

    const result = new Date(
        options.year ?? date.getFullYear(),
        options.month ?? date.getMonth(),
        options.monthDay ?? date.getDate(),
        options.hours || 0,
        options.minutes || 0,
        options.seconds || 0,
        options.milliseconds || 0
    );

    if (undefined != options.weekDay) {
        const weekDay: WeekDay = result.getDay();

        if (weekDay < options.weekDay)
            result.setDate(result.getDate() - weekDay + options.weekDay - 7);
        else
            result.setDate(result.getDate() - weekDay + options.weekDay);
    }

    return result;
}

export function addDate(options: AddDateOpitons = {}) {
    const date = options.date || calcDate({ utc: options.utc });

    if (options.utc) return new Date(Date.UTC(
        date.getUTCFullYear() + (options.years || 0),
        date.getUTCMonth() + (options.months || 0),
        date.getUTCDate() + (options.days || 0),
        date.getUTCHours() + (options.hours || 0),
        date.getUTCMinutes() + (options.minutes || 0),
        date.getUTCSeconds() + (options.seconds || 0),
        date.getUTCMilliseconds() + (options.milliseconds || 0)
    ));

    return new Date(
        date.getFullYear() + (options.years || 0),
        date.getMonth() + (options.months || 0),
        date.getDate() + (options.days || 0),
        date.getHours() + (options.hours || 0),
        date.getMinutes() + (options.minutes || 0),
        date.getSeconds() + (options.seconds || 0),
        date.getMilliseconds() + (options.milliseconds || 0)
    );
}

export function reduceDate(options: AddDateOpitons = {}) {
    const date = options.date || calcDate({ utc: options.utc });

    if (options.utc) return new Date(Date.UTC(
        date.getUTCFullYear() - (options.years || 0),
        date.getUTCMonth() - (options.months || 0),
        date.getUTCDate() - (options.days || 0),
        date.getUTCHours() - (options.hours || 0),
        date.getUTCMinutes() - (options.minutes || 0),
        date.getUTCSeconds() - (options.seconds || 0),
        date.getUTCMilliseconds() - (options.milliseconds || 0)
    ));

    return new Date(
        date.getFullYear() - (options.years || 0),
        date.getMonth() - (options.months || 0),
        date.getDate() - (options.days || 0),
        date.getHours() - (options.hours || 0),
        date.getMinutes() - (options.minutes || 0),
        date.getSeconds() - (options.seconds || 0),
        date.getMilliseconds() - (options.milliseconds || 0)
    );
}

export function formatDate(format = "YYYY-MM-DD", date = new Date()) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    return format
        .replace("YYYY", year)
        .replace("YY", year.substring(2))
        .replace("MM", month.length == 2 ? month : '0' + month)
        .replace("DD", day.length == 2 ? day : '0' + day)
        .replace("M", month)
        .replace("D", day);
}

export function formatTime(format = "YYYY-MM-DD hh:mm:ss.mss", date = new Date()) {
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    const milliseconds = date.getMilliseconds().toString();

    return formatDate(format, date)
        .replace("mss", '0'.repeat(3 - milliseconds.length) + milliseconds)
        .replace("hh", hours.length == 2 ? hours : '0' + hours)
        .replace("mm", minutes.length == 2 ? minutes : '0' + minutes)
        .replace("ss", seconds.length == 2 ? seconds : '0' + seconds)
        .replace("ms", milliseconds)
        .replace("h", hours)
        .replace("m", minutes)
        .replace("s", seconds);
}

export function formatDuration(milliseconds: number, options: FormatDurationOptions = {}): string {
    const days = milliseconds / Milliseconds.Day | 0;
    const hours = ((milliseconds % Milliseconds.Day) / Milliseconds.Hour | 0).toString();
    const minutes = ((milliseconds % Milliseconds.Hour) / Milliseconds.Minute | 0).toString();

    let result = "";

    if (days) {
        result += days + 'd';
        result += ' ';
    }

    result += hours.length < 2 ? '0' + hours : hours;
    result += ':';
    result += minutes.length < 2 ? '0' + minutes : minutes;

    if (options.seconds) {
        const seconds = ((milliseconds % Milliseconds.Minute) / Milliseconds.Second | 0).toString();

        result += ':';
        result += seconds.length < 2 ? '0' + seconds : seconds;
    }

    if (options.milliseconds) {
        const ms = (milliseconds % Milliseconds.Second | 0).toString();

        result += ',';
        result += ms.length < 2 ? '00' + ms : ms.length < 3 ? '0' + ms : ms;
    }

    return result;
}