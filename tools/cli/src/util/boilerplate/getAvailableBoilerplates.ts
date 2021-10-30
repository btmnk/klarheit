import { readJson } from '../json/readJson.js';

export interface AvailableBoilerplate {
  name: string;
  package: string;
}

export async function getAvailableBoilerplates(): Promise<AvailableBoilerplate[]> {
  return readJson('../../data/availableBoilerplates.json', import.meta.url);
}
