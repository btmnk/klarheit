import https from 'https';
import http from 'http';
import fs from 'fs';
import tar from 'tar';
import rimraf from 'rimraf';

export async function downloadTar(url: string, out: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const shouldUseHttps = url.startsWith('https') || url.startsWith('//');
    (shouldUseHttps ? https : http).get(url, (result) => {
      const writeStream = fs.createWriteStream(out);

      result.pipe(writeStream);

      writeStream.on('finish', async () => {
        writeStream.close();

        try {
          await tar.x({ file: out, strip: 1 });
          rimraf(out, (rimrafError) => reject(rimrafError));
          resolve();
        } catch (e) {
          reject(e);
        }
      });

      writeStream.on('error', () => {
        reject();
      });
    });
  });
}
