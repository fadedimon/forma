export function checkIsListName(name: string): boolean {
    return /.+\[\s*\]$/i.test(name.trim());
}
