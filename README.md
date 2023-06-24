# Forma

Meet **forma**! Set of tooling for building forms with plain HTML and a little bit of sugar to support lists and complex structures.
Forma encourages a stateless approach for building HTML-forms. Meaning no redux, no special hooks, no useState unless you really need it. All you need to do is to structure html the way your json should look like. Forma will pick up values and build json for you.

Please check examples to find our more.

## Examples

If we need a plain json like `{ title: string, name: string }`, we can have it with a simple form:

```html
<form>
  <input name="title" />
  <input name="name" />
</form>
```

Probably, we don't even need anything to maintain forms like this.

But what if we need something more complex? For example, title and name should be nested in property user, some values should be nested, and some should be organised as list of objects? Take a look at the following interface (it's typescript-ish):

```typescript
{
  "user": {
    "title": string;
    "name": string;
  };
  "tags": string[];
  "locations": {
      "city": string;
      "country": string;
  }[];
}
```

Forma allows us to express this "json structure" with the following html:

```html
<form>
  <fieldset name="user">
    <input name="title" />
    <input name="name" />
  </fieldset>

  <input name="tags[]" />
  <input name="tags[]" />

  <fieldset name="locations[]">
    <input name="city" />
    <input name="country" />
  </fieldset>
  <fieldset name="locations[]">
    <input name="city" />
    <input name="country" />
  </fieldset>
</form>
```

Where `fieldset` elements are used to collect values into objects, and name property ending with `[]` is pointing, that values or objects should be represented as lists.
Addding more items with name `<input name="tags[]" />` will add another value to the list. Same goes to `<fieldset name="locations[]" />`.

## Quick start

```
npm install forma-react --save
```

## Packages

### `forma-react`

Contains:

#### Component `Forma`

Usage:

```jsx
import { Forma } from 'forma-react';

export const YourForm = (props) => {
  return <Forma onSubmit={(e) => console.log(e.json)}>...</Forma>;
};
```

#### Component `FormaList`

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
              <fieldset key={item.id} name="locations[]" id={item.id}>
                <input name="city" defaultValue={item.data.city} />
                <input name="country" defaultValue={item.data.country} />
                <button type="button" onClick={() => locations.remove(item.id)}>
                  Remove location
                </button>
              </fieldset>
            ))}
            <button type="button" onClick={locations.add}>
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

| Prop name         | Interface                                           | Description                                                                                                                                     |
| ----------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`            | `string`                                            | Name of the list. It will be used for temp ids generation for new list elements. Like `locations~new~0`, where `locations` is the provided name |
| `defaultItems`    | `T[]`                                               | List of current items in your data to populate this list                                                                                        |
| `getItemId`       | `(item: T) => string;`                              | Function that recieves item from `defaultItems` in first argument and returns its id                                                            |
| `emplyListPolicy` | `none`, `at-least-one`                              | Tells how to handle empty list. `none` — return empty list. `at-least-one` — return at least one item. Default is `none`                        |
| `children`        | `(list: FormListProp<T>) => ReactElement<any, any>` | Render function that recieves item from `defaultItems` in first argument and returns its id                                                     |
