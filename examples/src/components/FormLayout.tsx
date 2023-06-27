import React from 'react';

import * as styles from './FormLayout.module.css';

interface FormLayoutProps {
    title: string;
    form: React.ReactNode;
    output: React.ReactNode;
}

export const FormLayout: React.FC<FormLayoutProps> = (props) => {
    return (
        <div className={styles.layout}>
            <h1 className={styles.layoutTitle}>{props.title}</h1>
            <div className={styles.layoutInner}>
                <div className={styles.layoutInnerForm}>{props.form}</div>
                <div className={styles.layoutInnerOutput}>
                    <h2 className={styles.layoutInnerOutputTitle}>Submitted form data:</h2>
                    {props.output}
                </div>
            </div>
        </div>
    );
};
