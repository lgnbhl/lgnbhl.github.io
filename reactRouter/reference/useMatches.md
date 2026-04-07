# useMatches

<https://reactrouter.com/6.30.0/hooks/use-matches>

## Usage

``` r
useMatches(into, as = "children", selector = NULL, ...)
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

Calls the `useMatches()` hook and injects the result (or a `selector`
extracted from each match) `as` a prop of the `into` component. Only
works inside a data router.
