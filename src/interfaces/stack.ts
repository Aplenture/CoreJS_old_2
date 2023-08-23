/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

export interface Stack<T> {
    readonly count: number;
    readonly current: T;

    push(element: T): number;
    pop(): T;
    clear(): void;
}