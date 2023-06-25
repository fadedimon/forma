export function checkIsListName(name: string): boolean {
    return name.slice(-2) === '[]';
}
