# DataGrid

DataGrid

## Usage

``` r
DataGrid(rows = NULL, columns = NULL, ...)
```

## Arguments

- rows:

  A data.frame of rows. An `id` column of 1-based row numbers is added
  automatically if not already present.

- columns:

  Column definitions (list of lists, or a data.frame with one row per
  column). If `NULL`, auto-generated from `names(rows)`. Any column
  without an explicit `type` has one inferred from the matching `rows`
  column: numeric columns get MUI's `number` type and logical columns
  its `boolean` type; all other classes (including `Date`, `POSIXct`,
  and factors) default to `string`. A `type` you set yourself is always
  kept. To get MUI's date-picker filtering, set `type = "date"` together
  with a `valueGetter` that returns a JS `Date` explicitly.

- ...:

  Additional props passed directly to the MUI DataGrid component.

## Value

A `shiny.react` element (also classed `muiDataGrid`) that renders the
MUI X Data Grid. Use it directly in Shiny UI, inside
[`renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html),
or in a Quarto/R Markdown document.

## Examples

``` r
# Minimal: column definitions are auto-generated from the data frame.
DataGrid(rows = head(iris))

# Custom columns plus an initial page size of 5 rows.
DataGrid(
  rows = head(mtcars),
  columns = list(
    list(field = "mpg", headerName = "MPG"),
    list(field = "cyl", headerName = "Cylinders")
  ),
  initialState = list(
    pagination = list(paginationModel = list(pageSize = 5))
  )
)
```
