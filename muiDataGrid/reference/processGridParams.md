# Process server-side grid parameters

Applies pagination, sorting, and filtering from `DataGridServer`
parameters to a data.frame. Use inside
[`renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html)
with `input$<inputId>` to get the current page of data.

## Usage

``` r
processGridParams(data, params, pageSize = 10L)
```

## Arguments

- data:

  A data.frame with all rows.

- params:

  The grid params list from `input$<inputId>`, or NULL on initial
  render.

- pageSize:

  Default page size when params is NULL. Default 10.

## Value

A list with `rows` (data.frame for the current page) and `rowCount`
(integer, total matching rows).

## Examples

``` r
if (FALSE) { # \dontrun{
output$grid <- renderReact({
  result <- processGridParams(my_data, input$grid_params)
  DataGridServer("grid_params", rows = result$rows, rowCount = result$rowCount)
})
} # }
```
