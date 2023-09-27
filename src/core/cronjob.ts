/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Task } from "../interfaces";
import { addUTCDate } from "../utils";

interface Interval {
    readonly years?: number;
    readonly months?: number;
    readonly days?: number;
    readonly hours?: number;
    readonly minutes?: number;
}

interface NextData extends Interval {
    date: Date;
}

export class Cronjob implements Task {
    private _nextData: NextData;
    private _nextUpdate: number;

    constructor(
        private readonly _action: (time: number) => Promise<any>,
        start: Date,
        interval: Interval = {}
    ) {
        if (!interval.years
            && !interval.months
            && !interval.days
            && !interval.hours
            && !interval.minutes)
            throw new Error("the interval of a cronjob needs to be at least 1 minute");

        this._nextData = {
            date: start,
            years: interval.years,
            months: interval.months,
            days: interval.days,
            hours: interval.hours,
            minutes: interval.minutes
        };

        this._nextUpdate = Number(start);
    }

    public get nextUpdate(): number { return this._nextUpdate; }
    public get lastUpdate(): number { return Number(this._nextData.date); }

    public execute(time: number): Promise<any> {
        if (time < this._nextUpdate)
            return Promise.resolve();

        while (time >= this._nextUpdate) {
            this._nextData.date = addUTCDate(this._nextData);
            this._nextUpdate = Number(this._nextData.date);
        }

        return this._action(time);
    }

    public reset(start: Date): void {
        this._nextData.date = start;
        this._nextUpdate = Number(start);
    }
}