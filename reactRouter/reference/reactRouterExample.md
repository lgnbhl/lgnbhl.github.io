# Run reactRouterExample example

Launch a Shiny example app or list the available examples. Use
\`reactRouter::reactRouterExample("basic")\` to run a showcase app.

## Usage

``` r
reactRouterExample(example = NULL, ...)
```

## Arguments

- example:

  The name of the example to run, or \`NULL\` to retrieve the list of
  examples.

- ...:

  Additional arguments to pass to \`shiny::runApp()\`.

## Value

This function normally does not return; interrupt R to stop the
application (usually by pressing Ctrl+C or Esc).

## See also

\[shiny.blueprint::runExample()\] which this function is an adaptation.
