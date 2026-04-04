# DataGrid

DataGrid

## Usage

``` r
DataGrid(rows = NULL, columns = NULL, ...)
```

## Arguments

- rows:

  A data.frame of rows. An `id` column is added automatically from row
  names if not already present.

- columns:

  Column definitions (list of lists). If `NULL`, auto-generated from
  `names(rows)`.

- ...:

  Additional props passed directly to the MUI DataGrid component.
