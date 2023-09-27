/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Task } from "../interfaces";
import { Milliseconds, trimTime } from "../utils/time";
import { GlobalEventManager } from "./eventManager";
import { Stopwatch } from "./stopwatch";

export class Updateloop {
    private readonly _stopwatch = new Stopwatch();
    private readonly _tasks: Task[] = [];

    private _lastUpdate = 0;
    private _timeout: NodeJS.Timeout = null;

    constructor(
        public readonly name: string,
        public readonly interval = Milliseconds.Second,
        public readonly eventManger = GlobalEventManager
    ) { }

    public get isRunning(): boolean { return this._stopwatch.isRunning; }
    public get duration(): number { return this._stopwatch.duration; }
    public get lastUpdate(): number { return this._lastUpdate; }

    public add(task: Task, autostart = false) {
        this._tasks.push(task);

        if (autostart && !this.isRunning)
            this.start();
    }

    public remove(task, autostop = false) {
        const index = this._tasks.indexOf(task);

        if (-1 == index)
            return;

        this._tasks.splice(index, 1);

        if (0 == this._tasks.length
            && autostop
            && this.isRunning)
            this.stop();
    }

    public start(time?: number) {
        if (this.isRunning)
            throw new Error("Updateloop is currently running");

        this._stopwatch.start(time);

        const loop = async () => {
            if (!this.isRunning) return;

            const start = Date.now();
            const nextUpdate = this._lastUpdate + this.interval;

            if (start < nextUpdate)
                return this._timeout = setTimeout(loop, nextUpdate - start);

            time = trimTime(this.interval, start);

            this._lastUpdate = time;

            try {
                await Promise.all(this._tasks.map(task => task.execute(time)));
            } catch (error) {
                this.eventManger.onError.emit(this, error);
            }

            const stop = Date.now();
            const delay = this.interval - (stop % this.interval);

            return this._timeout = setTimeout(loop, delay);
        };

        loop();
    }

    public stop(time?: number) {
        if (!this.isRunning)
            throw new Error("Updateloop is not running");

        if (this._timeout)
            clearTimeout(this._timeout);

        this._timeout = null;
        this._stopwatch.stop(time);
    }
}

export const GlobalUpdateLoop = new Updateloop("global");