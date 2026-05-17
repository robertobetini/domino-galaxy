import { describe, it } from "node:test";
import assert from "node:assert";

import utils from "../../shared/utils.js";

describe("utils.randomNumber", () => {
    it("should always give number greater than or equal to min", (t) => {
        const min = 0;
        const max = 100;

        for (let i = 0; i < 100; i++) {
            const result = utils.randomNumber({ min, max });
            assert.strictEqual(result >= min, true, `result: ${result}`);
        }
    });

    it("should always give number less than or equal to max", (t) => {
        const min = 0;
        const max = 100;

        for (let i = 0; i < 100; i++) {
            const result = utils.randomNumber({ min, max });
            assert.strictEqual(result <= max, true, `result: ${result}`);
        }
    });

    it("should always give number greater than ot equal to 0 when min not specified", (t) => {
        const max = 100;

        for (let i = 0; i < 100; i++) {
            const result = utils.randomNumber({ max });
            assert.strictEqual(result >= 0, true, `result: ${result}`);
        }
    });

    it("should always give number less than or equal to MAX_SAFE_INTEGER when max not specified", (t) => {
        const min = 0;

        for (let i = 0; i < 100; i++) {
            const result = utils.randomNumber({ min });
            assert.strictEqual(result <= Number.MAX_SAFE_INTEGER, true, `result: ${result}`);
        }
    });
});
