/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

type Action = () => Promise<any>;

export class Task {
    private readonly _actions: Action[] = [];

    public add(action: Action) {
        this._actions.push(action);
    }

    public async execute(clear = false) {
        await Promise.all(this._actions.map(action => action()));

        if (clear)
            this._actions.splice(0);
    }
}