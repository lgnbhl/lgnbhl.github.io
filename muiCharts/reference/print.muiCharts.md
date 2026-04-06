# Print muiCharts components

When called interactively, renders the component in the IDE viewer
panel. Otherwise, falls back to standard shiny.tag printing (raw HTML
text).

## Usage

``` r
# S3 method for class 'muiCharts'
print(x, browse = interactive(), ...)
```

## Arguments

- x:

  A muiCharts object (also inherits shiny.tag).

- browse:

  Whether to render in viewer. Defaults to TRUE in interactive sessions.

- ...:

  Additional arguments passed to print.

## Value

Invisibly returns x.
