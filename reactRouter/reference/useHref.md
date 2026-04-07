# useHref

<https://reactrouter.com/6.30.0/hooks/use-href>

## Usage

``` r
useHref(into, as = "children", to, ...)
```

## Arguments

- into:

  A component that will receive the value.

- as:

  Character. The name of the component's prop to inject into.

- to:

  Character. The path to resolve.

- ...:

  Additional props to pass to the component.

## Details

Calls the `useHref()` hook and injects the resolved href string `as` a
prop of the `into` component.
