import React, { ReactElement } from 'react';

import { getReducedInitialState, getReducer } from './FormaList.reducer';

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
    /**
     * **Warning**: Not supported right now. To use it you will have to remove **all** "marked as removed" item's `name` attributes
     *
     * **How it will work**: \
     * Item will be removed from resulting form data, but it will remain in a `FormaList` marked as `isMarkedRemoved`.
     * This way it could be displayed and returned.
     *
     * @deprecated
     * @param id Item id
     */
    markRemoved(id: string): void;
    /**
     * Unmark item as removed.
     *
     * @deprecated
     * @param id Item id
     */
    unmarkRemoved(id: string): void;
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
