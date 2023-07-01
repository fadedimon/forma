import { Forma, FormaList } from 'forma-react';
import React, { HTMLAttributes, HTMLProps } from 'react';

import { FormField } from '../components/FormField';
import * as styles from './Form.module.css';
import { FormProps } from './Form.types';

const INPUTS: [string, string | number, HTMLProps<HTMLAttributes<HTMLInputElement>>][] = [
    ['text', 'Text value', {}],
    ['color', '#aaddff', {}],
    ['date', '2002-01-01', {}],
    ['datetime-local', '2002-01-01T01:01', {}],
    ['month', '2002-01', {}],
    ['week', '2002-W01', {}],
    ['time', '01:01', {}],
    ['url', 'https://example.com', {}],
    ['email', 'hello@example.com', {}],
    ['tel', '+0 000 00 00', {}],
    ['search', 'Search value', {}],
    ['password', 'Password value', {}],
    ['hidden', 'Hidden value', {}],
    ['number', '123', { min: 0, max: 200 }],
    ['range', '123', { min: 0, max: 200 }],
];

export const ElementsForm: React.FC<FormProps> = (props) => (
    <Forma onSubmit={props.onSubmit}>
        <fieldset name="inputs" className={styles.fieldSet}>
            <legend>Inputs</legend>

            {INPUTS.map(([type, value, attrs]) => (
                <FormField key={type} title={capitalize(type)} htmlFor={type}>
                    <div className={styles.formRow}>
                        <input
                            id={type}
                            type={type}
                            name={type}
                            placeholder={`Type ${type} value here...`}
                            defaultValue={value}
                            autoComplete="off"
                            className={styles.input}
                            {...(attrs as {})}
                        />
                        {type === 'hidden' && <i>here's a hidden input</i>}
                    </div>
                </FormField>
            ))}

            <FormField title="File" htmlFor="file">
                <div className={styles.formRow}>
                    <input id="file" type="file" name="file" />
                </div>
            </FormField>

            <FormField title="File multiple" htmlFor="fileMultiple">
                <div className={styles.formRow}>
                    <input id="fileMultiple" type="file" name="fileMultiple" multiple />
                </div>
            </FormField>

            <FormField title="Checkbox" htmlFor="checkbox">
                <div className={styles.formRow}>
                    <label>
                        <input id="checkbox" type="checkbox" name="checkbox" defaultChecked />
                        Is enabled
                    </label>
                </div>
            </FormField>

            <FormField title="Radio" htmlFor="radio">
                <div className={styles.formRow}>
                    <label>
                        <input id="radio" type="radio" name="radio" value="radio-value-1" defaultChecked />
                        Value #1
                    </label>
                </div>
                <div className={styles.formRow}>
                    <label>
                        <input type="radio" name="radio" value="radio-value-2" />
                        Value #2
                    </label>
                </div>
                <div className={styles.formRow}>
                    <label>
                        <input type="radio" name="radio" value="radio-value-3" />
                        Value #3
                    </label>
                </div>
            </FormField>
        </fieldset>

        <fieldset name="selects" className={styles.fieldSet}>
            <legend>Selects</legend>

            <FormField title="Select" htmlFor="select">
                <div className={styles.formRow}>
                    <select id="select" name="select" className={styles.select} defaultValue="select-value-1">
                        <option value="select-value-1">Value #1</option>
                        <option value="select-value-2">Value #2</option>
                        <option value="select-value-3">Value #3</option>
                        <option value="select-value-4">Value #4</option>
                        <option value="select-value-5">Value #5</option>
                    </select>
                </div>
            </FormField>

            <FormField title="Multiple select" htmlFor="multipleSelect">
                <div className={styles.formRow}>
                    <select
                        id="multipleSelect"
                        name="multipleSelect"
                        className={styles.selectMultiple}
                        defaultValue={['select-value-1', 'select-value-2']}
                        multiple
                    >
                        <option value="select-value-1">Value #1</option>
                        <option value="select-value-2">Value #2</option>
                        <option value="select-value-3">Value #3</option>
                        <option value="select-value-4">Value #4</option>
                        <option value="select-value-5">Value #5</option>
                    </select>
                </div>
            </FormField>
        </fieldset>

        <fieldset name="textareas" className={styles.fieldSet}>
            <legend>Textareas</legend>

            <FormField title="Select" htmlFor="textarea">
                <div className={styles.formRow}>
                    <textarea id="textarea" name="textarea" defaultValue="Textarea value" />
                </div>
            </FormField>
        </fieldset>

        <hr className={styles.delimiter} />

        <button type="submit" className={styles.submitButton}>
            Submit (aka Print json)
        </button>
    </Forma>
);

function capitalize(value: string) {
    return value.slice(0, 1).toUpperCase() + value.slice(1);
}
