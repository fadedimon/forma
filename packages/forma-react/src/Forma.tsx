import { extractFormData } from 'forma-core';
import React from 'react';

import { FormaEvent } from './types';

interface FormaProps<T extends Record<string, unknown>> extends React.HTMLAttributes<HTMLFormElement> {
    /**
     * Prevents submit event
     * @default true
     */
    preventSubmit?: boolean;
    onInput?(e: FormaEvent<T>): unknown;
    onChange?(e: FormaEvent<T>): unknown;
    onSubmit?(e: FormaEvent<T>): unknown;
}

export function Forma<T extends Record<string, unknown> = Record<string, unknown>>(props: FormaProps<T>) {
    const { preventSubmit = true } = props;

    const formRef = React.useRef<HTMLFormElement>(null);

    let onInput: React.FormEventHandler<HTMLFormElement>;
    if (props.onInput) {
        onInput = (e) => props.onInput(patchEvent<T>(e));
    }

    let onChange: React.FormEventHandler<HTMLFormElement>;
    if (props.onChange) {
        onChange = (e) => props.onChange(patchEvent<T>(e));
    }

    let onSubmit: React.FormEventHandler<HTMLFormElement>;

    if (props.onSubmit || preventSubmit) {
        onSubmit = (e) => {
            if (preventSubmit) {
                e.preventDefault();
            }

            if (props.onSubmit) {
                props.onSubmit(patchEvent<T>(e));
            }
        };
    }

    return (
        <form {...props} ref={formRef} onInput={onInput} onChange={onChange} onSubmit={onSubmit}>
            {props.children}
        </form>
    );
}

function patchEvent<T extends Record<string, unknown>>(e: React.FormEvent<HTMLFormElement>): FormaEvent<T> {
    const patchedEvent = e as FormaEvent<T>;
    patchedEvent.data = extractFormData(e.currentTarget);

    return patchedEvent;
}
