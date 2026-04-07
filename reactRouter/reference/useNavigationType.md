# useNavigationType

<https://reactrouter.com/6.30.0/hooks/use-navigation-type>

## Usage

``` r
useNavigationType(into, as = "children", ...)
```

## Arguments

- into:

  A component that will receive the value.

- as:

  Character. The name of the component's prop to inject into.

- ...:

  Additional props to pass to the component.

## Details

Calls the `useNavigationType()` hook and injects the result `as` a prop
of the `into` component. Returns one of `"POP"`, `"PUSH"`, or
`"REPLACE"`.
