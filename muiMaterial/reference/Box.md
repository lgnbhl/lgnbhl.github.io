# Box

<https://mui.com/material-ui/api/box/>

## Usage

``` r
Box(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- component `elementType`  
  Default is NA The component used for the root node. Either a string to
  use a HTML element or a component.

- sx `Array func| object| bool | func| object`  
  Default is NA The system prop that allows defining system overrides as
  well as additional CSS styles.See the `sx` page for more details.

## Examples

``` r
Box(component = "section", sx = list(p = 2, border = "1px dashed grey"), "A section")
#> <div class="react-container" data-react-id="lofazeuxvpxadcskbdyf">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Box","props":{"type":"raw","value":{"component":"section","sx":{"p":2,"border":"1px dashed grey"},"children":"A section"}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('lofazeuxvpxadcskbdyf')</script>
#> </div>
```
