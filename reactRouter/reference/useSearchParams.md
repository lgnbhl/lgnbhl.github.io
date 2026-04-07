# useSearchParams

<https://reactrouter.com/6.30.0/hooks/use-search-params>

## Usage

``` r
useSearchParams(into, as = "children", param = NULL, ...)
```

## Arguments

- into:

  A component that will receive the value.

- as:

  Character. The name of the component's prop to inject into.

- param:

  Character. Optional name of a single query parameter to extract (e.g.
  `"q"`). If `NULL`, all params are passed as a named list.

- ...:

  Additional props to pass to the component.

## Details

Calls the `useSearchParams()` hook and injects the result `as` a prop of
the `into` component. Use the `param` argument to extract a single query
parameter by name.
