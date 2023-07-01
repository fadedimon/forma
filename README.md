# Forma

Meet **forma**! Set of tooling for building forms with plain HTML and a little bit of sugar to support lists and complex structures.
Forma encourages a stateless approach for building HTML-forms. Meaning no redux, no special hooks, no useState unless you really need it. All you need to do is to structure html the way your json should look like. Forma will pick up values and build json for you.

Please check examples to find our more.

## Examples

If we need a plain json like `{ firstName: string, lastName: string }`, we can have it with a simple form:

```html
<form>
  <input name="firstName" />
  <input name="lastName" />
</form>
```

Probably, we don't even need anything to maintain forms like this.

But what if we need something more complex? For example, firstName and lastName should be nested in user property, some values should be listed, and some — organised as list of objects? Take a look at the following interface (it's typescript-ish):

```typescript
{
  "user": {
    "firstName": string;
    "lastName": string;
  };
  "tags": string[];
  "locations": {
      "city": string;
      "country": string;
  }[];
}
```

Forma allows to express this "json structure" with the following html:

```html
<form>
  <fieldset name="user">
    <input name="firstName" />
    <input name="lastName" />
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

Where `fieldset` elements are used for nesting values into objects, and naming elements with `[]` at the end pointing that values and objects should be organized as lists.
Addding more items with name `<input name="tags[]" />` will add another values to the lists. Same goes to `<fieldset name="locations[]" />`.

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

## Packages

### `forma-react`

This package delivers components to build forms in React ecosystem:

- `Forma` — root component, that extracts form data
- `FormaList` — litle-helper to easily form lists of data in your forms

[Check out forma-react package for details](./packages/forma-react/)

### `forma-core`

This is a core package (as name suggests), that does all the magic of extraction data from your html.

[Check out forma-core package for details](./packages/forma-core/)

## Roadmap

1. Setup docs website on github.io
2. Add guides and tips

I'm not sure if such solution for forms is needed for Vue, Svelte or Qwik, since the way state-management and data-binding is conventional over there.
But I don't know much about bothersome is it to build and manage forms in these eco-systems.
If you think or know otherwise, please let me know.

Please reach out to me with your ideas and suggestions to build a better and convenient tool for community.
