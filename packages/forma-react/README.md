# forma-react

`forma-react` is a library for building forms with plain HTML and a little bit of sugar to support lists and nesting.
Forma encourages a stateless approach for building HTML-forms. Meaning no redux, no hooks or whatever, no useState-s unless **you** need it.
All you need to do is to structure html the way your data should look like. Forma will pick up values and build it for you.

## Installation

Depending on package-manager you use:

- `npm install forma-react --save`
- `yarn add forma-react`

## Usage example

All you need to do is to structure you elements inside `Forma` component to represent data-structure you need.

Imagine this form:

```jsx
import { Forma } from 'forma-react';

export const BlogPostForm = () => (
  <Forma onSubmit={e => console.log(e.data)} >
    <input name="title" />
    <textarea name="text" />
    <input name="tags[]" />
    <fieldset name="relatedArticles[]">
      <input name="url" type="url />
      <input name="title" />
    </fieldset>
    <button type="submit">Submit</button>
  </Forma>
);
```

When submitted, `Forma` will add `data` property to `submit` event,
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

Main idea is to give developers full control over their components.
Forma just extracts data from `<form>` html element, and structures it the way form's children elements are.
With a little bit of sugar you can get nesting and lists.

Forma is looking for standart form elements and builds data based on their `name` attributes and their nesting inside parent form.

For example:

```jsx
<Forma>
  <input name="firstName" />
  <input name="secondName" />
</Forma>
```

Output:

```ts
{
  firstName: string;
  secondName: string;
}
```

**Nesting**

For nesting, just wrap form elements into `<fieldset>` element.

For example:

```jsx
<Forma>
  <fieldset name="user">
    <input name="firstName" />
    <input name="secondName" />
  </fieldset>
</Forma>
```

Output:

```ts
{
  user: {
    firstName: string;
    secondName: string;
  }
}
```

**Lists**

To get lists , just add `[]` at the end of elements name. No matter how many elements there is with this name (one or many), their data will be joined into list

For example:

```jsx
<Forma>
  <input name="tags[]" />
  <fieldset name="user[]">
    <input name="firstName" />
    <input name="secondName" />
  </fieldset>
</Forma>
```

Output:

```ts
{
  tags: string[];
  user: {
    firstName: string;
    secondName: string;
  }[];
}
```

## How form elements are treated

To find out how form elements are treated, [check README](../forma-core/README.md) of `forma-core` package.

## Contents

### `Forma` Component

This is a root form component, it renders `<form>` element with all properties you pass into it. All it does, is adds `data` property to `input`, `change` and `submit` events.

```jsx
import { Forma } from 'forma-react';

export const YourForm = (props) => {
  return <Forma onSubmit={(e) => console.log(e.json)}>{/* elements*/}</Forma>;
};
```

Additional props:

| Name            | Type      | Description                                                                                 | Default value |
| --------------- | --------- | ------------------------------------------------------------------------------------------- | ------------- |
| `preventSubmit` | `boolean` | Prevents submit event. To handle prevention manually, you can pass `false` to this property | `true`        |

### `FormaList` Component

`FormaList` is a component for building lists of items in a form. It can be used for "simple" elements as well as for structured ones. It allows to display list items, remove and add new ones.

Example:

```jsx
import { Forma, FormaList } from 'forma-react';

interface YourFormProps {
  locations: {
    city: string,
    country: string,
  }[];
}

export const YourForm: FC<YourFormProps> = (props) => (
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
