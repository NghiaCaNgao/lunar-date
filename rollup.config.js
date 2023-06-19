import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser';

const mode = "production" // development
const root_dir = mode === "production" ? "dist" : "bin/dist"

export default [
    {
        input: `src/index.ts`,
        plugins: [typescript(), esbuild(), terser()],
        output: [
            {
                file: `${root_dir}/index.js`,
                format: 'cjs',
                sourcemap: true,

            },
            {
                file: `${root_dir}/index.mjs`,
                format: 'es',
                sourcemap: true
            },
        ]
    },
    {
        input: `src/index.ts`,
        plugins: [dts()],
        output: {
            file: `${root_dir}/index.d.ts`,
            format: 'es'
        },
    }
]