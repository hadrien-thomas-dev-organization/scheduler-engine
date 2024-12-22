import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: "./src/index.ts",
            // Nom global de la librairie (utile pour les builds UMD)
            name: "scheduler-engine",
            // Nom des fichiers de sortie
            fileName: (format) => `scheduler-engine.${format}.js`,
        },
        rollupOptions: {
            external: ["date-fns"],
            output: {
                globals: {
                    "date-fns": "dateFns",
                },
            },
        },
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },
});