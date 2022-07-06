import fs from 'fs'
import path from 'path'

export function copyFolderRecursiveSync(src: string, dest: string) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const files = fs.readdirSync(src)

  for (const file of files) {
    const srcFile = path.join(src, file)
    const destFile = path.join(dest, path.basename(file))

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyFolderRecursiveSync(srcFile, destFile)
    } else {
      fs.writeFileSync(destFile, fs.readFileSync(srcFile))
    }
  }
}

export function addJavaImports(javaSource: string, javaImports: string[]): string {
  const lines = javaSource.split('\n')
  const lineIndexWithPackageDeclaration = lines.findIndex((line) => line.match(/^package .*;$/))
  for (const javaImport of javaImports) {
    if (!javaSource.includes(javaImport)) {
      const importStatement = `import ${javaImport};`
      lines.splice(lineIndexWithPackageDeclaration + 1, 0, importStatement)
    }
  }
  return lines.join('\n')
}
