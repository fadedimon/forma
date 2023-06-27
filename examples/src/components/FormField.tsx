import React from 'react';

import * as styles from './FormField.module.css';

interface FormFieldProps {
    title?: string;
    htmlFor?: string;
}

export const FormField: React.FC<React.PropsWithChildren<FormFieldProps>> = (props) => (
    <div className={styles.root}>
        {props.title && (
            <div className={styles.label}>
                <label htmlFor={props.htmlFor}>{props.title}</label>
            </div>
        )}
        {props.children}
    </div>
);
