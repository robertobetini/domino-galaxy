import { describe, it } from "node:test";
import assert from "node:assert";

import { randomUUID } from "node:crypto";
import { BiMap } from "../../shared/bimap.js";

describe("BiMap", () => {
    it("get and set should be ok", (t) => {
        const biMap = new BiMap();

        const expected = {
            key: randomUUID(),
            value: randomUUID()
        }

        biMap.set(expected.key, expected.value);

        const result = biMap.get(expected.key);
        const nonExistingValue = biMap.revGet(expected.key);

        assert.strictEqual(result, expected.value);
        assert.strictEqual(nonExistingValue, undefined);
    });

    it("revGet and revSet should be ok", (t) => {
        const biMap = new BiMap();

        const expected = {
            revKey: randomUUID(),
            revValue: randomUUID()
        }

        biMap.revSet(expected.revKey, expected.revValue);

        const result = biMap.revGet(expected.revKey);
        const nonExistingValue = biMap.get(expected.revKey);

        assert.strictEqual(result, expected.revValue);
        assert.strictEqual(nonExistingValue, undefined);
    });

    it("delete should be ok", (t) => {
        const biMap = new BiMap();

        const expected = {
            key: randomUUID(),
            value: randomUUID()
        }

        biMap.set(expected.key, expected.value);

        const result = biMap.delete(expected.key);

        assert.strictEqual(result, true);
    });

    it("delete non existing element should be ok", (t) => {
        const biMap = new BiMap();

        const expected = {
            key: randomUUID(),
            value: randomUUID()
        }

        biMap.set(expected.key, expected.value);

        const result = biMap.delete(randomUUID() + "-delete-test");
        const existingElement = biMap.get(expected.key);

        assert.strictEqual(result, false);
        assert.notStrictEqual(existingElement, undefined);
    });

    it("revDelete should be ok", (t) => {
        const biMap = new BiMap();

        const expected = {
            revKey: randomUUID(),
            revValue: randomUUID()
        }

        biMap.revSet(expected.revKey, expected.revValue);

        const result = biMap.revDelete(expected.revKey);

        assert.strictEqual(result, true);
    });

    

    it("revDelete non existing element should be ok", (t) => {
        const biMap = new BiMap();

        const expected = {
            revKey: randomUUID(),
            revValue: randomUUID()
        }

        biMap.revSet(expected.revKey, expected.revValue);

        const result = biMap.revDelete(randomUUID() + "-delete-test");
        const existingElement = biMap.revGet(expected.revKey);

        assert.strictEqual(result, false);
        assert.notStrictEqual(existingElement, undefined);
    });
});
