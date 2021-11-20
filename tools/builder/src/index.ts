import { CLI } from './CLI';
import path from 'path';
import fs from 'fs';
import { rollup, OutputOptions, InputOptions } from 'rollup';

import postcssPresetEnv from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import postcss, { PostCSSPluginConf } from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const { file } = CLI.flags;
const cwd = process.cwd();

const SOURCE_DIR = path.resolve(cwd, file);

const PKG_JSON_CONTENTS = fs.readFileSync(path.resolve(cwd, 'package.json'), 'utf-8');
const PKG_JSON = JSON.parse(PKG_JSON_CONTENTS);

const postcssConfig: PostCSSPluginConf = {
  modules: true,
  config: false,
  plugins: [
    postcssImport(),
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
    }),
  ],
};

const inputOptions: InputOptions = {
  input: SOURCE_DIR,
  plugins: [peerDepsExternal(), resolve(), commonjs(), typescript(), postcss(postcssConfig), json(), terser()],
};

const cjsOutputOptions: OutputOptions = {
  file: PKG_JSON.main,
  format: 'cjs',
  sourcemap: true,
};

const esmOutputOptions: OutputOptions = {
  file: PKG_JSON.module,
  format: 'esm',
  sourcemap: true,
};

async function build() {
  const bundle = await rollup(inputOptions);

  await bundle.write(cjsOutputOptions);
  await bundle.write(esmOutputOptions);

  await bundle.close();
}

build();
