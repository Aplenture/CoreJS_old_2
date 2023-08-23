/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Parameter } from "../core/parameter";
import { parseToBool } from "../utils";

export class BoolParameter extends Parameter<boolean>{
    public readonly type = 'boolean';
    protected readonly parser = parseToBool;
}