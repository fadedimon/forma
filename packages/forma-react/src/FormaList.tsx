import React, { ReactElement } from 'react';

import { getReducedInitialState, getReducer } from './FormaList.reducer';

interface FormListChildrenItem<TItem extends any> {
    id: string;
    data?: TItem;
    isNew: boolean;
}

interface FormListProp<TItem extends any> {
    items: FormListChildrenItem<TItem>[];
    add(): void;
    remove(id: string): void;
}

interface FormaListProps<TItem extends any> {
    name: string;
    defaultItems: TItem[];
    getItemId(item: TItem): string;
    children(list: FormListProp<TItem>): ReactElement<any, any> | null;
    /**
     * Tells `FormaList` to handle empty lists.
     * - if `true`, items passed to `children` render-function cound be empty, if `defaultItems` are empty or they was removed
     * - if `false`, items passed to `children` render-function will always contain at least one item.
     * @default true
     */
    allowEmpty?: boolean;
}

export function FormaList<TItem extends any>(props: FormaListProps<TItem>) {
    const { allowEmpty = true } = props;
    const [state, dispatch] = React.useReducer(
        getReducer(props.name, props.defaultItems.length, allowEmpty),
        getReducedInitialState(props.name, props.defaultItems.length, allowEmpty),
    );

    return props.children({
        items: [
            ...props.defaultItems
                .map((item) => {
                    const id = props.getItemId(item);
                    return {
                        id,
                        data: item,
                        isNew: false,
                    };
                })
                .filter((item) => !state.removedItems.some((removedId) => removedId === item.id)),
            ...state.addedItems.map((id) => ({
                id,
                isNew: true,
            })),
        ],
        add: () => dispatch({ type: 'add' }),
        remove: (id: string) => dispatch({ type: 'remove', payload: { id } }),
    });
}
