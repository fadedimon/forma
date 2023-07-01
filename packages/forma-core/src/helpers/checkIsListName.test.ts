import { checkIsListName } from './checkIsListName';

describe('Helpers. checkIsListName.', () => {
    it.each([
        ['prop[]', true],
        ['prop[] ', true],
        ['prop[]  ', true],
        ['prop[]   ', true],
        ['prop[ ]   ', true],
        ['prop[  ]  ', true],
        ['prop[   ] ', true],
        ['prop[    ]', true],
        ['prop [   ]', true],
        ['prop  [  ]', true],
        ['prop   [ ]', true],
        ['prop   []', true],
        ['prop', false],
        ['prop]', false],
        ['prop[', false],
        ['[]', false],
        ['[', false],
        [']', false],
        ['', false],
    ])('should return expected result for "%s"', (input, expected) => {
        expect(checkIsListName(input)).toEqual(expected);
    });
});
