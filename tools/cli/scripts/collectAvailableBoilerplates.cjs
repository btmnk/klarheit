const fs = require('fs');
const path = require('path');

const boilerplatesDirectory = path.resolve(__dirname, '../../../boilerplates');
const availableBoilerplates = fs.readdirSync(boilerplatesDirectory, { withFileTypes: true });

const boilerplateMap = availableBoilerplates
  .filter((boilerplateDirent) => boilerplateDirent.isDirectory())
  .map((boilerplateDirent) => {
    const boilerplateName = boilerplateDirent.name;
    const boilerplatePackageJsonPath = path.resolve(boilerplatesDirectory, boilerplateName, 'package.json');
    const boilerplatePackageJsonRaw = fs.readFileSync(boilerplatePackageJsonPath);
    const boilerplatePackageJson = JSON.parse(boilerplatePackageJsonRaw);
    return {
      name: boilerplateName,
      package: boilerplatePackageJson.name,
    };
  });

const outputDirectory = path.resolve(__dirname, '../src/data');
fs.writeFileSync(outputDirectory + '/availableBoilerplates.json', JSON.stringify(boilerplateMap, null, 2));
