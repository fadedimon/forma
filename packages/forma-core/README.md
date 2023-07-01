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
