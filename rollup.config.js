import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'; // For minify

const production = true
// const mode = "development"

const root_dir = production ? "dist" : "bin/dist"

export default [
    {
        input: `src/index.ts`,
        plugins: [typescript(), esbuild()],
        output: [
            {
                file: `${root_dir}/index.umd.js`,
                format: 'umd', // umd - for Browser + Node.js
                sourcemap: !production,
                name: "_calendar"
            },
            {
                file: `${root_dir}/index.mjs`,
                format: 'es', // ESM
                sourcemap: !production
            },
        ]
    },
    {
        input: `src/index.ts`,
        plugins: [typescript()],
        output: {
            file: `${root_dir}/index.cjs`,
            format: 'cjs', // cjs - for Node.js
            sourcemap: !production
        },
    },
    {
        input: `src/index.ts`,
        plugins: [typescript(), esbuild(), terser()],
        output: [
            {
                file: `${root_dir}/index.umd.min.js`,
                format: 'umd', // umd - for Browser + Node.js
                sourcemap: !production,
                name: "_calendar"
            }
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