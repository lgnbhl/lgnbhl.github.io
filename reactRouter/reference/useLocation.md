# useLocation

<https://reactrouter.com/6.30.0/utils/location>

## Usage

``` r
useLocation(into, as = "children", selector = NULL, ...)
```

## Arguments

- into:

  A component (HTML tag or shiny.react-based element) that will receive
  the hook data as the specified prop.

- as:

  Character. The name of the component's prop to inject the hook data
  into (by default `"children"` for text display, `"rows"` for a data
  grid, `"value"` for an input).

- selector:

  Character. Optional key to extract from the hook data object. If
  `NULL` (the default), the entire data is passed.

- ...:

  Additional props to pass to the component.

## Details

Calls the `useLocation()` hook and injects the result (or a `selector`
from it) `as` a prop of the `into` component. Available selectors:
`pathname`, `search`, `hash`, `state`, `key`.
