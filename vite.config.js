import { defineConfig } from "vite";
import {resolve } from "path";

export default defineConfig({
    root: "public",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rolldownOptions: {
            input: {
                main: resolve(__dirname, "public/index.html"),
                room: resolve(__dirname, "public/room.html")
            }
        }
    }
});