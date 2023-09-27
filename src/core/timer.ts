/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Task } from "../interfaces";
import { trimTime } from "../utils";

export class Timer implements Task {
    constructor(
        public readonly interval: number,
        private readonly _action: (time: number) => Promise<any>,
        private _lastUpdate = Date.now()
    ) { }

    public get lastUpdate(): number { return this._lastUpdate; }

    public execute(time: number): Promise<any> {
        if (time < this._lastUpdate)
            return Promise.resolve();

        time = trimTime(this.interval, time);

        this._lastUpdate = time;

        return this._action(time);
    }

    public reset(lastUpdate = Date.now()): void {
        this._lastUpdate = lastUpdate;
    }
}