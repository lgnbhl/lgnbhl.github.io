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
#> <div class="react-container" data-react-id="cvpeammhtuweaikfkbkz">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/x-data-grid","name":"DataGrid","props":{"type":"raw","value":{"rows":[{"Sepal.Length":5.1,"Sepal.Width":3.5,"Petal.Length":1.4,"Petal.Width":0.2,"Species":1,"id":1},{"Sepal.Length":4.9,"Sepal.Width":3,"Petal.Length":1.4,"Petal.Width":0.2,"Species":1,"id":2},{"Sepal.Length":4.7,"Sepal.Width":3.2,"Petal.Length":1.3,"Petal.Width":0.2,"Species":1,"id":3},{"Sepal.Length":4.6,"Sepal.Width":3.1,"Petal.Length":1.5,"Petal.Width":0.2,"Species":1,"id":4},{"Sepal.Length":5,"Sepal.Width":3.6,"Petal.Length":1.4,"Petal.Width":0.2,"Species":1,"id":5},{"Sepal.Length":5.4,"Sepal.Width":3.9,"Petal.Length":1.7,"Petal.Width":0.4,"Species":1,"id":6}],"columns":[{"field":"Sepal.Length","type":"number"},{"field":"Sepal.Width","type":"number"},{"field":"Petal.Length","type":"number"},{"field":"Petal.Width","type":"number"},{"field":"Species","type":"string"}]}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('cvpeammhtuweaikfkbkz')</script>
#> </div>

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
#> <div class="react-container" data-react-id="hrtfztbnsrafhqmlsyef">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/x-data-grid","name":"DataGrid","props":{"type":"raw","value":{"rows":[{"mpg":21,"cyl":6,"disp":160,"hp":110,"drat":3.9,"wt":2.62,"qsec":16.46,"vs":0,"am":1,"gear":4,"carb":4,"id":1},{"mpg":21,"cyl":6,"disp":160,"hp":110,"drat":3.9,"wt":2.875,"qsec":17.02,"vs":0,"am":1,"gear":4,"carb":4,"id":2},{"mpg":22.8,"cyl":4,"disp":108,"hp":93,"drat":3.85,"wt":2.32,"qsec":18.61,"vs":1,"am":1,"gear":4,"carb":1,"id":3},{"mpg":21.4,"cyl":6,"disp":258,"hp":110,"drat":3.08,"wt":3.215,"qsec":19.44,"vs":1,"am":0,"gear":3,"carb":1,"id":4},{"mpg":18.7,"cyl":8,"disp":360,"hp":175,"drat":3.15,"wt":3.44,"qsec":17.02,"vs":0,"am":0,"gear":3,"carb":2,"id":5},{"mpg":18.1,"cyl":6,"disp":225,"hp":105,"drat":2.76,"wt":3.46,"qsec":20.22,"vs":1,"am":0,"gear":3,"carb":1,"id":6}],"columns":[{"field":"mpg","headerName":"MPG","type":"number"},{"field":"cyl","headerName":"Cylinders","type":"number"}],"initialState":{"pagination":{"paginationModel":{"pageSize":5}}}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('hrtfztbnsrafhqmlsyef')</script>
#> </div>
```
