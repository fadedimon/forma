import { getElementData } from './helpers/getElementData';
import { ElementPathItem, getElementPath } from './helpers/getElementPath';
import { Value } from './types';

export function buildFormJson(form: HTMLFormElement) {
    const result: Record<string, unknown> = {};
    const fieldsetElemToResultNodeMap = new Map<HTMLFieldSetElement, Record<string, Value>>();

    for (const elem of Array.from(form.elements)) {
        const elemData = getElementData(elem);
        if (!elemData) {
            continue;
        }

        let path: ElementPathItem[] = [];
        try {
            path = getElementPath(elem, form);
        } catch (err) {
            console.warn(err);
            continue;
        }

        let targetResultNode: {} | {}[] = result;
        const pathNames: string[] = [];
        if (path.length > 0) {
            let currNode;
            for (let i = path.length - 1; i >= 0; i--) {
                const node = path[i];

                if (node.type === 'record') {
                    let data = fieldsetElemToResultNodeMap.get(node.fieldsetElem);
                    if (!data) {
                        data = {};
                        fieldsetElemToResultNodeMap.set(node.fieldsetElem, data);
                        if (node.id) {
                            data.id = node.id;
                        }
                    }
                    currNode = node;
                    targetResultNode[node.name] = data;
                    targetResultNode = data;
                    pathNames.push(node.name);
                    continue;
                }

                if (node.type === 'list') {
                    currNode = node;
                    targetResultNode[node.name] = targetResultNode[node.name] || [];
                    targetResultNode = targetResultNode[node.name];
                    pathNames.push(`${node.name}[]`);
                    continue;
                }

                if (node.type === 'list-item') {
                    if (!Array.isArray(targetResultNode)) {
                        throw new Error(`Node type="list-item" couldn't be inside ${currNode.type}`);
                    }
                    let data = fieldsetElemToResultNodeMap.get(node.fieldsetElem);
                    if (!data) {
                        data = {};
                        targetResultNode.push(data);
                        fieldsetElemToResultNodeMap.set(node.fieldsetElem, data);
                        if (node.id) {
                            data.id = node.id;
                        }
                    }
                    currNode = node;
                    targetResultNode = data;
                    continue;
                }
            }
        }

        if (Array.isArray(elemData.value) && targetResultNode[elemData.name]) {
            if (!Array.isArray(targetResultNode[elemData.name])) {
                const publicPath = `${[...pathNames, elemData.origName].join('.')}`;
                throw new Error(
                    `Can not switch between list and non-list values. Check name attributes for ${publicPath}`,
                );
            }
            targetResultNode[elemData.name] = [...targetResultNode[elemData.name], ...elemData.value];
        } else {
            targetResultNode[elemData.name] = elemData.value;
        }
    }

    return result;
}
