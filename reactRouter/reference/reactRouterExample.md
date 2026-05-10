# Run reactRouterExample example

Launch a Shiny example app or list the available examples. Use
\`reactRouter::reactRouterExample("basic")\` to run a showcase app.

## Usage

``` r
reactRouterExample(example = NULL, ...)
```

## Arguments

- example:

  The name of the example to run, or \`NULL\` to print and invisibly
  return the list of available examples.

- ...:

  Additional arguments to pass to \`shiny::runApp()\`.

## Value

When \`example\` is \`NULL\`, invisibly returns a character vector of
example names (also printed via \`message()\`). Otherwise this function
normally does not return; interrupt R to stop the application (usually
by pressing Ctrl+C or Esc).

## See also

[`shiny.blueprint::runExample()`](https://rdrr.io/pkg/shiny.blueprint/man/runExample.html),
which this function is adapted from.
