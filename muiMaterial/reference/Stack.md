# Stack

<https://mui.com/material-ui/api/stack/>

## Usage

``` r
Stack(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- children `node`  
  Default is - The content of the component.

- component `elementType`  
  Default is - The component used for the root node. Either a string to
  use a HTML element or a component.

- direction
  `'column-reverse'| 'column'| 'row-reverse'| 'row'| Array 'column-reverse'| 'column'| 'row-reverse'| 'row' | object`  
  Default is 'column' Defines the flex-direction style property. It is
  applied for all screen sizes.

- divider `node`  
  Default is - Add an element between each child.

- spacing `Array number| string | number| object| string`  
  Default is 0 Defines the space between immediate children.

- sx `Array func| object| bool | func| object`  
  Default is - The system prop, which allows defining system overrides
  as well as additional CSS styles.See the `sx` page for more details.

- useFlexGap `bool`  
  Default is FALSE If true, the CSS flexbox gap is used instead of
  applying margin to children.While CSS gap removes the known
  limitations, it is not fully supported in some browsers. We recommend
  checking https://caniuse.com/?search=flex%20gap before using this
  flag.To enable this flag globally, follow the theme's default props
  configuration.

## Examples

``` r
Stack(direction = "row", spacing = 2, divider = Divider(orientation = "vertical", flexItem = TRUE),
  Paper("Item 1"), Paper("Item 2"), Paper("Item 3"))
#> <div class="react-container" data-react-id="aploypbcygfijhqhhjjv">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Stack","props":{"type":"object","value":{"direction":{"type":"raw","value":"row"},"spacing":{"type":"raw","value":2},"divider":{"type":"element","module":"@mui/material","name":"Divider","props":{"type":"raw","value":{"orientation":"vertical","flexItem":true}}},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Paper","props":{"type":"raw","value":{"children":"Item 1"}}},{"type":"element","module":"@mui/material","name":"Paper","props":{"type":"raw","value":{"children":"Item 2"}}},{"type":"element","module":"@mui/material","name":"Paper","props":{"type":"raw","value":{"children":"Item 3"}}}]}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('aploypbcygfijhqhhjjv')</script>
#> </div>
```
