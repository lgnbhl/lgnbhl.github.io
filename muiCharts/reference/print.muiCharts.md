# Print muiCharts components

When called interactively, renders the component in the IDE viewer
panel. Otherwise, falls back to standard shiny.tag printing (raw HTML
text).

## Usage

``` r
# S3 method for class 'muiCharts'
print(x, browse = interactive(), ...)
```

## Arguments

- x:

  A muiCharts object (also inherits shiny.tag).

- browse:

  Whether to render in viewer. Defaults to TRUE in interactive sessions.

- ...:

  Additional arguments passed to print.

## Value

Invisibly returns x.

## Examples

``` r
chart <- BarChart(
  series = list(list(data = c(1, 2, 3))),
  height = 300
)
# browse = FALSE prints the underlying HTML instead of opening the viewer.
print(chart, browse = FALSE)
#> <div class="react-container" data-react-id="cvpeammhtuweaikfkbkz">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/x-charts","name":"BarChart","props":{"type":"raw","value":{"series":[{"data":[1,2,3]}],"height":300}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('cvpeammhtuweaikfkbkz')</script>
#> </div>
```
