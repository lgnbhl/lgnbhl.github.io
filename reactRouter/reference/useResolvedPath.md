# useResolvedPath

<https://reactrouter.com/6.30.0/hooks/use-resolved-path>

## Usage

``` r
useResolvedPath(into, as = "children", selector = NULL, to, ...)
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

- to:

  Character. The path to resolve.

- ...:

  Additional props to pass to the component.

## Details

Calls the `useResolvedPath()` hook and injects the result (or a
`selector` from it) `as` a prop of the `into` component. Returns
`pathname`, `search`, and `hash`.
