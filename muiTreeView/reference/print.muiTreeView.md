# Print muiTreeView components

When called interactively, renders the component in the IDE viewer
panel. Otherwise, falls back to standard shiny.tag printing (raw HTML
text).

## Usage

``` r
# S3 method for class 'muiTreeView'
print(x, browse = interactive(), ...)
```

## Arguments

- x:

  A muiTreeView object (also inherits shiny.tag).

- browse:

  Whether to render in viewer. Defaults to TRUE in interactive sessions.

- ...:

  Additional arguments passed to print.

## Value

Invisibly returns x.

## Examples

``` r
tree <- RichTreeView(
  items = list(list(id = "1", label = "Item"))
)
# browse = FALSE prints the underlying HTML instead of opening the viewer.
print(tree, browse = FALSE)
#> <div class="react-container" data-react-id="cvpeammhtuweaikfkbkz">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/x-tree-view","name":"RichTreeView","props":{"type":"raw","value":{"items":[{"id":"1","label":"Item"}]}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('cvpeammhtuweaikfkbkz')</script>
#> </div>
```
