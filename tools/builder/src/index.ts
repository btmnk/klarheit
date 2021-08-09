import { CLI } from './CLI';
import path from 'path';
import fs from 'fs';
import { rollup, OutputOptions, InputOptions } from 'rollup';

import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

const { file } = CLI.flags;
const cwd = process.cwd();

const SOURCE_DIR = path.resolve(cwd, file);

const PKG_JSON_CONTENTS = fs.readFileSync(path.resolve(cwd, 'package.json'), 'utf-8');
const PKG_JSON = JSON.parse(PKG_JSON_CONTENTS);

// see below for details on the options
const inputOptions: InputOptions = {
  input: SOURCE_DIR,
  plugins: [peerDepsExternal(), resolve(), commonjs(), typescript(), postcss(), json()],
};

const cjsOutputOptions: OutputOptions = {
  file: PKG_JSON.main,
  format: 'cjs',
  sourcemap: true,
};

const esmOutputOptions: OutputOptions = {
  file: PKG_JSON.module,
  format: 'cjs',
  sourcemap: true,
};

async function build() {
  // create a bundle
  const bundle = await rollup(inputOptions);

  // or write the bundle to disk
  await bundle.write(cjsOutputOptions);
  await bundle.write(esmOutputOptions);

  // closes the bundle
  await bundle.close();
}

build();
