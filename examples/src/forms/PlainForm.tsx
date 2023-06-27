import { Forma, FormaList } from 'forma-react';
import React from 'react';

import { FormField } from '../components/FormField';
import * as styles from './Form.module.css';
import { FormProps } from './Form.types';

export const PlainForm: React.FC<FormProps> = (props) => (
    <Forma
        onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(e);
        }}
    >
        <FormField title="First name" htmlFor="firstName">
            <div className={styles.formRow}>
                <input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    className={styles.input}
                    autoComplete="off"
                    required
                />
            </div>
        </FormField>

        <FormField title="Last name" htmlFor="lastName">
            <div className={styles.formRow}>
                <input name="lastName" placeholder="Second name" className={styles.input} autoComplete="off" required />
            </div>
        </FormField>

        <FormField title="Age" htmlFor="age">
            <div className={styles.formRow}>
                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    className={styles.input}
                    autoComplete="off"
                    required
                />
            </div>
        </FormField>

        <FormField title="Tags">
            <FormaList name="tags" defaultItems={[]} emplyListPolicy="none" getItemId={() => ''}>
                {(list) => (
                    <>
                        {list.items.map((item) => (
                            <div key={item.id} className={styles.formRow}>
                                <input name="tags[]" placeholder="Tag" className={styles.input} />
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => list.remove(item.id)}
                                >
                                    🗑
                                </button>
                            </div>
                        ))}

                        <button type="button" className={styles.addButton} onClick={list.add}>
                            Add tag
                        </button>
                    </>
                )}
            </FormaList>
        </FormField>

        <FormField title="Locations">
            <FormaList name="locations" defaultItems={[]} emplyListPolicy="none" getItemId={() => ''}>
                {(list) => (
                    <>
                        {list.items.map((item, i) => (
                            <fieldset key={item.id} name="locations[]" className={styles.fieldSet}>
                                <legend>Location #{i + 1}</legend>

                                <div className={styles.formRow}>
                                    <input
                                        name="city"
                                        placeholder="City"
                                        className={styles.input}
                                        autoComplete="off"
                                        required
                                    />
                                </div>

                                <div className={styles.formRow}>
                                    <input
                                        name="country"
                                        placeholder="Country"
                                        className={styles.input}
                                        autoComplete="off"
                                        required
                                    />
                                </div>

                                <div className={styles.formRow}>
                                    <button
                                        type="button"
                                        className={styles.removeButton}
                                        onClick={() => list.remove(item.id)}
                                    >
                                        🗑
                                    </button>
                                </div>
                            </fieldset>
                        ))}

                        <button type="button" className={styles.addButton} onClick={list.add}>
                            Add location
                        </button>
                    </>
                )}
            </FormaList>
        </FormField>

        <FormField title="About you" htmlFor="about">
            <div className={styles.formRow}>
                <textarea
                    id="about"
                    name="about"
                    placeholder="Please tell us about yourself"
                    className={styles.textarea}
                    required
                />
            </div>
        </FormField>

        <hr className={styles.delimiter} />

        <button type="submit" className={styles.submitButton}>
            Submit (aka Print json)
        </button>
    </Forma>
);
