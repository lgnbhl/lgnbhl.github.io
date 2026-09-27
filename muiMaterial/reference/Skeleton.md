# Skeleton

<https://mui.com/material-ui/api/skeleton/>

## Usage

``` r
Skeleton(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- animation `'pulse'| 'wave'| false`  
  Default is 'pulse' The animation. If false the animation effect is
  disabled.

- children `node`  
  Default is - Optional children to infer width and height from.

- classes `object`  
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- component `elementType`  
  Default is - The component used for the root node. Either a string to
  use a HTML element or a component.

- height `number| string`  
  Default is - Height of the skeleton. Useful when you don't want to
  adapt the skeleton to a text element but for instance a card.

- sx `Array`  
  Default is - The system prop that allows defining system overrides as
  well as additional CSS styles.See the `sx` page for more details.

- variant `'circular'| 'rectangular'| 'rounded'| 'text'| string`  
  Default is 'text' The type of content that will be rendered.

- width `number| string`  
  Default is - Width of the skeleton. Useful when the skeleton is inside
  an inline element with no width of its own.

## Examples

``` r
Stack(
  spacing = 1,
  Skeleton(variant = "text"),
  Skeleton(variant = "rectangular", width = 210, height = 60)
)
#> <div class="react-container" data-react-id="auzjyrnouachllhxxnpr">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Stack","props":{"type":"object","value":{"spacing":{"type":"raw","value":1},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Skeleton","props":{"type":"raw","value":{"variant":"text"}}},{"type":"element","module":"@mui/material","name":"Skeleton","props":{"type":"raw","value":{"variant":"rectangular","width":210,"height":60}}}]}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('auzjyrnouachllhxxnpr')</script>
#> </div>
```
