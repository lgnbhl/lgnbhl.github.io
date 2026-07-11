# Mui X Data Grid UI JS dependency

Mui X Data Grid UI JS dependency

## Usage

``` r
muiDataGridDependency()
```

## Value

A list of HTML dependency objects
([`htmltools::htmlDependency`](https://rstudio.github.io/htmltools/reference/htmlDependency.html))
that load the bundled MUI X Data Grid JavaScript and its shared MUI
Material runtime. Attach it to custom HTML when building a grid by hand.

## Examples

``` r
# Inspect the dependencies attached to every DataGrid() element.
muiDataGridDependency()
#> [[1]]
#> List of 10
#>  $ name      : chr "muiMaterial"
#>  $ version   : chr "0.2.2"
#>  $ src       :List of 1
#>   ..$ file: chr "www/muiMaterial"
#>  $ meta      : NULL
#>  $ script    : chr "mui-material.js"
#>  $ stylesheet: NULL
#>  $ head      : NULL
#>  $ attachment: NULL
#>  $ package   : chr "muiMaterial"
#>  $ all_files : logi TRUE
#>  - attr(*, "class")= chr "html_dependency"
#> 
#> [[2]]
#> List of 10
#>  $ name      : chr "muiDataGrid"
#>  $ version   : chr "0.1.2.9000"
#>  $ src       :List of 1
#>   ..$ file: chr "www/muiDataGrid"
#>  $ meta      : NULL
#>  $ script    : chr "x-data-grid.js"
#>  $ stylesheet: NULL
#>  $ head      : NULL
#>  $ attachment: NULL
#>  $ package   : chr "muiDataGrid"
#>  $ all_files : logi TRUE
#>  - attr(*, "class")= chr "html_dependency"
#> 
```
