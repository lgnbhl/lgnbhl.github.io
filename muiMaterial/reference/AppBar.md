# AppBar

<https://mui.com/material-ui/api/app-bar/>

## Usage

``` r
AppBar(...)
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

- color
  `'default'| 'inherit'| 'primary'| 'secondary'| 'transparent'| 'error'| 'info'| 'success'| 'warning'| string`  
  Default is 'primary' The color of the component. It supports both
  default and custom theme colors, which can be added as shown in the
  palette customization guide.

- enableColorOnDark `bool`  
  Default is FALSE If true, the color prop is applied in dark mode.

- position `'absolute'| 'fixed'| 'relative'| 'static'| 'sticky'`  
  Default is 'fixed' The positioning type. The behavior of the different
  options is described in the MDN web docs. Note: sticky is not
  universally supported and will fall back to static when unavailable.

- sx `Array func| object| bool | func| object`  
  Default is - The system prop that allows defining system overrides as
  well as additional CSS styles.See the `sx` page for more details.

## Examples

``` r
AppBar(
  position = "static",
  Toolbar(
    Typography(variant = "h6", sx = list(flexGrow = 1), "News"),
    Button(color = "inherit", "Login")
  )
)
#> <div class="react-container" data-react-id="zvxpuzsfhswgayltrkjt">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"AppBar","props":{"type":"object","value":{"position":{"type":"raw","value":"static"},"children":{"type":"element","module":"@mui/material","name":"Toolbar","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"variant":"h6","sx":{"flexGrow":1},"children":"News"}}},{"type":"element","module":"@mui/material","name":"Button","props":{"type":"raw","value":{"color":"inherit","children":"Login"}}}]}}}}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('zvxpuzsfhswgayltrkjt')</script>
#> </div>
```
