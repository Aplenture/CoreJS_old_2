/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Event } from "./event";
import { IEventEmitter } from "../interfaces/eventEmitter";

export interface IEventManager {
    readonly onMessage: Event<IEventEmitter, string>;
    readonly onError: Event<IEventEmitter, Error>;
}

export const GlobalEventManager: IEventManager = {
    onMessage: new Event<IEventEmitter, string>('Global.onMessage'),
    onError: new Event<IEventEmitter, Error>('Global.onError')
};