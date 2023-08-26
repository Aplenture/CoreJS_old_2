/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

const cwd: string = (function () {
    try {
        return eval('process.cwd()');
    } catch (error) {
        return null;
    }
})();

const _require: (path: string) => any = (function () {
    try {
        return eval('require');
    } catch (error) {
        return null;
    }
})();

const fs = (function () {
    if (!_require)
        return null;

    return _require('fs');
})();

export interface LoadModuleConfig {
    readonly class: string;
    readonly path: string;
}

export const loadModule = (function () {
    if (!_require)
        return function () { throw new Error('method not supported'); }

    return function <T>(config: LoadModuleConfig, ...args: any[]): T {
        const path = `${cwd}/${config.path}.js`;

        let constructor: new (...args: any[]) => T;

        try {
            constructor = _require(path)[config.class];
        } catch (error) {
            throw new Error(`module '${config.class}' not found at '${path}'`);
        }

        return new constructor(...args);
    }
})();

export const loadConfig = (function () {
    if (!fs)
        return function () { throw new Error('method not supported'); }

    return function loadConfig(name = 'config.json', _default = {}) {
        const path = `${cwd}/${name}`;

        if (!fs.existsSync(path))
            if (_default)
                return _default;
            else
                throw new Error(`missing config at path '${path}'`);

        const content = fs.readFileSync(path, 'utf8');

        return JSON.parse(content);
    }
})();