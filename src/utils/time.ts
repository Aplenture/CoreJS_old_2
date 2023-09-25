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
    readonly utc?: boolean;
    readonly year?: number;
    readonly month?: number;
    readonly day?: number;
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

export function trimTime(step: number, time = Date.now()): number {
    return step
        ? time - (time % step)
        : time;
}

export function calcDate(date = new Date(), options: CalcDateOpitons = {}) {
    if (options.utc) return new Date(Date.UTC(
        undefined != options.year ? options.year : date.getUTCFullYear(),
        undefined != options.month ? options.month - 1 : date.getUTCMonth(),
        undefined != options.day ? options.day : date.getUTCDate(),
        undefined != options.hours ? options.hours : date.getUTCHours(),
        undefined != options.minutes ? options.minutes : date.getUTCMinutes(),
        undefined != options.seconds ? options.seconds : date.getUTCSeconds(),
        undefined != options.milliseconds ? options.milliseconds : date.getUTCMilliseconds()
    ));

    return new Date(
        undefined != options.year ? options.year : date.getFullYear(),
        undefined != options.month ? options.month - 1 : date.getMonth(),
        undefined != options.day ? options.day : date.getDate(),
        undefined != options.hours ? options.hours : date.getHours(),
        undefined != options.minutes ? options.minutes : date.getMinutes(),
        undefined != options.seconds ? options.seconds : date.getSeconds(),
        undefined != options.milliseconds ? options.milliseconds : date.getMilliseconds()
    );
}

export function formatDate(date = new Date(), options: FormatDateOptions = {}) {
    const seperator = options.seperator !== undefined ? options.seperator : "-";

    let month = '' + ((options.utc ? date.getUTCMonth() : date.getMonth()) + 1),
        day = '' + (options.utc ? date.getUTCDate() : date.getDate()),
        year = options.utc ? date.getUTCFullYear() : date.getFullYear();

    if (month.length < 2)
        month = '0' + month;

    if (day.length < 2)
        day = '0' + day;

    return `${year}${seperator}${month}${seperator}${day}`;
}

export function formatTime(date = new Date(), options: FormatDateOptions = {}) {
    const seperator = options.seperator !== undefined ? options.seperator : ":";

    let seconds = '' + (options.utc ? date.getUTCSeconds() : date.getSeconds()),
        minutes = '' + (options.utc ? date.getUTCMinutes() : date.getMinutes()),
        hours = '' + (options.utc ? date.getUTCHours() : date.getHours());

    if (seconds.length < 2)
        seconds = '0' + seconds;

    if (minutes.length < 2)
        minutes = '0' + minutes;

    if (hours.length < 2)
        hours = '0' + hours;

    let result = `${hours}${seperator}${minutes}`;

    if (options.seconds)
        result += seperator + seconds;

    return result;
}

export function formatDateTime(date = new Date(), options: FormatDateTimeOptions = {}) {
    const d = formatDate(date, Object.assign({}, options, { seperator: options.dateSeperator || options.seperator }));
    const t = formatTime(date, Object.assign({}, options, { seperator: options.timeSeperator || options.seperator }));

    return `${d}${options.seperator !== undefined ? options.seperator : " "}${t}`;
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