import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addDivToHtml } from '../../utils';

export function modifyHtmlFileFactory(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const filePath = '/test/test.html';
    const content = tree.read(filePath)?.toString('utf-8');
    if (content) {
      const modifiedContent = addDivToHtml(content);
      tree.overwrite(filePath, modifiedContent);
    }

    return tree;
  };
}
