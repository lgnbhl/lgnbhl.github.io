# useNavigationType

<https://api.reactrouter.com/v7/functions/react-router.useNavigationType.html>

## Usage

``` r
useNavigationType(into = NULL, as = "children", render = NULL, ...)
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

Calls the `useNavigationType()` hook and injects the result `as` a prop
of the `into` component. Returns one of `"POP"`, `"PUSH"`, or
`"REPLACE"`.
