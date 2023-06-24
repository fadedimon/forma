import { Forma, FormaList } from 'forma-react';
import React from 'react';
import ReactJson from 'react-json-view';

import { FormField } from '../components/FormField';
import * as styles from './Form.module.css';

export const PlainForm: React.FC = () => (
    <div className={styles.layout}>
        <Forma
            className={`${styles.form} ${styles.layoutForm}`}
            onSubmit={(e) => {
                e.preventDefault();
                console.log('Form submitted');
            }}
        >
            <FormField title="First name" htmlFor="firstName">
                <input id="firstName" name="firstName" placeholder="First name" className={styles.input} required />
            </FormField>

            <FormField title="Last name" htmlFor="firstName">
                <input name="lastName" placeholder="Second name" className={styles.input} required />
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
                <FormaList name="locations" defaultItems={[]} emplyListPolicy="at-least-one" getItemId={() => ''}>
                    {(list) => (
                        <>
                            {list.items.map((item, i) => (
                                <fieldset key={item.id} name="locations[]" id={item.id} className={styles.fieldSet}>
                                    <legend>Location #{i + 1}</legend>
                                    <div className={styles.formRow}>
                                        <input name="city" placeholder="City" className={styles.input} required />
                                        {list.items.length > 1 && (
                                            <button
                                                type="button"
                                                className={styles.removeButton}
                                                onClick={() => list.remove(item.id)}
                                            >
                                                🗑
                                            </button>
                                        )}
                                    </div>
                                    <div className={styles.formRow}>
                                        <input name="country" placeholder="Country" className={styles.input} required />
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

            <FormField title="About you" htmlFor="about_you">
                <textarea
                    id="about_you"
                    name="about_you"
                    placeholder="Please tell us about yourself"
                    className={styles.textarea}
                    required
                />
            </FormField>

            <hr className={styles.delimiter} />

            <button type="submit" className={styles.submitButton}>
                Submit (aka Print json)
            </button>
        </Forma>
        <div className={styles.layoutJson}>
            <h2 className={styles.layoutTitle}>Form data:</h2>
            <ReactJson
                src={{
                    user: {
                        name: '123',
                        surname: '123432',
                    },
                }}
                theme="summerfruit:inverted"
            />
        </div>
    </div>
);
