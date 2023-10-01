/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

export interface Task {
    readonly execute: (time: number) => Promise<any>;
    readonly reset: (time: number) => void;
}