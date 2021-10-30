export interface NpmViewResult {
  name: string;
  versions: string[];
  'dist-tags': Record<string, string>;
  version: string;
  description: string;
  license: string;
  author: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  dist: {
    tarball: string;
  };
}
