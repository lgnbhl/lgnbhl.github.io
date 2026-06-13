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
  rowCount = NULL,
  loading = NULL,
  initialPageSize = NULL,
  pageSizeOptions = NULL,
  filterDebounce = NULL,
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

  A data.frame. Pass the **full** dataset (like
  [`DataGrid()`](https://felixluginbuhl.com/muiDataGrid/reference/DataGrid.md))
  and let `DataGridServer()` handle pagination automatically, or pass a
  pre-sliced page together with an explicit `rowCount` for manual
  control.

- columns:

  Column definitions (list of lists). If NULL, auto-generated from
  `names(rows)`, with each column's `type` inferred from its R class
  (see
  [`DataGrid`](https://felixluginbuhl.com/muiDataGrid/reference/DataGrid.md)).

- rowCount:

  Integer. When provided, `rows` is assumed to be already paginated and
  `rowCount` is used as the total row count (manual mode). When `NULL`
  (default), pagination is handled automatically from the full `rows`
  dataset.

- loading:

  Logical. Whether to show the loading indicator. If `NULL`, MUI
  defaults to `FALSE`.

- initialPageSize:

  Integer. Convenience for setting the initial page size. Builds MUI's
  `initialState` prop. If `NULL`, MUI defaults to 100. Also sets the
  page size for the first automatic render before the grid has sent
  state. Must be included in `pageSizeOptions`.

- pageSizeOptions:

  Integer vector. Available page size options. If `NULL`, MUI defaults
  to `c(25, 50, 100)`.

- filterDebounce:

  Integer. Milliseconds to debounce filter input before sending state
  to R. If `NULL`, defaults to 300 ms.

- ...:

  Additional props passed directly to the MUI DataGrid component. Note:
  `paginationMode`, `sortingMode`, `filterMode`, and `pagination` are
  set automatically and should not be overridden.

## Value

A shiny.react element.

## Details

Pass the full dataset via `rows` — just like
[`DataGrid()`](https://felixluginbuhl.com/muiDataGrid/reference/DataGrid.md)
— and `DataGridServer()` handles pagination, sorting, and filtering
automatically. For manual control (e.g. database queries), supply
pre-sliced `rows` together with an explicit `rowCount`.

## Lifecycle

**Experimental.** `DataGridServer()` (together with
[`processGridParams`](https://felixluginbuhl.com/muiDataGrid/reference/processGridParams.md))
is *specific to this R package* and has no equivalent in MUI X Data
Grid: MUI ships only the building blocks (`paginationMode = "server"`
plus callbacks) and leaves the data layer to you. This wrapper supplies
that layer in R, and in doing so encodes a number of opinionated
decisions that may change in future releases. Pin the package version if
you rely on the current behaviour. Decisions worth knowing about:

- Mode is selected by the presence of `rowCount`: supply it to pass a
  pre-sliced page (manual mode); omit it to let the full `rows` be
  paginated automatically.

- Changing the sort or any filter resets the grid to the first page.

- Unrecognised filter operators pass all rows through with a warning
  (see
  [`processGridParams`](https://felixluginbuhl.com/muiDataGrid/reference/processGridParams.md)).

- When `rows` has no `id` column, ids are generated positionally and are
  *not* stable across sort/filter changes. Supply a stable, unique `id`
  column if you use row selection.

- `initialPageSize`, `initialState`, and any initial sort or filter seed
  the grid *only on the first render*. The React component reads them
  once when it mounts, so changing them reactively afterwards (e.g. from
  a `selectInput`) has no effect on the already-mounted grid. To change
  page size after mount, drive it from the grid's own controls rather
  than re-rendering with a new `initialPageSize`.

## Examples

``` r
if (FALSE) { # \dontrun{
# Simple usage: pass the full dataset, pagination is handled automatically
output$grid <- renderReact({
  DataGridServer("grid_params",
    rows = my_data,
    initialPageSize = 10L,
    pageSizeOptions = c(10L, 25L, 50L)
  )
})

# Manual usage: handle pagination yourself (e.g. database queries)
output$grid <- renderReact({
  result <- processGridParams(my_data, input$grid_params, pageSize = 10L)
  DataGridServer("grid_params",
    rows = result$rows,
    rowCount = result$rowCount,
    initialPageSize = 10L,
    pageSizeOptions = c(10L, 25L, 50L)
  )
})
} # }
```
