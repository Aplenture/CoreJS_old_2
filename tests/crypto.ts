/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { expect } from "chai";
import { random, seededRNG } from "../src";

describe("seeded random", () => {
    const seed = Number(random(4));
    const rng = seededRNG(seed);
    const count = 400000;
    const array = new Array<number>(count);

    array[0] = seededRNG(Number.MAX_SAFE_INTEGER)();

    for (let i = 1; i < count; ++i)
        array[i] = rng();

    it("calculates same numbers with same seed", () => {
        const rng = seededRNG(seed);

        expect(seededRNG(Number.MAX_SAFE_INTEGER)() == array[0]).is.true;

        for (let i = 1; i < count; ++i)
            expect(rng() == array[i]).is.true;
    }).timeout(120000);

    it("calculates unique numbers with different seed", () => array.forEach((a, i) => expect(array.indexOf(a)).equals(i, `'${array[i]}' multiple times found at`))).timeout(120000);
});