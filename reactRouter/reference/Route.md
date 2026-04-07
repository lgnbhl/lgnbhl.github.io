# Route

<https://reactrouter.com/6.30.0/components/route>

## Usage

``` r
Route(..., element, loader = NULL, key = uuid::UUIDgenerate())
```

## Arguments

- ...:

  Props to pass to element.

- element:

  element wrapped in a \`shiny::div()\`.

- loader:

  Optional. Can be: - A data.frame or list: serialized as a static JS
  loader - An R function: called at build time (no params available) - A
  JS() expression: passed through as-is

- key:

  By default uses a UUID key in the \`div()\` of the \`element\` arg.

## Value

A Route component.

## Details

Internally the \`element\` is wrapped in a \`shiny::div()\` with a UUID
key so, in case R shiny is used, shiny can differentiate each element.
