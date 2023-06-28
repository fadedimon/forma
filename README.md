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

## Packages

### `forma-react`

[Visit forma-react package to find out more](./packages/forma-react/)

### `forma-core`

[Visit forma-react package to find out more](./packages/forma-core/)
