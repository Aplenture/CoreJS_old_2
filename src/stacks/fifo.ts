/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Stack } from "../interfaces/stack";

interface Node<T> {
    element: T;
    next?: Node<T>;
}

export class Fifo<T> implements Stack<T> {
    private _first: Node<T>;
    private _last: Node<T>;
    private _count: number;

    constructor() {
        this.clear();
    }

    public get count(): number { return this._count; }
    public get current(): T { return this._first.element; }

    public push(element: T): number {
        const node = { element };

        if (!this._first) {
            this._first = node;
            this._last = node
        } else {
            this._last.next = node;
            this._last = node;
        }

        this._count += 1;

        return this._count;
    }

    public pop(): T {
        if (0 == this._count)
            return null;

        const node = this._first;

        this._first = node.next;
        this._count -= 1;

        return node.element;
    }

    public clear(): void {
        this._first = null;
        this._last = null;
        this._count = 0;
    }
}