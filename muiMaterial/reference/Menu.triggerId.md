# Menu.triggerId

Custom Menu bound to a DOM element by id. See
'js/src/MuiMenuTriggerId.jsx'.

## Usage

``` r
Menu.triggerId(triggerId, ...)
```

## Arguments

- triggerId:

  HTML id of an existing DOM element that acts as the trigger (button,
  link, etc.) to open the Menu.

- ...:

  Named arguments forwarded as React props, plus children to render
  inside the component. Pass \`closeOnItemClick = FALSE\` to keep the
  menu open after a click. \`anchorEl\`/\`open\` are owned by the
  wrapper; caller-supplied \`onClick\` and \`onClose\` are composed with
  (called after) the wrapper's own handlers rather than replacing them.

## Value

Object with \`shiny.tag\` class suitable for use in the UI of a Shiny
app.

## Details

Pass \`closeOnItemClick = FALSE\` to disable auto-close on click (useful
when the menu contains interactive children like checkboxes).

## Examples

``` r
htmltools::tagList(
  Button(id = "open-menu", "Dashboard"),
  Menu.triggerId("open-menu", MenuItem("Profile"), MenuItem("Logout"))
)
#> <div class="react-container" data-react-id="hjgikrymdxlumgeermos">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Button","props":{"type":"raw","value":{"id":"open-menu","children":"Dashboard"}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('hjgikrymdxlumgeermos')</script>
#> </div>
#> <div class="react-container" data-react-id="asdoussbluvfezpdhlvz">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@/muiMaterial","name":"MuiMenuTriggerId","props":{"type":"object","value":{"triggerId":{"type":"raw","value":"open-menu"},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"MenuItem","props":{"type":"raw","value":{"children":"Profile"}}},{"type":"element","module":"@mui/material","name":"MenuItem","props":{"type":"raw","value":{"children":"Logout"}}}]}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('asdoussbluvfezpdhlvz')</script>
#> </div>
```
