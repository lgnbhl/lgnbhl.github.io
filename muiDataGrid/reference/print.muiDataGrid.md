# Print muiDataGrid components

When called interactively, renders the component in the IDE viewer
panel. Otherwise, falls back to standard shiny.tag printing (raw HTML
text).

## Usage

``` r
# S3 method for class 'muiDataGrid'
print(x, browse = interactive(), ...)
```

## Arguments

- x:

  A muiDataGrid object (also inherits shiny.tag).

- browse:

  Whether to render in viewer. Defaults to TRUE in interactive sessions.

- ...:

  Additional arguments passed to print.

## Value

Invisibly returns x.

## Examples

``` r
grid <- DataGrid(rows = head(iris))
# browse = FALSE prints the underlying HTML instead of opening the viewer.
print(grid, browse = FALSE)
#> <div class="react-container" data-react-id="rmqrctuzzklienmufsbj">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/x-data-grid","name":"DataGrid","props":{"type":"raw","value":{"rows":[{"Sepal.Length":5.1,"Sepal.Width":3.5,"Petal.Length":1.4,"Petal.Width":0.2,"Species":1,"id":1},{"Sepal.Length":4.9,"Sepal.Width":3,"Petal.Length":1.4,"Petal.Width":0.2,"Species":1,"id":2},{"Sepal.Length":4.7,"Sepal.Width":3.2,"Petal.Length":1.3,"Petal.Width":0.2,"Species":1,"id":3},{"Sepal.Length":4.6,"Sepal.Width":3.1,"Petal.Length":1.5,"Petal.Width":0.2,"Species":1,"id":4},{"Sepal.Length":5,"Sepal.Width":3.6,"Petal.Length":1.4,"Petal.Width":0.2,"Species":1,"id":5},{"Sepal.Length":5.4,"Sepal.Width":3.9,"Petal.Length":1.7,"Petal.Width":0.4,"Species":1,"id":6}],"columns":[{"field":"Sepal.Length","type":"number"},{"field":"Sepal.Width","type":"number"},{"field":"Petal.Length","type":"number"},{"field":"Petal.Width","type":"number"},{"field":"Species","type":"string"}]}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('rmqrctuzzklienmufsbj')</script>
#> </div>
```
