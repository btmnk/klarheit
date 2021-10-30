#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import { readdir } from 'fs/promises';
import chalk from 'chalk';
import path from 'path';
import ora from 'ora';

import { npmView } from './util/npm/npmView.js';
import { downloadTar } from './util/download/downloadTar.js';
import { getAvailableBoilerplates } from './util/boilerplate/getAvailableBoilerplates.js';
import { readJson } from './util/json/readJson.js';

async function run() {
  const packageJson = await readJson<{ version: string }>('../package.json', import.meta.url);

  /**
   * CLI Version
   */
  program.version(packageJson.version);

  /**
   * Install Command
   */
  program
    .command('install')
    .description('Download a klarheit boilerplate')
    .action(async () => {
      const currentDirContents = await readdir(process.cwd());
      if (currentDirContents.length > 0) {
        console.error(
          chalk.yellow('The current directory is not empty!') +
            '\n' +
            chalk.yellow('Please run this command in an empty directory to install a boilerplate.'),
        );

        process.exit(1);
      }

      const boilerplates = await getAvailableBoilerplates();

      const { boilerplate: boilerplateAnswer } = await inquirer.prompt<{ boilerplate: string }>([
        { type: 'list', name: 'boilerplate', choices: boilerplates.map((boilerplate) => boilerplate.name) },
      ]);

      const spinner = ora(`Searching for Boilerplate ${chalk.cyan(boilerplateAnswer)}`);
      spinner.start();

      const targetBoilerplate = boilerplates.find((boilerplate) => boilerplate.name === boilerplateAnswer);
      if (!targetBoilerplate) throw Error('Could not find boilerplate..');
      const result = await npmView(targetBoilerplate?.package);
      spinner.text = `Downloading & extracting boilerplate ${
        chalk.cyan(result.name) + '@' + chalk.yellow(result.version)
      }`;

      await downloadTar(result.dist.tarball, path.resolve(process.cwd(), 'package.tar.gz'));
      spinner.succeed('Finished!');

      console.log('');
      console.log(
        chalk.green(`The boilerplate has been downloaded, you can now install the dependencies with npm/yarn/pnpm.`),
      );
    });

  program.parse(process.argv);
}

run();
