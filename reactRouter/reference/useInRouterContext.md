# useInRouterContext

<https://api.reactrouter.com/v7/functions/react-router.useInRouterContext.html>

## Usage

``` r
useInRouterContext(into = NULL, as = "children", render = NULL, ...)
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

Calls the `useInRouterContext()` hook and injects the boolean result
`as` a prop of the `into` component. Useful inside reusable components
that may be rendered with or without a surrounding router – guard
router-only logic with this check before calling other hooks.
