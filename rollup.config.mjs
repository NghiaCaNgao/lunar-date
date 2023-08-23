import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'; // For minify

const production = true
const out_dir = production ? "dist" : "dev/dist"

export default [
    {
        input: `src/index.ts`,
        plugins: [typescript({ include: ["src/**/*.ts"] }), esbuild()],
        output: [
            {
                file: `${out_dir}/index.umd.js`,
                format: 'umd', // umd - for Browser + Node.js
                sourcemap: !production,
                name: "_calendar"
            },
            {
                file: `${out_dir}/index.mjs`,
                format: 'es', // ESM - using import 
                sourcemap: !production
            },
        ]
    },
    {
        input: `src/index.ts`,
        plugins: [typescript({ include: ["src/**/*.ts"] })],
        output: {
            file: `${out_dir}/index.cjs`,
            format: 'cjs', // cjs - for Node.js
            sourcemap: !production
        },
    },
    {
        input: `src/index.ts`,
        plugins: [typescript({ include: ["src/**/*.ts"] }), esbuild(), terser()],
        output: [
            {
                file: `${out_dir}/index.umd.min.js`,
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
            file: `${out_dir}/index.d.ts`,
            format: 'es'
        },
    }
]