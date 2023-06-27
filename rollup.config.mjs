import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import nodeExternals from 'rollup-plugin-node-externals';

export default defineConfig([
    buildConfig('forma-core', 'esm'),
    buildConfig('forma-core', 'cjs'),
    buildConfig('forma-react', 'esm'),
    buildConfig('forma-react', 'cjs'),
]);

function buildConfig(name, format) {
    const packageRoot = `./packages/${name}`;
    return defineConfig({
        input: `${packageRoot}/src/index.ts`,
        plugins: [
            typescript({
                tsconfig: `${packageRoot}/tsconfig.${format}.json`,
            }),
            nodeExternals(),
        ],
        external: ['react', 'tslib'],
        output: [
            format === 'esm' && {
                format: 'esm',
                dir: `${packageRoot}/lib/esm`,
                preserveModules: true,
                sourcemap: true,
            },
            format === 'cjs' && {
                format: 'cjs',
                file: `${packageRoot}/lib/cjs/index.js`,
                sourcemap: true,
            },
        ].filter(Boolean),
    });
}
