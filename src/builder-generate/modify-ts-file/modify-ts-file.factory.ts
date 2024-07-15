import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { addImportToModule, addImportToStandaloneComponent } from '../../utils';

export function modifyTsFileFactory(): Rule {
  return chain([modifyModuleFile(), modifyStandaloneComponentFile()]);
}

export function modifyModuleFile(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const filePath = '/test/test.module.ts';
    const content = tree.read(filePath)?.toString('utf-8');
    if (content) {
      const modifiedContent = addImportToModule(content, {
        importName: 'HttpClientModule',
        importPath: '@angular/common/http',
      });
      tree.overwrite(filePath, modifiedContent);
    }

    return tree;
  };
}

export function modifyStandaloneComponentFile(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const filePath = '/test/test-standalone.component.ts';
    const content = tree.read(filePath)?.toString('utf-8');
    if (content) {
      const modifiedContent = addImportToStandaloneComponent(content, {
        importName: 'HttpClientModule',
        importPath: '@angular/common/http',
      });
      tree.overwrite(filePath, modifiedContent);
    }

    return tree;
  };
}
