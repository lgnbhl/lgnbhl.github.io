# useMatch

<https://reactrouter.com/6.30.0/hooks/use-match>

## Usage

``` r
useMatch(into, as = "children", selector = NULL, pattern, ...)
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

- pattern:

  Character. The path pattern to match against (e.g. `"/products/:id"`).

- ...:

  Additional props to pass to the component.

## Details

Calls the `useMatch()` hook and injects the result (or a `selector` from
it) `as` a prop of the `into` component. Returns `NULL` if no match.
