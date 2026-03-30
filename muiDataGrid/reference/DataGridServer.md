# Server-Side DataGrid

A DataGrid component with server-side pagination, sorting, and
filtering. The component sends pagination, sort, and filter state to R
via a Shiny input.

## Usage

``` r
DataGridServer(
  inputId,
  rows = NULL,
  columns = NULL,
  rowCount = 0L,
  loading = FALSE,
  initialPageSize = 25L,
  pageSizeOptions = c(10L, 25L, 50L, 100L),
  ...
)
```

## Arguments

- inputId:

  Character. The Shiny input ID. When pagination, sorting, or filtering
  changes, the new state is available as `input$<inputId>` in the
  server. The value is a list with elements `pagination_model` (list
  with `page` and `pageSize`), `sort_model` (list of sort items), and
  `filter_model` (list with `items`).

- rows:

  A data.frame of rows for the current page.

- columns:

  Column definitions (list of lists). If NULL, auto-generated from
  `names(rows)`.

- rowCount:

  Integer. Total number of rows across all pages.

- loading:

  Logical. Whether to show the loading indicator.

- initialPageSize:

  Integer. Initial page size. Default 25.

- pageSizeOptions:

  Integer vector. Available page size options. Default
  `c(10, 25, 50, 100)`.

- ...:

  Additional props passed to the MUI DataGrid.

## Value

A shiny.react element.
