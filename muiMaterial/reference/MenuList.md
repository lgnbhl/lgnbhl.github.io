# MenuList

<https://mui.com/material-ui/api/menu-list/>

## Usage

``` r
MenuList(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- autoFocus `bool`  
  Default is FALSE If true, will focus the role="menu" container and
  move into tab order.

- autoFocusItem `bool`  
  Default is FALSE If true, will focus the first menuitem if
  variant="menu" or selected item if variant="selectedMenu".

- children `node`  
  Default is - MenuList contents, normally MenuItems.

- disabledItemsFocusable `bool`  
  Default is FALSE If true, will allow focus on disabled items.

- disableListWrap `bool`  
  Default is FALSE If true, the menu items will not wrap focus.

- variant `'menu'| 'selectedMenu'`  
  Default is 'selectedMenu' The variant to use. Use menu to prevent
  selected items from impacting the initial focus and the vertical
  alignment relative to the anchor element.

## Examples

``` r
# For a menu opened by a button, see Menu.triggerId()
Paper(MenuList(MenuItem("Profile"), MenuItem("My account"), MenuItem("Logout")))
#> <div class="react-container" data-react-id="zqxuxkjpfbhexmswajnb">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Paper","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"MenuList","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"MenuItem","props":{"type":"raw","value":{"children":"Profile"}}},{"type":"element","module":"@mui/material","name":"MenuItem","props":{"type":"raw","value":{"children":"My account"}}},{"type":"element","module":"@mui/material","name":"MenuItem","props":{"type":"raw","value":{"children":"Logout"}}}]}}}}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('zqxuxkjpfbhexmswajnb')</script>
#> </div>
```
