import { buildFormJson } from 'forma-core';
import React from 'react';

interface PatchedFormEvent extends React.ChangeEvent<HTMLFormElement> {
    json: Record<string, unknown>;
}

interface FormaProps extends React.HTMLAttributes<HTMLFormElement> {
    onChange?(e: PatchedFormEvent): unknown;
    onSubmit?(e: PatchedFormEvent): unknown;
    preventSubmit?: boolean;
}

export const Forma: React.FC<FormaProps> = (props) => {
    const formRef = React.useRef<HTMLFormElement>(null);

    let onChange: React.FormEventHandler<HTMLFormElement>;
    if (props.onChange) {
        onChange = (e) => {
            e.json = buildFormJson(e.currentTarget);
            props.onChange(e);
        };
    }

    let onSubmit: React.FormEventHandler<HTMLFormElement>;
    if (props.onSubmit) {
        onSubmit = (e) => {
            e.json = buildFormJson(e.currentTarget);
            props.onSubmit(e);
        };
    }

    return (
        <form {...props} ref={formRef} onChange={onChange} onSubmit={onSubmit}>
            {props.children}
        </form>
    );
};
