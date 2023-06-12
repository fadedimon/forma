import React from "react";
import "./App.css";
import { PlainForm } from "./forms/PlainForm";

type FormId = "plain";

const FORMS: { id: FormId; title: string; Component: React.ComponentType }[] = [
    {
        id: "plain",
        title: "PlainForm",
        Component: PlainForm,
    },
];

export const App: React.FC = () => {
    const [formId, setFormId] = React.useState<FormId>("plain");

    return (
        <div className="root">
            <nav className="nav">
                <h2 className="nav-title">Forms:</h2>
                <ul className="nav-list">
                    {FORMS.map((form) => (
                        <li
                            key={form.id}
                            className={`nav-list-item ${
                                form.id === formId
                                    ? "nav-list-item__active"
                                    : ""
                            }`}
                            onClick={() => setFormId(formId)}
                        >
                            {form.title} ✅
                        </li>
                    ))}
                </ul>
            </nav>

            <main className="content">
                <div className="content-inner">
                    <Form formId={formId} />
                </div>
            </main>
        </div>
    );
};

function Form(props: { formId: FormId }) {
    const form = FORMS.find((form) => form.id === props.formId);

    if (form) {
        return (
            <>
                <h2 className="content-title">{form.title}</h2>
                <div className="content-form">
                    <form.Component />
                </div>
            </>
        );
    }

    return null;
}
