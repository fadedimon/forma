interface FormaListState {
    addedItems: string[];
    removedItems: string[];
    markedAsRemovedItems: string[];
}

type FormaListAction =
    | { type: 'add' }
    | { type: 'remove'; payload: { id: string } }
    | { type: 'mark-removed'; payload: { id: string } }
    | { type: 'unmark-removed'; payload: { id: string } };

export function getReducer(name: string, initialListLength: number, allowEmpty: boolean) {
    return (prevState: FormaListState, action: FormaListAction) => {
        switch (action.type) {
            case 'add':
                return {
                    ...prevState,
                    addedItems: [...prevState.addedItems, getNewItemForList(name, prevState.addedItems)],
                };

            case 'remove': {
                const { id } = action.payload;
                const isNew = id.startsWith(buildNewKeyPrefix(name));
                const removedItems = isNew ? prevState.removedItems : [...prevState.removedItems, id];

                let addedItems = isNew ? prevState.addedItems.filter((item) => item !== id) : prevState.addedItems;
                if (initialListLength + addedItems.length - removedItems.length === 0 && !allowEmpty) {
                    addedItems = [...addedItems, getNewItemForList(name, addedItems)];
                }

                return {
                    ...prevState,
                    addedItems,
                    removedItems,
                };
            }

            case 'mark-removed':
                return {
                    ...prevState,
                    markedAsRemovedItems: [...prevState.markedAsRemovedItems, action.payload.id],
                };

            case 'unmark-removed':
                return {
                    ...prevState,
                    markedAsRemovedItems: prevState.markedAsRemovedItems.filter((item) => item !== action.payload.id),
                };

            default:
                return prevState;
        }
    };
}

export function getReducedInitialState(
    name: string,

    initialListLength: number,
    allowEmpty: boolean,
): FormaListState {
    return {
        addedItems: initialListLength === 0 && !allowEmpty ? [getNewItemForList(name, [])] : [],
        removedItems: [],
        markedAsRemovedItems: [],
    };
}

function getNewItemForList(name: string, list: string[]) {
    const prefix = buildNewKeyPrefix(name);
    const lastItem = list.slice(-1)[0];

    let nextNum = 0;
    if (lastItem) {
        const currNum = Number(lastItem.slice(prefix.length));
        nextNum = currNum + 1;
    }

    return `${prefix}${nextNum}`;
}

function buildNewKeyPrefix(name: string) {
    return `@forma-new(${name})~`;
}
