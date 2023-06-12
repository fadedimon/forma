# Forma

Meet **forma**! Set of tooling for building forms with plain HTML and a little bit of sugar to support lists and complex structures.
Forma encourages a stateless approach for building HTML-forms. Meaning no redux, no special hooks, no useState unless you really need it. All you need to do is to structure html the way your json should look like. Forma will pick up values and build json for you.

Please check examples to find our more.

## Examples

If you need plain json like `{ title: string, name: string }`, we can have this html:

```html
<form>
  <input name="title" />
  <input name="name" />
</form>
```

Probably, we don't need anything to maintain forms like this. But what if we need something more complex? For example, title and name should be nested in some property, some values should be nested, and some should be organised as list of objects?

Take a look at the following json interface (it's typescript-ish):

```typescript
{
  user: {
    title: string;
    name: string;
  };
  skills: string[];
  locations: {
      city: string;
      country: string;
  }[];
}
```

Forma allows us to express this "json structure" in the following manner:

```html
<form>
  <fieldset name="applicant">
    <input name="title" />
    <input name="name" />
  </fieldset>

  <input name="skills[]" />
  <button type="button">Add skill</button>

  <fieldset name="locations[]">
    <input name="city" />
    <input name="country" />
  </fieldset>
  <button type="button">Add location</button>
</form>
```

Where `fieldset` elements are used to collect values into objects, and name property ending with `[]` is pointing that this value or objects should be represented as lists.
When user clicks on "Add skill" button, form should render one more `<input name="skills[]" />` element and its value will be added to `skills` property. Same is valid for `<fieldset name="locations[]" />`

## Quick start

```
npm install forma-react --save
```

## Packages

### `forma-core`

todo

### `forma-react`

Contains:

#### `Forma`

Usage:

```jsx
import { Forma } from 'forma-react';

export const YourForm = (props) => {
  return <Forma onSubmit={props.onSubmit}>...</Forma>;
};
```

#### `FormaList`

Is a helper component for building lists in form.

Can be used outside of Forma element

Usage:

```jsx
export const YourForm = (props) => {
  return (
    <Forma>
      ...
      <FormaList name="locations" defaultItems={props.locations} getItemId={(location) => location.id}>
        {(locations) => (
          <>
            {locations.items.map((item) => (
              <fieldset key={item.id} name="locations[]" id={item.removed ? undefined : item.id}>
                <input name="city" defaultValue={item.data.city} />
                <input name="country" defaultValue={item.data.country} />
                <button type="button" onClick={() => locations.removeItemCompletely(item.id)}>
                  Remove location
                </button>
              </fieldset>
            ))}
            <button type="button" onClick={locations.addItem}>
              Add location
            </button>
          </>
        )}
      </FormaList>
    </Forma>
  );
};
```

**FormaList props**

| Prop name      | Interface                                           | Description                                                                                                                                     |
| -------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`         | `string`                                            | Name of the list. It will be used for temp ids generation for new list elements. Like `locations~new~0`, where `locations` is the provided name |
| `defaultItems` | `T[]`                                               | List of current items in your data to populate this list                                                                                        |
| `getItemId`    | `(item: T) => string;`                              | Function that recieves item from `defaultItems` in first argument and returns its id                                                            |
| `children`     | `(list: FormListProp<T>) => ReactElement<any, any>` | Render function that recieves item from `defaultItems` in first argument and returns its id                                                     |
