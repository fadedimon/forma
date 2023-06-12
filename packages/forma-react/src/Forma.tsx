import React from 'react';

interface FormaFormEvent extends React.FormEvent<HTMLFormElement> {
    json: Record<string, unknown>;
    isValid: boolean;
}

interface FormaProps extends React.HTMLAttributes<HTMLFormElement> {
    onFormDataChange?(e: FormaFormEvent): void;
    preventSubmit?: boolean;
}

export const Forma: React.FC<FormaProps> = (props) => {
    const formRef = React.useRef<HTMLFormElement>(null);

    const onChange: React.FormEventHandler<HTMLFormElement> = (e) => {
        if (props.onChange) {
            props.onChange(e);
        }

        if (props.onFormDataChange) {
            // const json = buildJSONFromForm(e.currentTarget);
            // const isValid = e.currentTarget.checkValidity();
            // props.onFormDataChange({
            //     ...e,
            //     json,
            //     isValid,
            // });
        }
    };

    // let onChange: React.FormEventHandler<HTMLFormElement> | undefined;
    // if (props.onChange) {
    //     onChange = (e) => {
    //         //
    //     };
    // }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        if (props.preventSubmit) {
            e.preventDefault();
        }

        if (props.onSubmit) {
            props.onSubmit(e);
        }
    };

    return (
        <form {...props} ref={formRef} onChange={onChange} onSubmit={handleSubmit}>
            {props.children}
        </form>
    );
};
