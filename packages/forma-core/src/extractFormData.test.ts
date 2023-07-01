import { extractFormData } from './extractFormData';

jest.mock('./helpers/getElementData', () => ({
    getElementData: jest.fn((elem) => ({
        value: elem.name.slice(-2) === '[]' ? [`${elem.name}-value`] : `${elem.name}-value`,
        name: elem.name.slice(-2) === '[]' ? elem.name.slice(0, -2) : elem.name,
        origName: elem.name,
    })),
}));

const form = {
    tagName: 'form',
};

const user = {
    name: 'user',
    tagName: 'fieldset',
    parentNode: form,
};

const userWithId = {
    id: 'userWithId-id',
    name: 'userWithId',
    tagName: 'fieldset',
    parentNode: form,
};

const userList = {
    name: 'userList[]',
    tagName: 'fieldset',
    parentNode: form,
};
const userList2 = {
    ...userList,
};

const userListWithIds = {
    id: 'userListWithIds-id-1',
    name: 'userListWithIds[]',
    tagName: 'fieldset',
    parentNode: form,
};
const userListWithIds2 = {
    ...userListWithIds,
    id: 'userListWithIds-id-2',
};

const group = {
    name: 'group',
    tagName: 'fieldset',
    parentNode: form,
};

const groupUserListWithIds = {
    id: 'groupUserListWithIds-id-1',
    name: 'groupUserListWithIds[]',
    tagName: 'fieldset',
    parentNode: group,
};
const groupUserListWithIds2 = {
    ...groupUserListWithIds,
    id: 'groupUserListWithIds-id-2',
};

const groupUserListWithIdsInner = {
    name: 'inner',
    tagName: 'fieldset',
    parentNode: groupUserListWithIds,
};

const groupUserListWithIds2Inner = {
    name: 'inner',
    tagName: 'fieldset',
    parentNode: groupUserListWithIds2,
};

