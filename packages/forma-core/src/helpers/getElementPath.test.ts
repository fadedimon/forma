import { getElementPath } from './getElementPath';

const form = {
    parentNode: {},
};

describe('Helpers. getElementPath.', () => {
    it('should return path with one record node', () => {
        const elem = {
            parentNode: {
                tagName: 'fieldset',
                name: 'prop',
                parentNode: form,
            },
        };

        const expected = [
            {
                id: undefined,
                name: 'prop',
                type: 'record',
                fieldsetElem: elem.parentNode,
            },
        ];

        expect(getElementPath(elem as never, form as never)).toEqual(expected);
    });

    it('should return path with one record node with id', () => {
        const elem = {
            parentNode: {
                id: 'elem-id',
                tagName: 'fieldset',
                name: 'prop',
                parentNode: form,
            },
        };

        const expected = [
            {
                type: 'record',
                id: 'elem-id',
                name: 'prop',
                fieldsetElem: elem.parentNode,
            },
        ];

        expect(getElementPath(elem as never, form as never)).toEqual(expected);
    });

    it('should return path with two record nodes', () => {
        const elem = {
            parentNode: {
                id: 'inner-id',
                tagName: 'fieldset',
                name: 'prop',
                parentNode: {
                    id: 'outer-id',
                    tagName: 'fieldset',
                    name: 'outer-prop',
                    parentNode: form,
                },
            },
        };

        const expected = [
            {
                type: 'record',
                id: 'inner-id',
                name: 'prop',
                fieldsetElem: elem.parentNode,
            },
            {
                type: 'record',
                id: 'outer-id',
                name: 'outer-prop',
                fieldsetElem: elem.parentNode.parentNode,
            },
        ];

        expect(getElementPath(elem as never, form as never)).toEqual(expected);
    });

    it('should return path with two record nodes', () => {
        const elem = {
            parentNode: {
                id: 'inner-id',
                tagName: 'fieldset',
                name: 'prop[]',
                parentNode: {
                    id: 'outer-id',
                    tagName: 'fieldset',
                    name: 'outer-prop',
                    parentNode: form,
                },
            },
        };

        const expected = [
            {
                type: 'list-item',
                id: 'inner-id',
                fieldsetElem: elem.parentNode,
            },
            {
                type: 'list',
                name: 'prop',
            },
            {
                id: 'outer-id',
                name: 'outer-prop',
                type: 'record',
                fieldsetElem: elem.parentNode.parentNode,
            },
        ];

        expect(getElementPath(elem as never, form as never)).toEqual(expected);
    });
});
