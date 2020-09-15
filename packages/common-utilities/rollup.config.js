import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

import pkg from './package.json';

const extensions = ['.ts'];

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return (id) => pattern.test(id);
};

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  external: makeExternalPredicate([...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]),
  plugins: [
    nodeResolve({
      extensions,
    }),
    babel({
      extensions,
    }),
  ],
};
