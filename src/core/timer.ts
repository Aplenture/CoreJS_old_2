/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Task } from "../interfaces";
import { trimTime } from "../utils";

export class Timer implements Task {
    private _nextUpdate: number;

    constructor(
        public readonly interval: number,
        private readonly _action: (time: number) => Promise<any>,
        time = Date.now()
    ) {
        this._nextUpdate = trimTime(interval, time + interval);
    }

    public get nextUpdate(): number { return this._nextUpdate; }

    public execute(time: number): Promise<any> {
        if (time < this._nextUpdate)
            return Promise.resolve();

        time = trimTime(this.interval, time);

        this._nextUpdate = time + this.interval;

        return this._action(time);
    }

    public reset(time: number): void {
        this._nextUpdate = trimTime(this.interval, time + this.interval);
    }
}