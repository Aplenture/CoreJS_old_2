/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Task } from "../interfaces";
import { AddDateOpitons, addLocaleDate, calcLocaleDate, reduceLocaleDate } from "../utils";
import { Event } from "./event";

interface Interval {
    readonly years?: number;
    readonly months?: number;
    readonly days?: number;
}

interface NextData extends AddDateOpitons {
    date: Date;
}

export class Cronjob implements Task {
    public readonly onExecute = new Event<Cronjob, number>("Cronjob.onExecute");

    private _nextData: NextData;
    private _nextUpdate: number;
    private _start: number;

    constructor(
        private readonly _action: (time: number) => Promise<any>,
        interval: Interval,
        start = addLocaleDate(interval)
    ) {
        if (!interval.years
            && !interval.months
            && !interval.days)
            throw new Error("the interval of a cronjob needs to be at least 1 minute");

        this._start = Number(start);
        this._nextUpdate = Number(start);
        this._nextData = {
            date: start,
            years: interval.years,
            months: interval.months,
            days: interval.days
        };
    }

    public get nextUpdate(): number { return this._nextUpdate; }
    public get lastUpdate(): number { return Number(this._nextData.date); }

    public execute(time: number): Promise<any> {
        if (time < this._nextUpdate)
            return Promise.resolve();

        let lastUpdate: number;

        do {
            lastUpdate = this._nextUpdate;

            this._nextData.date = addLocaleDate(this._nextData);
            this._nextUpdate = Number(this._nextData.date);
        } while (time >= this._nextUpdate);

        this.onExecute.emit(this, this._nextUpdate);

        return this._action(lastUpdate);
    }

    public reset(time: number): void {
        time = Math.max(time, this._start);

        while (time < this._nextUpdate) {
            this._nextData.date = reduceLocaleDate(this._nextData);
            this._nextUpdate = Number(this._nextData.date);
        }
    }
}