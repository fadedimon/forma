import { getElementData } from './getElementData';

describe('Helpers. getElementData.', () => {
    it.each([
        // Bad inputs
        ['<unknown />', { tagName: 'unknown', name: 'prop', value: 'val' }, null],
        ['<unknown /> without name', { tagName: 'unknown', value: 'val' }, null],
        ['<unknown /> with bad list name', { tagName: 'unknown', name: '  []', value: 'val' }, null],

        // Input

        ['<input /> without name', { tagName: 'input', name: '', value: 'val' }, null],
        ['<input /> without value', { tagName: 'input', name: 'prop', value: '' }, null],
        [
            '<input /> with value',
            { tagName: 'input', name: 'prop', value: 'val' },
            { value: 'val', name: 'prop', origName: 'prop' },
        ],
        [
            '<input /> with list value',
            { tagName: 'input', name: 'prop[]', value: 'val' },
            { value: ['val'], name: 'prop', origName: 'prop[]' },
        ],

        // Input type="unknown"

        ['<input type="unknown" /> without name', { tagName: 'input', type: 'unknown', name: '', value: 'val' }, null],
        [
            '<input type="unknown" /> without value',
            { tagName: 'input', type: 'unknown', name: 'prop', value: '' },
            null,
        ],
        [
            '<input type="unknown"> with value',
            { tagName: 'input', type: 'unknown', name: 'prop', value: 'val' },
            { value: 'val', name: 'prop', origName: 'prop' },
        ],
        [
            '<input type="unknown" /> with list value',
            { tagName: 'input', type: 'unknown', name: 'prop[]', value: 'val' },
            { value: ['val'], name: 'prop', origName: 'prop[]' },
        ],

        // Input type="number"

        ['<input type="number" /> without name', { tagName: 'input', type: 'number', name: '', value: 'val' }, null],
        ['<input type="number" /> without value', { tagName: 'input', type: 'number', name: 'prop', value: '' }, null],
        [
            '<input type="number"> with value',
            { tagName: 'input', type: 'number', name: 'prop', value: '123' },
            { value: 123, name: 'prop', origName: 'prop' },
        ],
        [
            '<input type="number" /> with list value',
            { tagName: 'input', type: 'number', name: 'prop[]', value: '123' },
            { value: [123], name: 'prop', origName: 'prop[]' },
        ],

        // Input type="range"

        ['<input type="range" /> without name', { tagName: 'input', type: 'range', name: '', value: 'val' }, null],
        ['<input type="range" /> without value', { tagName: 'input', type: 'range', name: 'prop', value: '' }, null],
        [
            '<input type="range"> with value',
            { tagName: 'input', type: 'range', name: 'prop', value: '123' },
            { value: 123, name: 'prop', origName: 'prop' },
        ],
        [
            '<input type="range" /> with list value',
            { tagName: 'input', type: 'range', name: 'prop[]', value: '123' },
            { value: [123], name: 'prop', origName: 'prop[]' },
        ],

        // Input type="checkbox"

        [
            '<input type="checkbox" /> without name',
            { tagName: 'input', type: 'checkbox', name: '', checked: true },
            null,
        ],
        [
            '<input type="checkbox"> unset',
            { tagName: 'input', type: 'checkbox', name: 'prop' },
            { value: false, name: 'prop', origName: 'prop' },
        ],
        [
            '<input type="checkbox"> unchecked',
            { tagName: 'input', type: 'checkbox', name: 'prop', checked: false },
            { value: false, name: 'prop', origName: 'prop' },
        ],
        [
            '<input type="checkbox"> checked',
            { tagName: 'input', type: 'checkbox', name: 'prop', checked: true },
            { value: true, name: 'prop', origName: 'prop' },
        ],
        [
            '<input type="checkbox"> list unset',
            { tagName: 'input', type: 'checkbox', name: 'prop[]' },
            { value: [false], name: 'prop', origName: 'prop[]' },
        ],
        [
            '<input type="checkbox"> list unchecked',
            { tagName: 'input', type: 'checkbox', name: 'prop[]', checked: false },
            { value: [false], name: 'prop', origName: 'prop[]' },
        ],
        [
            '<input type="checkbox"> list checked',
            { tagName: 'input', type: 'checkbox', name: 'prop[]', checked: true },
            { value: [true], name: 'prop', origName: 'prop[]' },
        ],

        // Input type="radio"

        [
            '<input type="radio" /> without name',
            { tagName: 'input', type: 'radio', name: '', value: 'val', checked: true },
            null,
        ],
        [
            '<input type="radio" /> without value',
            { tagName: 'input', type: 'radio', name: '', value: '', checked: true },
            null,
        ],
        ['<input type="radio"> unset', { tagName: 'input', type: 'radio', name: 'prop', value: 'val' }, null],
        [
            '<input type="radio"> unchecked',
            { tagName: 'input', type: 'radio', name: 'prop', value: 'val', checked: false },
            null,
        ],
        [
            '<input type="radio"> checked',
            { tagName: 'input', type: 'radio', name: 'prop', value: 'val', checked: true },
            { value: 'val', name: 'prop', origName: 'prop' },
        ],
        ['<input type="radio"> list unset', { tagName: 'input', type: 'radio', name: 'prop[]', value: 'val' }, null],
        [
            '<input type="radio"> list unchecked',
            { tagName: 'input', type: 'radio', name: 'prop[]', value: 'val', checked: false },
            null,
        ],
        [
            '<input type="radio"> list checked',
            { tagName: 'input', type: 'radio', name: 'prop[]', value: 'val', checked: true },
            { value: ['val'], name: 'prop', origName: 'prop[]' },
        ],

        // Input type="file"

        ['<input type="file" /> without name', { tagName: 'input', files: 'files-list', name: '', type: 'file' }, null],
        ['<input type="file"> without files', { tagName: 'input', name: 'prop', type: 'file' }, null],
        ['<input type="file"> with empty files', { tagName: 'input', files: [], name: 'prop', type: 'file' }, null],
        [
            '<input type="file" /> with files',
            { tagName: 'input', files: 'files-list', name: 'prop', value: '123', type: 'file' },
            { value: 'files-list', name: 'prop', origName: 'prop' },
        ],
        [
            '<input type="file" /> list with files',
            { tagName: 'input', files: 'files-list', name: 'prop[]', value: '123', type: 'file' },
            { value: 'files-list', name: 'prop', origName: 'prop[]' },
        ],

        // Select

        ['<select /> without name', { tagName: 'select', name: '', value: 'val' }, null],
        ['<select /> without value', { tagName: 'select', name: 'prop', value: '' }, null],
        [
            '<select> with value',
            { tagName: 'select', name: 'prop', value: 'val' },
            { value: 'val', name: 'prop', origName: 'prop' },
        ],
        [
            '<select /> with list value',
            { tagName: 'select', name: 'prop[]', value: 'val' },
            { value: ['val'], name: 'prop', origName: 'prop[]' },
        ],

        // Select multiple

        [
            '<select multiple /> without name',
            { tagName: 'select', multiple: true, name: '', selectedOptions: [{ value: 'val1' }, { value: 'val2' }] },
            null,
        ],
        [
            '<select multiple /> without selectedOptions',
            { tagName: 'select', multiple: true, name: 'prop', selectedOptions: [] },
            null,
        ],
        [
            '<select multiple> with value',
            {
                tagName: 'select',
                multiple: true,
                name: 'prop',
                selectedOptions: [{ value: 'val1' }, { value: 'val2' }],
            },
            { value: ['val1', 'val2'], name: 'prop', origName: 'prop' },
        ],
        [
            '<select multiple /> with list value',
            {
                tagName: 'select',
                multiple: true,
                name: 'prop[]',
                selectedOptions: [{ value: 'val1' }, { value: 'val2' }],
            },
            { value: ['val1', 'val2'], name: 'prop', origName: 'prop[]' },
        ],

        // Textarea

        ['<textarea /> without name', { tagName: 'textarea', name: '', value: 'val' }, null],
        ['<textarea /> without value', { tagName: 'textarea', name: 'prop', value: '' }, null],
        [
            '<textarea /> with value',
            { tagName: 'textarea', name: 'prop', value: 'val' },
            { value: 'val', name: 'prop', origName: 'prop' },
        ],
        [
            '<textarea /> with list value',
            { tagName: 'textarea', name: 'prop[]', value: 'val' },
            { value: ['val'], name: 'prop', origName: 'prop[]' },
        ],
    ])('should return expected result for %s', (_, elem, expected) => {
        expect(getElementData(elem as never)).toEqual(expected);
    });
});
