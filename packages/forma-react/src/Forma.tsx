import { buildFormJson } from 'forma-core';
import React from 'react';

import { FormaEvent } from './types';

interface FormaProps extends React.HTMLAttributes<HTMLFormElement> {
    onChange?(e: FormaEvent): unknown;
    onSubmit?(e: FormaEvent): unknown;
}

export const Forma: React.FC<FormaProps> = (props) => {
    const formRef = React.useRef<HTMLFormElement>(null);

    let onChange: React.FormEventHandler<HTMLFormElement>;
    if (props.onChange) {
        onChange = (e) => props.onChange(patchEvent(e));
    }

    let onSubmit: React.FormEventHandler<HTMLFormElement>;
    if (props.onSubmit) {
        onSubmit = (e) => props.onSubmit(patchEvent(e));
    }

    return (
        <form {...props} ref={formRef} onChange={onChange} onSubmit={onSubmit}>
            {props.children}
        </form>
    );
};

function patchEvent(e: React.FormEvent<HTMLFormElement>): FormaEvent {
    const patchedEvent = e as FormaEvent;
    patchedEvent.json = buildFormJson(e.currentTarget);
    return patchedEvent;
}
