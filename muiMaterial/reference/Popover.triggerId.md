# Popover.triggerId

Custom Popover bound to a DOM element by id. See
'js/src/MuiPopoverTriggerId.jsx'. The trigger element acts as the
anchor; the Popover opens on click and closes on clickaway.

## Usage

``` r
Popover.triggerId(triggerId, ...)
```

## Arguments

- triggerId:

  HTML id of an existing DOM element that acts as the anchor/trigger for
  the Popover.

- ...:

  Named arguments forwarded as React props, plus children to render
  inside the component.

## Value

Object with \`shiny.tag\` class suitable for use in the UI of a Shiny
app.

## Examples

``` r
htmltools::tagList(
  Button(id = "open-popover", "Open popover"),
  Popover.triggerId("open-popover", anchorOrigin = list(vertical = "bottom", horizontal = "left"),
    Typography(sx = list(p = 2), "The content of the Popover."))
)
#> <div class="react-container" data-react-id="pzqnnalmzrvxcynvvhse">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Button","props":{"type":"raw","value":{"id":"open-popover","children":"Open popover"}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('pzqnnalmzrvxcynvvhse')</script>
#> </div>
#> <div class="react-container" data-react-id="ksqayzygrvtizynkpdpq">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@/muiMaterial","name":"MuiPopoverTriggerId","props":{"type":"object","value":{"triggerId":{"type":"raw","value":"open-popover"},"anchorOrigin":{"type":"raw","value":{"vertical":"bottom","horizontal":"left"}},"children":{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"sx":{"p":2},"children":"The content of the Popover."}}}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('ksqayzygrvtizynkpdpq')</script>
#> </div>
```
