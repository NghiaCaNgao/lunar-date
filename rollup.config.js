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
                file: `${root_dir}/index.js`,
                format: 'cjs',
                sourcemap: !production
            },
            {
                file: `${root_dir}/index.mjs`,
                format: 'es',
                sourcemap: !production
            },
        ]
    },
    {
        input: `src/index.ts`,
        plugins: [typescript(), esbuild(), terser()],
        output: [
            {
                file: `${root_dir}/index.min.js`,
                format: 'cjs',
                sourcemap: !production,
                name: "_calendar"
            },
            {
                file: `${root_dir}/index.min.mjs`,
                format: 'es',
                sourcemap: !production
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