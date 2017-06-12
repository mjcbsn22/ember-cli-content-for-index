# Ember CLI Content for Index

Automatically include HTML snippets in your Ember CLI index.html files.

## Installation

```sh
ember install ember-cli-content-for-index
```

## Usage

To have a block of HTML included in your Ember CLI build's generated `index.html` or `tests/index.html` file simply place a file named after one of Ember CLI's `content-for` hooks with an extension of `.html` in a directory named `snippets` in your project's `lib` directory.

For example, to have a block of code included in the `head` of both the `index.html` and `tests/index.html` it would be named `lib/snippets/head.html`.

### Content-for types

The snippets should be named according to the named types that are passed to `{{content-for}}` helper used by Ember CLI in your project's `index.html` files. These are:
- `head`
- `head-footer`
- `body`
- `body-footer`
- `test-head`
- `test-head-footer`
- `test-body`
- `test-body-footer`

### Environment-Specific Snippets

You may also wish to include a snippet only in a specific environment. To do so just place in a sub-directory of `lib/snippets` named after that environment. For example to have a snippet included in the `body` only in a production build place it in `lib/snippets/production/body.html`.

### Configurable Snippets Directory

You may override the path of the directory from which snippets are pulled. For example, to pull snippets from your project's `foo` directory, add the following app's environment configuration:

```js
// config/environment.js
...
ENV['ember-cli-content-for-index'] = {
    directory: 'foo'
};
```
