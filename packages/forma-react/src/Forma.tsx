import { extractFormData } from 'forma-core';
import React from 'react';

interface FormaProps<T extends Record<string, unknown>>
    extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onInput' | 'onChange' | 'onSubmit'> {
    /**
     * Prevents submit event
     * @default true
     */
    preventSubmit?: boolean;
    onInput?(e: React.FormEvent<HTMLFormElement>, data: T): unknown;
    onChange?(e: React.FormEvent<HTMLFormElement>, data: T): unknown;
    onSubmit?(e: React.FormEvent<HTMLFormElement>, data: T): unknown;
}

export function Forma<T extends Record<string, unknown> = Record<string, unknown>>(props: FormaProps<T>) {
    const { preventSubmit = true } = props;

    const formRef = React.useRef<HTMLFormElement>(null);

    let onInput: React.FormEventHandler<HTMLFormElement>;
    if (props.onInput) {
        onInput = (e) => props.onInput(e, extractFormData<T>(e.currentTarget));
    }

    let onChange: React.FormEventHandler<HTMLFormElement>;
    if (props.onChange) {
        onChange = (e) => props.onChange(e, extractFormData<T>(e.currentTarget));
    }

    let onSubmit: React.FormEventHandler<HTMLFormElement>;

    if (props.onSubmit || preventSubmit) {
        onSubmit = (e) => {
            if (preventSubmit) {
                e.preventDefault();
            }

            if (props.onSubmit) {
                props.onSubmit(e, extractFormData<T>(e.currentTarget));
            }
        };
    }

    return (
        <form {...props} ref={formRef} onInput={onInput} onChange={onChange} onSubmit={onSubmit}>
            {props.children}
        </form>
    );
}
