import { ArrayLiteralExpression, CallExpression, Decorator, Node, Project, SyntaxKind } from 'ts-morph';

interface ImportToAdd {
  importName: string;
  importPath: string;
}

function isNgModuleDecorator(decorator: Decorator): boolean {
  const callExpression = decorator.getCallExpression();
  if (callExpression) {
    const expression = callExpression.getExpression();

    return expression.getText() === 'NgModule';
  }

  return false;
}

function addImportToNgModule(sourceFile: Node, importName: string) {
  const ngModuleDecorator = sourceFile
    .getDescendantsOfKind(SyntaxKind.Decorator)
    .find((decorator) => isNgModuleDecorator(decorator as Decorator));

  if (ngModuleDecorator) {
    const callExpression = (ngModuleDecorator as Decorator).getCallExpression() as CallExpression;
    const ngModuleArguments = callExpression.getArguments();
    if (ngModuleArguments.length > 0 && Node.isObjectLiteralExpression(ngModuleArguments[0])) {
      const objectLiteral = ngModuleArguments[0];
      const importsProperty = objectLiteral.getProperty('imports');

      if (importsProperty && Node.isPropertyAssignment(importsProperty)) {
        const initializer = importsProperty.getInitializerIfKindOrThrow(
          SyntaxKind.ArrayLiteralExpression,
        ) as ArrayLiteralExpression;
        initializer.addElement(importName);
      } else {
        // Add imports array if it doesn't exist
        objectLiteral.addPropertyAssignment({
          name: 'imports',
          initializer: `[${importName}]`,
        });
      }
    }
  }
}

export function addImportToModule(fileContent: string, { importName, importPath }: ImportToAdd): string {
  const project = new Project();
  const sourceFile = project.createSourceFile('temp.ts', fileContent);

  // Check if the import already exists
  const existingImports = sourceFile
    .getImportDeclarations()
    .some((importDecl) => importDecl.getNamedImports().some((namedImport) => namedImport.getName() === importName));

  if (!existingImports) {
    // Add the import statement
    sourceFile.addImportDeclaration({
      namedImports: [importName],
      moduleSpecifier: importPath,
    });

    // Add the import to NgModule imports array
    addImportToNgModule(sourceFile, importName);
  }

  return sourceFile.getFullText();
}

function isComponentDecorator(decorator: Decorator): boolean {
  const callExpression = decorator.getCallExpression();
  if (callExpression) {
    const expression = callExpression.getExpression();

    return expression.getText() === 'Component';
  }

  return false;
}

function addImportToComponentMetadata(sourceFile: Node, importName: string) {
  const componentDecorator = sourceFile
    .getDescendantsOfKind(SyntaxKind.Decorator)
    .find((decorator) => isComponentDecorator(decorator as Decorator));

  if (componentDecorator) {
    const callExpression = (componentDecorator as Decorator).getCallExpression() as CallExpression;
    const componentArguments = callExpression.getArguments();
    if (componentArguments.length > 0 && Node.isObjectLiteralExpression(componentArguments[0])) {
      const objectLiteral = componentArguments[0];
      const importsProperty = objectLiteral.getProperty('imports');

      if (importsProperty && Node.isPropertyAssignment(importsProperty)) {
        const initializer = importsProperty.getInitializerIfKindOrThrow(
          SyntaxKind.ArrayLiteralExpression,
        ) as ArrayLiteralExpression;
        initializer.addElement(importName);
      } else {
        // Add imports array if it doesn't exist
        objectLiteral.addPropertyAssignment({
          name: 'imports',
          initializer: `[${importName}]`,
        });
      }
    }
  }
}

export function addImportToStandaloneComponent(fileContent: string, { importName, importPath }: ImportToAdd): string {
  const project = new Project();
  const sourceFile = project.createSourceFile('temp.ts', fileContent);

  // Check if the import already exists
  const existingImports = sourceFile
    .getImportDeclarations()
    .some((importDecl) => importDecl.getNamedImports().some((namedImport) => namedImport.getName() === importName));

  if (!existingImports) {
    // Add the import statement
    sourceFile.addImportDeclaration({
      namedImports: [importName],
      moduleSpecifier: importPath,
    });

    // Add the import to standalone component metadata
    addImportToComponentMetadata(sourceFile, importName);
  }

  return sourceFile.getFullText();
}
