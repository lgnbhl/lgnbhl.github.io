# Mui X Tree View JS dependency

Mui X Tree View JS dependency

## Usage

``` r
muiTreeViewDependency()
```

## Value

A list of HTML dependency objects
([`htmltools::htmlDependency`](https://rstudio.github.io/htmltools/reference/htmlDependency.html))
that load the bundled MUI X Tree View JavaScript and its shared MUI
Material runtime. The muiMaterial dependency is listed first so its
bundle (which provides react, react-dom, `@mui/material`, `@mui/system`
and the emotion runtime that the tree view consumes as externals) loads
before the tree view script. Attach it to custom HTML when building a
tree view by hand.

## Examples

``` r
# Inspect the dependencies attached to every muiTreeView element.
muiTreeViewDependency()
#> [[1]]
#> List of 10
#>  $ name      : chr "muiMaterial"
#>  $ version   : chr "0.2.3"
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
#>  $ name      : chr "muiTreeView"
#>  $ version   : chr "0.2.0"
#>  $ src       :List of 1
#>   ..$ file: chr "www/muiTreeView"
#>  $ meta      : NULL
#>  $ script    : chr "x-tree-view.js"
#>  $ stylesheet: NULL
#>  $ head      : NULL
#>  $ attachment: NULL
#>  $ package   : chr "muiTreeView"
#>  $ all_files : logi TRUE
#>  - attr(*, "class")= chr "html_dependency"
#> 
```
