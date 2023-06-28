# forma-core

This package provides utility for data extraction from HTML Form elements.

## Installation

`npm install forma-core --save`

## Usage example

```
import { extractFormData } from 'forma-core'

const formElem = document.getElementByTagName('form');
const data = extractFormData(formElem);

console.log(data) // { ... } — Object with form's content
```

## How form elements are treated

| Code                        | Value      | Comment                                                                        |
| --------------------------- | ---------- | ------------------------------------------------------------------------------ |
| **Input elements**          |            | All input element's values are string, except `checkbox`, `number` and `range` |
| `<input type="checkbox" />` | `boolean`  | -                                                                              |
| `<input type="number" />`   | `number`   | -                                                                              |
| `<input type="range" />`    | `number`   | -                                                                              |
| `<input type="radio" />`    | `string`   | -                                                                              |
| `<input type="*"  />`       | `string`   | -                                                                              |
| **Select elements**         |
| `<select />`                | `string`   | -                                                                              |
| `<select multiple />`       | `string[]` | -                                                                              |
| **Textarea elements**       |
| `<textarea />`              | `string`   | -                                                                              |

## Nesting

To nest data, just wrap form elements with `<fieldset>` element.

Example:

```jsx
<fieldset name="user">
  <input name="firstName" />
  <input name="secondName" />
</fieldset>
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

If you add `id` attribute to `<fieldset>` element, it will be added to resulted form data.

Example:

```jsx
<fieldset name="user" id="<% SOME_ID %>">
  <input name="firstName" />
  <input name="secondName" />
</fieldset>
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

## Lists

To get lists , just add `[]` at the end of elements name. No matter how many elements with this name there is (one or many), their data will be joined into list.

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
  tags: Array<string>;
  user: Array<{
    firstName: string;
    secondName: string;
  }>;
}
```
