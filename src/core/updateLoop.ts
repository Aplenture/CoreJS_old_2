/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Task } from "../interfaces";
import { Milliseconds, trimTime } from "../utils/time";
import { IEventManager } from "./eventManager";
import { Stopwatch } from "./stopwatch";

export class Updateloop {
    private readonly _stopwatch = new Stopwatch();
    private readonly _tasks: Task[] = [];

    private _nextUpdate: number;
    private _timeout: NodeJS.Timeout = null;

    constructor(
        public readonly name: string,
        public readonly eventManger: IEventManager,
        public readonly interval = Milliseconds.Second,
    ) { }

    public get isRunning(): boolean { return this._stopwatch.isRunning; }
    public get duration(): number { return this._stopwatch.duration; }
    public get nextUpdate(): number { return this._nextUpdate; }

    public add(task: Task, autostart = false, time?: number) {
        this._tasks.push(task);

        if (autostart && !this.isRunning)
            this.start(time);
    }

    public remove(task, autostop = false, time?: number) {
        const index = this._tasks.indexOf(task);

        if (-1 == index)
            return;

        this._tasks.splice(index, 1);

        if (0 == this._tasks.length
            && autostop
            && this.isRunning)
            this.stop(time);
    }

    public start(time = Date.now()) {
        if (this.isRunning)
            throw new Error("Updateloop is currently running");

        this._nextUpdate = trimTime(this.interval, time + this.interval);

        this._stopwatch.start(time);
        this._tasks.forEach(task => task.reset(time));

        const loop = async () => {
            if (!this.isRunning) return;

            time = this._stopwatch.time;

            if (time < this._nextUpdate)
                return this._timeout = setTimeout(loop, this._nextUpdate - time);

            time = trimTime(this.interval, time);

            this._nextUpdate = time + this.interval;

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