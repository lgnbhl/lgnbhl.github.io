# useHref

<https://api.reactrouter.com/v7/functions/react-router.useHref.html>

## Usage

``` r
useHref(into = NULL, as = "children", to, render = NULL, ...)
```

## Arguments

- into:

  A component (HTML tag or shiny.react-based element) that will receive
  the hook data as the specified prop.

- as:

  Character. The name of the component's prop to inject the hook data
  into (by default `"children"` for text display, `"rows"` for a data
  grid, `"value"` for an input).

- to:

  Character. The path to resolve.

- render:

  Optional
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  function `(value) => ReactNode` used in place of `into`/`as`. Mirrors
  the native React Router pattern for cases where a single prop is not
  expressive enough (e.g. `` JS("v => `${v.first} ${v.last}`") ``).

- ...:

  Additional props to pass to the component.

## Details

Calls the `useHref()` hook and injects the resolved href string `as` a
prop of the `into` component.
