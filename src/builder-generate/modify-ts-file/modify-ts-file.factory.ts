import { Rule } from '@angular-devkit/schematics';

export function modifyTsFileFactory(): Rule {
  return () => {
    console.log('Hello world');
  };
}
