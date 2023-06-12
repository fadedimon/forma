import React, { ReactElement } from 'react';

import { EmplyListPolicy, getReducedInitialState, getReducer } from './FormaList.reducer';

interface FormListChildrenItem<TItem extends any> {
    id: string;
    data?: TItem;
    isNew: boolean;
    isMarkedRemoved: boolean;
}

interface FormListProp<TItem extends any> {
    items: FormListChildrenItem<TItem>[];
    add(): void;
    remove(id: string): void;
    markRemoved(id: string): void;
    unmarkRemoved(id: string): void;
}

interface FormaListProps<TItem extends any> {
    name: string;
    defaultItems: TItem[];
    getItemId(item: TItem): string;
    emplyListPolicy?: EmplyListPolicy;
    children(list: FormListProp<TItem>): ReactElement<any, any> | null;
}

export function FormaList<TItem extends any>(props: FormaListProps<TItem>) {
    const { emplyListPolicy = 'none' } = props;
    const [state, dispatch] = React.useReducer(
        getReducer(props.name, emplyListPolicy, props.defaultItems.length),
        getReducedInitialState(props.name, emplyListPolicy, props.defaultItems.length),
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
                        isMarkedRemoved: state.markedAsRemovedItems.includes(id),
                    };
                })
                .filter((item) => !state.removedItems.some((removedId) => removedId === item.id)),
            ...state.addedItems.map((id) => ({
                id,
                isNew: true,
                isMarkedRemoved: state.markedAsRemovedItems.includes(id),
            })),
        ],
        add: () => dispatch({ type: 'add' }),
        remove: (id: string) => dispatch({ type: 'remove', payload: { id } }),
        markRemoved: (id: string) => dispatch({ type: 'mark-removed', payload: { id } }),
        unmarkRemoved: (id: string) => dispatch({ type: 'unmark-removed', payload: { id } }),
    });
}
