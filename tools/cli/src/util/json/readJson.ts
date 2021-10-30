import { readFile } from 'fs/promises';

export async function readJson<Data = object>(path: string, base: string): Promise<Data> {
  const url = new URL(path, base);
  const buffer = await readFile(url);
  return JSON.parse(buffer.toString());
}
