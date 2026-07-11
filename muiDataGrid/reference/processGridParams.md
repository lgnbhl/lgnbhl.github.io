# Process server-side grid parameters

Applies pagination, sorting, and filtering from `DataGridServer`
parameters to a data.frame. Use inside
[`renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html)
with `input$<inputId>` to get the current page of data.

## Usage

``` r
processGridParams(data, params, pageSize = 100L)
```

## Arguments

- data:

  A data.frame with all rows.

- params:

  The grid params list from `input$<inputId>`, or NULL on initial
  render.

- pageSize:

  Page size to use when `params` is `NULL` (i.e. the first render before
  the grid has sent state). Should match the `initialPageSize` passed to
  `DataGridServer`, or MUI's default of 100 if none was specified.

## Value

A list with `rows` (data.frame for the current page) and `rowCount`
(integer, total matching rows).

## Lifecycle

**Experimental.** This helper is *specific to this R package* and has no
equivalent in MUI X Data Grid, which leaves the server-side data layer
entirely to the developer. It reimplements MUI's server-mode filtering
and sorting semantics in R, so its behavior may change between releases
and can differ in edge cases from MUI's own client-side filtering.
Decisions worth knowing about:

- String filters are case-insensitive (except `is`, which is
  case-sensitive); missing values always sort last; unrecognized filter
  operators pass all rows through *with a warning*.

- Filter items with an empty value (`NULL`, `""`, or an empty `isAnyOf`
  set) are ignored, matching MUI's client-side behavior of disabling
  such items.

- The toolbar quick filter is supported: each search term must appear
  (case-insensitive substring) in at least one column other than `id`;
  terms combine per the model's `quickFilterLogicOperator` (`"and"` by
  default), and the result is combined with the regular filter items
  using AND.

- Sorting and string comparison use R's locale collation, so the
  ordering of accented or mixed-case values can differ from the
  browser's ordering in the client-side
  [`DataGrid()`](https://felixluginbuhl.com/muiDataGrid/reference/DataGrid.md).

- Date `is`/`not` compare values as strings (ISO dates work; `Date`
  columns stringify to ISO), while
  `after`/`before`/`onOrAfter`/`onOrBefore` parse dates — a character
  column holding non-ISO dates filters correctly with the latter but not
  with `is`/`not`.

## Examples

``` r
df <- data.frame(name = paste("Row", 1:50), value = 1:50)

# Initial render (no params yet)
processGridParams(df, params = NULL, pageSize = 10)
#> $rows
#>      name value id
#> 1   Row 1     1  1
#> 2   Row 2     2  2
#> 3   Row 3     3  3
#> 4   Row 4     4  4
#> 5   Row 5     5  5
#> 6   Row 6     6  6
#> 7   Row 7     7  7
#> 8   Row 8     8  8
#> 9   Row 9     9  9
#> 10 Row 10    10 10
#> 
#> $rowCount
#> [1] 50
#> 

# Page 2, sorted descending, filtered
params <- list(
  pagination_model = list(page = 1, pageSize = 10),
  sort_model = list(list(field = "value", sort = "desc")),
  filter_model = list(items = list(
    list(field = "value", operator = ">", value = "10")
  ))
)
processGridParams(df, params)
#> $rows
#>      name value id
#> 1  Row 40    40 11
#> 2  Row 39    39 12
#> 3  Row 38    38 13
#> 4  Row 37    37 14
#> 5  Row 36    36 15
#> 6  Row 35    35 16
#> 7  Row 34    34 17
#> 8  Row 33    33 18
#> 9  Row 32    32 19
#> 10 Row 31    31 20
#> 
#> $rowCount
#> [1] 40
#> 
```
