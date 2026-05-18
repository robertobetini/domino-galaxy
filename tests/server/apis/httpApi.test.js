import { describe, it } from "node:test";
import assert from "node:assert";

import httpApi from "../../../server/apis/httpApi.js";

const HTTP_PORT = 9090;

describe("HTTP Api", () => {
    it("create room should be ok", async (t) => {
        const server = httpApi.run(HTTP_PORT);

        const url = `http://localhost:${HTTP_PORT}/rooms`;
        const response = await fetch(url, { method: "POST" });
        const roomId = await response.text();

        assert.strictEqual(response.status, 201);
        assert.notEqual(roomId, null);
        assert.notEqual(roomId, "");

        server.close();
    });

    it("get home page should be ok", async (t) => {
        const server = httpApi.run(HTTP_PORT);

        const url = `http://localhost:${HTTP_PORT}/`;
        const response = await fetch(url);
        const page = await response.text();

        assert.strictEqual(response.status, 200);
        assert.notEqual(page, null);
        assert.notEqual(page, "");
        
        server.close();
    });

    it("get room page should be ok", async (t) => {
        const server = httpApi.run(HTTP_PORT);

        let url = `http://localhost:${HTTP_PORT}/rooms`;
        let response = await fetch(url, { method: "POST" });

        assert.strictEqual(response.status, 201);

        const roomId = await response.text();

        url = `http://localhost:${HTTP_PORT}/rooms/${roomId}`;
        response = await fetch(url);
        const page = await response.text();

        assert.strictEqual(response.status, 200);
        assert.notEqual(page, null);
        assert.notEqual(page, "");
        
        server.close();
    });
});

