import { Forma, FormaList } from 'forma-react';
import React from 'react';

import { FormField } from '../components/FormField';

export const PlainForm: React.FC = () => (
    <Forma
        onSubmit={(e) => {
            e.preventDefault();
            console.log('Form submitted');
        }}
    >
        <FormField title="First name" htmlFor="firstName">
            <input id="firstName" name="firstName" placeholder="First name" required />
        </FormField>

        <FormField title="Last name" htmlFor="firstName">
            <input name="lastName" placeholder="Second name" required />
        </FormField>

        <FormField title="Tags">
            <FormaList name="tags" defaultItems={[]} getItemId={() => ''}>
                {(list) => (
                    <>
                        {list.items.map((item) => (
                            <div key={item.id}>
                                <input name="tags[]" placeholder="Tag" />
                                <button type="button" onClick={() => list.remove(item.id)}>
                                    remove
                                </button>
                            </div>
                        ))}

                        <button type="button" onClick={list.add}>
                            Add tag
                        </button>
                    </>
                )}
            </FormaList>
        </FormField>

        <FormField title="Locations">
            <FormaList name="locations" defaultItems={[]} getItemId={() => ''}>
                {(list) => (
                    <>
                        {list.items.map((item, i) => (
                            <fieldset key={item.id} name="locations[]" id={item.id}>
                                <legend>Location #{i + 1}</legend>
                                <input name="city" placeholder="City" required />
                                <br />
                                <input name="country" placeholder="Country" required />
                                <br />
                                <button type="button" onClick={() => list.remove(item.id)}>
                                    remove
                                </button>
                            </fieldset>
                        ))}

                        <button type="button" onClick={list.add}>
                            Add location
                        </button>
                    </>
                )}
            </FormaList>
        </FormField>

        <FormField title="About you" htmlFor="about_you">
            <textarea id="about_you" name="about_you" placeholder="Please tell us about yourself" required />
        </FormField>

        <hr />

        <button type="submit">Submit (aka Print json)</button>
    </Forma>
);
