import { exec } from 'child_process';

import { NpmViewResult } from '../../interface/NpmViewResult';

/**
 * Pulls package information from an npm registry
 */
export async function npmView(packageName: string): Promise<NpmViewResult> {
  return new Promise((resolve, reject) => {
    try {
      exec(`npm view --json ${packageName}`, (error, stdout, stderr) => {
        if (error) reject(error);
        if (stderr) reject(stderr);
        resolve(JSON.parse(stdout));
      });
    } catch (e) {
      reject(e);
    }
  });
}
