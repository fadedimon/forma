import React from 'react';

import './FormField.css';

interface FormFieldProps {
    title: string;
    htmlFor?: string;
}

export const FormField: React.FC<React.PropsWithChildren<FormFieldProps>> = (props) => (
    <div className="FormField">
        <div className="FormField-label">
            <label htmlFor={props.htmlFor}>{props.title}</label>
        </div>
        {props.children}
    </div>
);