describe('Helpers. extractFormData.', () => {
    it.each([
        ['empty form', { elements: [] }, {}],

        [
            'form with elements at root level',
            {
                elements: [
                    { name: 'firstName', parentNode: form },
                    { name: 'lastName', parentNode: form },
                    { name: 'items[]', parentNode: form },
                    { name: 'items[]', parentNode: form },
                ],
            },
            {
                firstName: 'firstName-value',
                lastName: 'lastName-value',
                items: ['items[]-value', 'items[]-value'],
            },
        ],

        [
            'form with nested elements',
            {
                elements: [
                    { name: 'firstName', parentNode: user },
                    { name: 'lastName', parentNode: user },
                    { name: 'items[]', parentNode: user },
                    { name: 'items[]', parentNode: user },
                ],
            },
            {
                user: {
                    firstName: 'firstName-value',
                    lastName: 'lastName-value',
                    items: ['items[]-value', 'items[]-value'],
                },
            },
        ],

        [
            'form with nested elements with id',
            {
                elements: [
                    { name: 'firstName', parentNode: userWithId },
                    { name: 'lastName', parentNode: userWithId },
                    { name: 'items[]', parentNode: userWithId },
                    { name: 'items[]', parentNode: userWithId },
                ],
            },
            {
                userWithId: {
                    id: 'userWithId-id',
                    firstName: 'firstName-value',
                    lastName: 'lastName-value',
                    items: ['items[]-value', 'items[]-value'],
                },
            },
        ],

        [
            'form with list',
            {
                elements: [
                    { name: 'firstName', parentNode: userList },
                    { name: 'lastName', parentNode: userList },
                    { name: 'items[]', parentNode: userList },
                    { name: 'items[]', parentNode: userList },
                    { name: 'firstName', parentNode: userList2 },
                    { name: 'lastName', parentNode: userList2 },
                    { name: 'items[]', parentNode: userList2 },
                    { name: 'items[]', parentNode: userList2 },
                ],
            },
            {
                userList: [
                    {
                        firstName: 'firstName-value',
                        lastName: 'lastName-value',
                        items: ['items[]-value', 'items[]-value'],
                    },
                    {
                        firstName: 'firstName-value',
                        lastName: 'lastName-value',
                        items: ['items[]-value', 'items[]-value'],
                    },
                ],
            },
        ],

        [
            'form with list of items with id',
            {
                elements: [
                    { name: 'firstName', parentNode: userListWithIds },
                    { name: 'lastName', parentNode: userListWithIds },
                    { name: 'items[]', parentNode: userListWithIds },
                    { name: 'items[]', parentNode: userListWithIds },
                    { name: 'firstName', parentNode: userListWithIds2 },
                    { name: 'lastName', parentNode: userListWithIds2 },
                    { name: 'items[]', parentNode: userListWithIds2 },
                    { name: 'items[]', parentNode: userListWithIds2 },
                ],
            },
            {
                userListWithIds: [
                    {
                        id: 'userListWithIds-id-1',
                        firstName: 'firstName-value',
                        lastName: 'lastName-value',
                        items: ['items[]-value', 'items[]-value'],
                    },
                    {
                        id: 'userListWithIds-id-2',
                        firstName: 'firstName-value',
                        lastName: 'lastName-value',
                        items: ['items[]-value', 'items[]-value'],
                    },
                ],
            },
        ],

        [
            'form with list of items with id',
            {
                elements: [
                    { name: 'firstName', parentNode: groupUserListWithIds },
                    { name: 'lastName', parentNode: groupUserListWithIds },
                    { name: 'items[]', parentNode: groupUserListWithIds },
                    { name: 'items[]', parentNode: groupUserListWithIds },
                    { name: 'firstName', parentNode: groupUserListWithIds2 },
                    { name: 'lastName', parentNode: groupUserListWithIds2 },
                    { name: 'items[]', parentNode: groupUserListWithIds2 },
                    { name: 'items[]', parentNode: groupUserListWithIds2 },
                ],
            },
            {
                group: {
                    groupUserListWithIds: [
                        {
                            id: 'groupUserListWithIds-id-1',
                            firstName: 'firstName-value',
                            lastName: 'lastName-value',
                            items: ['items[]-value', 'items[]-value'],
                        },
                        {
                            id: 'groupUserListWithIds-id-2',
                            firstName: 'firstName-value',
                            lastName: 'lastName-value',
                            items: ['items[]-value', 'items[]-value'],
                        },
                    ],
                },
            },
        ],

        [
            'form super weird nesting',
            {
                elements: [
                    { name: 'firstName', parentNode: groupUserListWithIdsInner },
                    { name: 'lastName', parentNode: groupUserListWithIdsInner },
                    { name: 'items[]', parentNode: groupUserListWithIdsInner },
                    { name: 'items[]', parentNode: groupUserListWithIdsInner },
                    { name: 'firstName', parentNode: groupUserListWithIds2Inner },
                    { name: 'lastName', parentNode: groupUserListWithIds2Inner },
                    { name: 'items[]', parentNode: groupUserListWithIds2Inner },
                    { name: 'items[]', parentNode: groupUserListWithIds2Inner },
                ],
            },
            {
                group: {
                    groupUserListWithIds: [
                        {
                            id: 'groupUserListWithIds-id-1',
                            inner: {
                                firstName: 'firstName-value',
                                lastName: 'lastName-value',
                                items: ['items[]-value', 'items[]-value'],
                            },
                        },
                        {
                            id: 'groupUserListWithIds-id-2',
                            inner: {
                                firstName: 'firstName-value',
                                lastName: 'lastName-value',
                                items: ['items[]-value', 'items[]-value'],
                            },
                        },
                    ],
                },
            },
        ],
    ])('should return expected result for "%s"', (_, input, expected) => {
        expect(extractFormData(input as never)).toEqual(expected);
    });
});
