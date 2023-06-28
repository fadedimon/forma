import { Value } from '../types';
import { checkIsListName } from './checkIsListName';

export function getElementData(elem: Element): { name: string; origName: string; value: Value } | null {
    const name = 'name' in elem && typeof elem.name === 'string' ? elem.name.trim() : null;

    if (!name) {
        return null;
    }

    if (checkIsSelectElement(elem) && elem.multiple) {
        const value: string[] = [];
        for (const option of Array.from(elem.options)) {
            if (option.selected) {
                value.push(option.value);
            }
        }

        return {
            name,
            value,
            origName: name,
        };
    }

    if (checkIsSelectElement(elem)) {
        return {
            name,
            origName: name,
            value: elem.value,
        };
    }

    if (checkIsTextareaElement(elem)) {
        return {
            name,
            origName: name,
            value: elem.value,
        };
    }

    if (checkIsInputElement(elem) && elem.type === 'checkbox') {
        return {
            name,
            origName: name,
            value: !!elem.checked,
        };
    }

    if (checkIsInputElement(elem) && elem.type === 'radio') {
        if (!!elem.checked) {
            return {
                name,
                value: elem.value,
                origName: name,
            };
        }

        return null;
    }

    if (checkIsInputElement(elem) && (elem.type === 'number' || elem.type === 'range')) {
        return {
            name,
            origName: name,
            value: Number(elem.value),
        };
    }

    if (checkIsInputElement(elem)) {
        if (checkIsListName(name)) {
            return {
                name: name.slice(0, -2).trim(),
                origName: name,
                value: [elem.value],
            };
        } else {
            return {
                name,
                origName: name,
                value: elem.value,
            };
        }
    }

    return null;
}

function checkIsTextareaElement(elem: Element): elem is HTMLTextAreaElement {
    return elem.tagName.toUpperCase() === 'TEXTAREA';
}

function checkIsSelectElement(elem: Element): elem is HTMLSelectElement {
    return elem.tagName.toUpperCase() === 'SELECT';
}

function checkIsInputElement(elem: Element): elem is HTMLInputElement {
    return elem.tagName.toUpperCase() === 'INPUT';
}
