# muiDataGrid

**muiDataGrid** gives access to [MUI X Data
Grid](https://mui.com/x/react-data-grid/), a fast and extensible React
data table and React data grid, with filtering, sorting, aggregation,
and more.

## Install

You can install the development version of muiTreeView like so:

``` r

remotes::install_github("lgnbhl/muiDataGrid")
```

## Basic examples

A minimal example:

``` r

library(muiDataGrid)

DataGrid(
  rows = head(iris)
)
```

Customization can be done very easily:

``` r

library(muiDataGrid)
library(dplyr)

DataGrid(
  rows = starwars,
  columns = data.frame(
    field = c("name", "height", "mass"), # column names
    headerName = c("Names", "Height (cm)", "Mass (kg)"),
    description = c("Names of Starwars character", "Height in centimeter", "Mass in kilogram")
  ),
  initialState = list(
    pagination = list(
      paginationModel = list(pageSize = 5)
    )
  ),
  showToolbar = TRUE
)
```

**Read the full documentation with examples
[here](https://lgnbhl.github.io/muiDataGrid/).**

### Contribute

If you have any issue, question or want to contribute with a pull
request, don’t hesitate to write me on
<https://github.com/lgnbhl/muiDataGrid>

For updates follow [Felix
Luginbuhl](https://linkedin.com/in/FelixLuginbuhl) on LinkedIn.
