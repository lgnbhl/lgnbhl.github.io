# Modal.triggerId

Custom Modal bound to a DOM element by id. See
'js/src/MuiModalTriggerId.jsx'. Open/close state is managed entirely
client-side.

## Usage

``` r
Modal.triggerId(triggerId, ...)
```

## Arguments

- triggerId:

  HTML id of an existing DOM element that acts as the trigger to open
  the Modal.

- ...:

  Named arguments forwarded as React props, plus children to render
  inside the component.

## Value

Object with \`shiny.tag\` class suitable for use in the UI of a Shiny
app.

## Examples

``` r
htmltools::tagList(
  Button(id = "open-modal", "Open modal"),
  Modal.triggerId(
    "open-modal",
    Box(
      sx = list(position = "absolute", top = "50%", left = "50%",
        transform = "translate(-50%, -50%)", bgcolor = "background.paper", p = 4),
      "Modal content"
    )
  )
)
#> <div class="react-container" data-react-id="uqunsccfkirlhhhczclr">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Button","props":{"type":"raw","value":{"id":"open-modal","children":"Open modal"}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('uqunsccfkirlhhhczclr')</script>
#> </div>
#> <div class="react-container" data-react-id="qksejzkskkdhdmzeewrn">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@/muiMaterial","name":"MuiModalTriggerId","props":{"type":"object","value":{"triggerId":{"type":"raw","value":"open-modal"},"children":{"type":"element","module":"@mui/material","name":"Box","props":{"type":"raw","value":{"sx":{"position":"absolute","top":"50%","left":"50%","transform":"translate(-50%, -50%)","bgcolor":"background.paper","p":4},"children":"Modal content"}}}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('qksejzkskkdhdmzeewrn')</script>
#> </div>
```
