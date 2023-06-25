import { checkIsListName } from './checkIsListName';

export type ElementPathItem =
    | { type: 'record'; name: string; fieldsetElem: HTMLFieldSetElement; id?: string }
    | { type: 'list'; name: string }
    | { type: 'list-item'; fieldsetElem: HTMLFieldSetElement; id?: string };

export function getElementPath(elem: Element, form: HTMLFormElement): ElementPathItem[] {
    const result: ElementPathItem[] = [];
    let target = elem.parentNode as Element;
    while (target !== form) {
        if (checkIsFieldsetElement(target)) {
            const { id } = target;
            const nameTrimmed = target.name.trim();
            if (checkIsListName(nameTrimmed)) {
                const name = nameTrimmed.slice(0, -2).trim();
                result.push({ type: 'list-item', fieldsetElem: target, id }, { type: 'list', name });
            } else {
                result.push({ type: 'record', name: nameTrimmed, fieldsetElem: target, id });
            }
        }
        target = target.parentNode as Element;
    }

    return result;
}

function checkIsFieldsetElement(elem: Element): elem is HTMLFieldSetElement {
    return elem.tagName.toUpperCase() === 'FIELDSET';
}
