import { Value } from '../types';
import { checkIsListName } from './checkIsListName';

interface ElementData {
    name: string;
    origName: string;
    value: Value;
}

export function getElementData(elem: Element): ElementData | null {
    const origName = 'name' in elem && typeof elem.name === 'string' ? elem.name.trim() : null;

    if (!origName) {
        return null;
    }

    const isList = checkIsListName(origName);
    const name = isList ? origName.slice(0, -2).trim() : origName;

    if (name.length === 0) {
        return null;
    }

    if (checkIsInputElement(elem) && elem.type === 'checkbox') {
        return {
            name,
            origName,
            value: isList ? [!!elem.checked] : !!elem.checked,
        };
    }

    if (checkIsInputElement(elem) && elem.type === 'radio') {
        if (!!elem.checked) {
            return {
                name,
                origName,
                value: isList ? [elem.value] : elem.value,
            };
        }

        return null;
    }

    if (checkIsInputElement(elem) && elem.type === 'file') {
        if (!elem.files || elem.files.length === 0) {
            return null;
        }

        return {
            name,
            origName,
            value: elem.files,
        };
    }

    if (checkIsSelectElement(elem) && elem.multiple) {
        return getSelectMultipleElementData(elem, name, origName);
    }

    if (checkIsSelectElement(elem)) {
        return getSelectElementData(elem, name, origName, isList);
    }

    if (checkIsInputElement(elem) && (elem.type === 'number' || elem.type === 'range')) {
        return getNumberValuedElementData(elem, name, origName, isList);
    }

    if (checkIsInputElement(elem) || checkIsTextareaElement(elem)) {
        return getStringValuedElementData(elem, name, origName, isList);
    }

    return null;
}

function getSelectMultipleElementData(elem: HTMLSelectElement, name: string, origName: string): ElementData | null {
    const value: string[] = [];
    for (const option of Array.from(elem.selectedOptions)) {
        value.push(option.value);
    }

    if (value.length === 0) {
        return null;
    }

    return {
        name,
        value,
        origName,
    };
}

function getSelectElementData(
    elem: HTMLSelectElement,
    name: string,
    origName: string,
    isList: boolean,
): ElementData | null {
    if (!elem.value) {
        return null;
    }

    return {
        name,
        origName,
        value: isList ? [elem.value] : elem.value,
    };
}

function getStringValuedElementData(
    elem: HTMLInputElement | HTMLTextAreaElement,
    name: string,
    origName: string,
    isList: boolean,
): ElementData | null {
    if (!elem.value) {
        return null;
    }

    return {
        name,
        origName,
        value: isList ? [elem.value] : elem.value,
    };
}

function getNumberValuedElementData(
    elem: HTMLInputElement | HTMLTextAreaElement,
    name: string,
    origName: string,
    isList: boolean,
): ElementData | null {
    if (!elem.value) {
        return null;
    }

    return {
        name,
        origName,
        value: isList ? [Number(elem.value)] : Number(elem.value),
    };
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
