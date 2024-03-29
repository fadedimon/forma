import React from 'react';
import ReactJson from 'react-json-view';

import './App.css';
import { FormLayout } from './components/FormLayout';
import { ConditionalForm } from './forms/ConditionalForm';
import { ElementsForm } from './forms/ElementsForm';
import { PlainForm } from './forms/PlainForm';

interface FormConfigItem {
    id: string;
    title: string;
    Component: React.FC<{
        onSubmit(data: Record<string, unknown>): void;
    }>;
}

const FORMS: FormConfigItem[] = [
    {
        id: 'plain',
        title: 'Plain',
        Component: (props) => <PlainForm onSubmit={props.onSubmit} />,
    },
    {
        id: 'conditional',
        title: 'Conditional',
        Component: (props) => <ConditionalForm onSubmit={props.onSubmit} />,
    },
    {
        id: 'elements',
        title: 'Elements',
        Component: (props) => <ElementsForm onSubmit={props.onSubmit} />,
    },
];

export const App: React.FC = () => {
    const [formId, setFormId] = React.useState<string>('elements');

    return (
        <div className="root">
            <nav className="nav">
                <h2 className="nav-title">Form examples:</h2>
                <ul className="nav-list">
                    {FORMS.map((form) => (
                        <li
                            key={form.id}
                            className={`nav-list-item ${form.id === formId ? 'nav-list-item__active' : ''}`}
                            onClick={() => setFormId(form.id)}
                        >
                            {form.title} {form.id === formId ? '✅' : ''}
                        </li>
                    ))}
                </ul>
            </nav>

            <main className="content">
                <div className="content-inner">
                    <Form formId={formId} key={formId} />
                </div>
            </main>
        </div>
    );
};

function Form(props: { formId: string }) {
    const form = FORMS.find((form) => form.id === props.formId);
    const [json, setJson] = React.useState({});

    return form ? (
        <FormLayout
            title={`${form.title} form`}
            form={<form.Component onSubmit={setJson} />}
            output={<ReactJson src={json} theme="summerfruit:inverted" />}
        />
    ) : null;
}
