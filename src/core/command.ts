/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { ParameterList } from "./parameterList";

export type CommandAction<T> = (args) => Promise<T>;

export interface Command<T> {
    readonly name: string;
    readonly description?: string;
    readonly parameters?: ParameterList;
    readonly execute: CommandAction<T>;
}