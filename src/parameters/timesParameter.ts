/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Parameter } from "../core/parameter";
import { parseToTime } from "../utils";

export class TimeParameter extends Parameter<number | Date> {
    public readonly type = 'number';
    protected readonly parser = parseToTime;
} 