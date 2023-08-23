/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { parseArgsFromString } from "./text";

const _process = (function () {
    try {
        return eval('process');
    } catch (error) {
        return null;
    }
})();

export const Args: NodeJS.ReadOnlyDict<string | readonly string[]> = _process
    ? parseArgsFromString(process.argv.slice(3).join(' '))
    : {};