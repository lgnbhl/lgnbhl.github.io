# useSearchParams

<https://api.reactrouter.com/v7/functions/react-router.useSearchParams.html>

## Usage

``` r
useSearchParams(into = NULL, as = "children", param = NULL, render = NULL, ...)
```

## Arguments

- into:

  A component (HTML tag or shiny.react-based element) that will receive
  the hook data as the specified prop.

- as:

  Character. The name of the component's prop to inject the hook data
  into (by default `"children"` for text display, `"rows"` for a data
  grid, `"value"` for an input).

- param:

  argument to extract a single query parameter by name.

- render:

  Optional
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  function `(value) => ReactNode` used in place of `into`/`as`. Mirrors
  the native React Router pattern for cases where a single prop is not
  expressive enough (e.g. `` JS("v => `${v.first} ${v.last}`") ``).

- ...:

  Additional props to pass to the component.

## Details

Calls the `useSearchParams()` hook and injects the result `as` a prop of
the `into` component. Use the `param` argument to extract a single query
parameter by name.
