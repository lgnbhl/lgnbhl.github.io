# Card

<https://mui.com/material-ui/api/card/>

## Usage

``` r
Card(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- children `node`  
  Default is - The content of the component.

- classes `object`  
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- raised `bool`  
  Default is FALSE If true, the card will use raised styling.

- sx `Array func| object| bool | func| object`  
  Default is - The system prop that allows defining system overrides as
  well as additional CSS styles.See the `sx` page for more details.

## Examples

``` r
Card(
  sx = list(maxWidth = 345),
  CardContent(
    Typography(variant = "h5", "Lizard"),
    Typography(variant = "body2", sx = list(color = "text.secondary"), "Lizards are reptiles.")
  ),
  CardActions(Button(size = "small", "Learn More"))
)
#> <div class="react-container" data-react-id="nmaylzojnbzqzntouqjj">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Card","props":{"type":"object","value":{"sx":{"type":"raw","value":{"maxWidth":345}},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"CardContent","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"variant":"h5","children":"Lizard"}}},{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"variant":"body2","sx":{"color":"text.secondary"},"children":"Lizards are reptiles."}}}]}}}},{"type":"element","module":"@mui/material","name":"CardActions","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"Button","props":{"type":"raw","value":{"size":"small","children":"Learn More"}}}}}}]}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('nmaylzojnbzqzntouqjj')</script>
#> </div>
```
