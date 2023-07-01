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

**Please note**, that elements without `required` attribute should be "optional" in your expectations, 'cause if they're not holding value, they will be skipped

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

## Nesting

To nest data, just wrap form elements with `<fieldset>` element.

Example:

```jsx
<fieldset name="user">
  <input name="firstName" required />
  <input name="lastName" required />
</fieldset>
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

If you add `id` attribute to `<fieldset>` element, it will be added to resulted form data.

Example:

```jsx
<fieldset name="user" id="<% SOME_ID %>">
  <input name="firstName" required />
  <input name="lastName" required />
</fieldset>
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

## Lists

To get lists , just add `[]` at the end of elements name. No matter how many elements with this name there is (one or many), their data will be joined into list.

For example:

```jsx
<Forma>
  <input name="tags[]" required />
  <fieldset name="user[]">
    <input name="firstName" required />
    <input name="lastName" required />
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
