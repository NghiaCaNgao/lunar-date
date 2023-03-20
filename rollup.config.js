import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'

export default [
    {
        input: `src/index.ts`,
        plugins: [typescript(), esbuild()],
        output: [
            {
                file: `dist/bundle.js`,
                format: 'es',
                sourcemap: true,
                exports: 'default',
                name: "Calendar"
            },
        ]
    },
    {
        input: `src/index.ts`,
        plugins: [typescript(), esbuild()],
        output: [
            {
                file: `dist/bundle.umd.js`,
                format: 'umd',
                sourcemap: true,
                exports: 'default',
                name: "Calendar"
            },
        ]
    },
    {
        input: `src/index.ts`,
        plugins: [dts()],
        output: {
            file: `dist/bundle.d.ts`,
            format: 'es',
            name: "Calendar"
        },
    }
]