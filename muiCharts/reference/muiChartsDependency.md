# Mui Charts UI JS dependency

Mui Charts UI JS dependency

## Usage

``` r
muiChartsDependency()
```

## Value

A list of HTML dependency objects
([`htmltools::htmlDependency`](https://rstudio.github.io/htmltools/reference/htmlDependency.html))
that load the bundled MUI X Charts JavaScript and its shared MUI
Material runtime. The muiMaterial dependency is listed first so its
bundle (which provides react, react-dom, `@mui/material`, `@mui/system`
and the emotion runtime that the charts consume as externals) loads
before the chart script. Attach it to custom HTML when building a chart
by hand.

## Examples

``` r
# Inspect the dependencies attached to every muiCharts element.
muiChartsDependency()
#> [[1]]
#> List of 10
#>  $ name      : chr "muiMaterial"
#>  $ version   : chr "0.2.2.9000"
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
#>  $ name      : chr "muiCharts"
#>  $ version   : chr "0.1.0"
#>  $ src       :List of 1
#>   ..$ file: chr "www/muiCharts"
#>  $ meta      : NULL
#>  $ script    : chr "mui-x-charts.js"
#>  $ stylesheet: NULL
#>  $ head      : NULL
#>  $ attachment: NULL
#>  $ package   : chr "muiCharts"
#>  $ all_files : logi TRUE
#>  - attr(*, "class")= chr "html_dependency"
#> 
```
