import { Forma, FormaList } from 'forma-react';
import React from 'react';

import { FormField } from '../components/FormField';
import * as styles from './Form.module.css';
import { FormProps } from './Form.types';

export const ConditionalForm: React.FC<FormProps> = (props) => {
    const [type, setType] = React.useState('task');

    return (
        <Forma onSubmit={props.onSubmit}>
            <FormField title="Task type" htmlFor="type">
                <div className={styles.formRow}>
                    <select
                        id="type"
                        name="type"
                        defaultValue={type}
                        className={styles.input}
                        onChange={(e) => setType(e.currentTarget.value)}
                    >
                        <option value="task">Task</option>
                        <option value="feature-request">Feature request</option>
                        <option value="error">Error</option>
                    </select>
                </div>
            </FormField>

            {type === 'task' ? <TaskFields /> : type === 'feature-request' ? <FeatureRequestFields /> : <ErrorFields />}

            <hr className={styles.delimiter} />

            <button type="submit" className={styles.submitButton}>
                Submit (aka Print json)
            </button>
        </Forma>
    );
};

function TaskFields() {
    return (
        <>
            <FormField title="Title" htmlFor="title">
                <div className={styles.formRow}>
                    <input
                        id="title"
                        name="title"
                        placeholder="Title"
                        className={styles.input}
                        autoComplete="off"
                        required
                    />
                </div>
            </FormField>

            <FormField title="Deadline" htmlFor="deadline">
                <div className={styles.formRow}>
                    <input
                        id="deadline"
                        name="deadline"
                        type="date"
                        placeholder="Deadline"
                        className={styles.input}
                        autoComplete="off"
                    />
                </div>
            </FormField>

            <FormField title="Task description" htmlFor="description">
                <div className={styles.formRow}>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="description"
                        className={styles.textarea}
                        autoComplete="off"
                    ></textarea>
                </div>
            </FormField>
        </>
    );
}

function FeatureRequestFields() {
    return (
        <>
            <FormField title="Title" htmlFor="title">
                <div className={styles.formRow}>
                    <input
                        id="title"
                        name="title"
                        placeholder="Title"
                        className={styles.input}
                        autoComplete="off"
                        required
                    />
                </div>
            </FormField>

            <FormField title="Task description" htmlFor="description">
                <div className={styles.formRow}>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="description"
                        className={styles.textarea}
                        autoComplete="off"
                    ></textarea>
                </div>
            </FormField>

            <FormField>
                <div className={styles.formRow}>
                    <label>
                        <input id="experiment" name="experiment" type="checkbox" />
                        As experiment
                    </label>
                </div>

                <div className={styles.formRow}>
                    <label>
                        <input id="design" name="design" type="checkbox" />
                        Need design
                    </label>
                </div>
            </FormField>
        </>
    );
}

function ErrorFields() {
    return (
        <>
            <FormField title="What happened?" htmlFor="title">
                <div className={styles.formRow}>
                    <input
                        id="title"
                        name="title"
                        placeholder="Write what happened (short)"
                        className={styles.input}
                        autoComplete="off"
                        required
                    />
                </div>
            </FormField>

            <FormField title="Priority" htmlFor="priority">
                <div className={styles.formRow}>
                    <select id="priority" name="priority" defaultValue="medium" className={styles.input}>
                        <option value="high">Hight</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
            </FormField>

            <FormField title="Stage" htmlFor="stage">
                <div className={styles.formRow}>
                    <select id="stage" name="stage" defaultValue="production" className={styles.input}>
                        <option value="production">Production</option>
                        <option value="testing">Testing</option>
                    </select>
                </div>
            </FormField>

            <FormField title="Describe in details" htmlFor="description">
                <div className={styles.formRow}>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Write here..."
                        className={styles.textarea}
                        autoComplete="off"
                    ></textarea>
                </div>
            </FormField>
        </>
    );
}
