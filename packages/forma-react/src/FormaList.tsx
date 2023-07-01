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

    const defaultItems: FormListChildrenItem<TItem>[] = props.defaultItems
        .map((item) => ({
            id: props.getItemId(item),
            data: item,
            isNew: false,
        }))
        .filter((item) => !state.removedItems.some((removedId) => removedId === item.id));

    const newItems: FormListChildrenItem<TItem>[] = state.addedItems.map((id) => ({
        id,
        isNew: true,
    }));

    return props.children({
        items: defaultItems.concat(newItems),
        add: () => dispatch({ type: 'add' }),
        remove: (id: string) => dispatch({ type: 'remove', payload: { id } }),
    });
}
