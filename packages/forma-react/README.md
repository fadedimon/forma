# forma-react

`forma-react` is a library for building forms with plain HTML and a little bit of sugar to support lists and nesting.

Forma encourages a stateless approach for building HTML-forms.
Meaning no redux, no hooks, no useState-s or whatever unless **you** need it.
All you need to do is to structure html the way your data should look like.
Forma will pick up values and build it for you.

## Installation

Depending on package-manager, install package with one of the following commands:

- `npm install forma-react --save`
- `yarn add forma-react`

## Usage example

All you need to do is to structure you elements inside `Forma` component to represent data-structure you need.

Imagine this form:

```jsx
import { Forma } from 'forma-react';

const BlogPostForm = () => (
  <Forma onSubmit={(e, data) => console.log(data)}>
    <input name="title" />
    <textarea name="text" />
    <input name="tags[]" />
    <fieldset name="relatedArticles[]">
      <input name="url" type="url" />
      <input name="title" />
    </fieldset>
    <button type="submit">Submit</button>
  </Forma>
);
```

When submitted, `Forma` will add second argument with form data to `submit` event.
Its content is represented by the following structure (typescript-ish):

```ts
{
  title: string;
  text: string;
  tags: string[];
  relatedArticles: {
    url: string;
    title: string;
  }[];
}
```

## Basic concepts

Main idea is simpler the better, and rest comes from it.
No complex components, no complex concepts.
Forma looks for basic form elements like inputs, selects and textareas, collects their values and builds form data based on their `name` attributes and nesting based on their parent `<fieldset>` elements.

For example:

```jsx
<Forma>
  <input name="firstName" />
  <input name="lastName" />
</Forma>
```

Output:

```ts
{
  firstName: string;
  lastName: string;
}
```

**Nesting**

For nesting elements, just wrap them in `<fieldset>` elements

For example:

```jsx
<Forma>
  <fieldset name="user">
    <input name="firstName" />
    <input name="lastName" />
  </fieldset>
</Forma>
```

Output:

```ts
{
  user: {
    firstName: string;
    lastName: string;
  }
}
```

**Lists**

To have lists, just add `[]` at the end of element's `name` properties.
Doesn't matter how many elements there are with this name (one or many), their values will be grouped by names into lists

For example:

```jsx
<Forma>
  <input name="tags[]" />
  <fieldset name="user[]">
    <input name="firstName" />
    <input name="lastName" />
  </fieldset>
</Forma>
```

Output:

```ts
{
  tags: string[];
  user: {
    firstName: string;
    lastName: string;
  }[];
}
```

## Validation

Forma doesn't give any advice how to validate forms, no built-in solution to keep things simple.
It seems appropriate to let browser do all the job by using proper input types, "required" and "pattern" attributes.
But any other validation can be performed.
Again — you choose, what is best for your project.

Please refer to [MDN's Client-Side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) article to find out more what kind of validation browsers provide out of the box.

## How form elements are treated

**Please note**, that elements without `required` attribute should be "optional" in your expectations, because if they're not holding value, they will be skipped by Forma

| Code                             | Value type | Comment                                                                 |
| -------------------------------- | ---------- | ----------------------------------------------------------------------- |
| **Input elements**               |            |                                                                         |
| `<input type="checkbox" />`      | `boolean`  | -                                                                       |
| `<input type="number" />`        | `number`   | -                                                                       |
| `<input type="range" />`         | `number`   | -                                                                       |
| `<input type="file" />`          | `FileList` | This type of input is always singular                                   |
| `<input type="file" multiple />` | `FileList` | -                                                                       |
| `<input type="*" />`             | `string`   | Input types, that are not mentioned above are always treated as strings |
| **Select elements**              |            |                                                                         |
| `<select />`                     | `string`   | -                                                                       |
| `<select multiple />`            | `string[]` | -                                                                       |
| **Textarea elements**            |            |                                                                         |
| `<textarea />`                   | `string`   | -                                                                       |

## Contents

### `Forma` Component

This is a root form component, it renders `<form>` element and allows to pass all props you want, but it adds second arguments to `onSubmit`, `onChange` and `onInput` callbacks with form data as object.

```jsx
import { Forma } from 'forma-react';

const YourForm = (props) => (
  <Forma
    onInput={(e, data) => console.log('onInput:', data)}
    onChange={(e, data) => console.log('onChange:', data)}
    onSubmit={(e, data) => console.log('onSubmit:', data)}
  >
    {/* elements*/}
  </Forma>
);
```

**Additional props:**

| Name            | Type      | Description                                                                                 | Default value |
| --------------- | --------- | ------------------------------------------------------------------------------------------- | ------------- |
| `preventSubmit` | `boolean` | Prevents submit event. To handle prevention manually, you can pass `false` to this property | `true`        |

### `FormaList` Component

This is a component for building lists of items in a form. It can be used for "simple" elements as well as for complex (structured) ones. It helps to show lists of items, and gives methods to remove and add new ones.

Example:

```jsx
import { Forma, FormaList } from 'forma-react';

interface YourFormProps {
  locations: {
    city: string,
    country: string,
  }[];
}

const YourForm: FC<YourFormProps> = (props) => (
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
```

**`FormaListProps` description**

| Name           | Type                                                          | Description                                                                           | Default value |
| -------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------- |
| `name`         | `string`                                                      | Name of the list. It will be used to generate id for new items.                       | -             |
| `defaultItems` | `T[]`                                                         | List of current items in your data to populate this list.                             | -             |
| `getItemId`    | `(item: T) => string;`                                        | Function that recieves item from `defaultItems` in first argument and returns its id. | -             |
| `children`     | `(params: FormaListChildParams<T>) => ReactElement<any, any>` | Render function. See its `params` description below.                                  | -             |
| `allowEmpty`   | `boolean`                                                     | Tells how to handle empty list.                                                       | `true`        |

Where `T` is an interface of an item of `defaultItems` property

**`FormaListChildParams<T>` description**

| Name     | Type                            | Descrition                                                                                              |
| -------- | ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `items`  | `FormaListChildItemParams<T>[]` | List of items this FormaList contains.                                                                  |
| `add`    | `() => void`                    | Add new item to list of items. New items will have generated id based on `FormaListProps['name]` value. |
| `remove` | `(id) => void`                  | Removes item.                                                                                           |

**`FormaListChildItemParams<T>` description**

| Name    | Type        | Descrition                                                      |
| ------- | ----------- | --------------------------------------------------------------- |
| `id`    | `string`    | Item's id.                                                      |
| `isNew` | `boolean`   | Tells if it is a new item or existed, passed in `defaultItems`. |
| `data`  | `T \| void` | Item's data. If item is new, it will be empty                   |
