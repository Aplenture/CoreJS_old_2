/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Clock } from "../interfaces/clock";

interface Options {
    readonly start?: number;
    readonly stop?: number;
}

export class Stopwatch implements Clock {
    private _running: boolean;
    private _start: number;
    private _stop: number;
    private _offset: number;

    constructor(options?: Options) {
        this.reset(options)
    }

    public get isRunning(): boolean { return this._running; }
    public get time(): number { return Date.now() + this._offset; }
    public get duration(): number { return (this._stop || this.time) - this._start; }
    public get offset(): number { return this._offset; }

    public start(time = Date.now()) {
        if (this._running)
            throw new Error("stopwatch is currently running");

        this._running = true;
        this._start = time;
        this._offset = Date.now() - time;
        this._stop = 0;
    }

    public stop(time = Date.now()) {
        if (!this._running)
            throw new Error("stopwatch is not running");

        this._running = false;
        this._stop = time;
    }

    public restart(time = Date.now()) {
        this.reset();
        this.start(time);
    }

    public reset(options: Options = {}) {
        this._running = false;
        this._start = options.start || 0;
        this._stop = options.stop || 0;
    }
}
