# useSubmit

<https://api.reactrouter.com/v7/functions/react-router.useSubmit.html>

## Usage

``` r
useSubmit(into = NULL, as = "children", render = NULL, ...)
```

## Arguments

- into:

  A component (HTML tag or shiny.react-based element) that will receive
  the hook value as the specified prop.

- as:

  Character. The name of the component's prop to inject the hook value
  into. Defaults to `"children"`.

- render:

  Optional
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  function `(value) => ReactNode` used in place of `into`/`as`.

- ...:

  Additional props to pass to the component.

## Details

Calls the `useSubmit()` hook and passes the submit function to `render`
(or injects it `as` a prop of `into`). The submit function has signature
`submit(target, options?)` and triggers a form submission (including
calling the route's `action`) without requiring a
[`Form`](https://felixluginbuhl.com/reactRouter/reference/Form.md)
element. Only works inside a data router.

Because the hook returns a function (not a value), the `into` form is
rarely useful here – prefer `render = JS(...)` so you can call the
submit function from inside the rendered element.

## Examples

``` r
if (FALSE) { # \dontrun{
useSubmit(render = JS(
  "submit => <button onClick={() =>
     submit({ intent: 'delete' }, { method: 'post' })
   }>Delete</button>"
))
} # }
```
