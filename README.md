# DotDash

Application and dashboard UI library.

## Rules

1. Elements with variations may have the `is` attribute. E.g. `<button is="icon-button">`
2. Elements with only one use are core/custom elements. E.g. `<select>`, `<icon>`

## Why the rules

1. keeping a11y and semantics whilst keeping boilerplate/element nesting to a minimum.
2. interactive elements such as buttons can have multiple uses, using an attribute rather than seperate custom-elements or wrapper elements is much better.
