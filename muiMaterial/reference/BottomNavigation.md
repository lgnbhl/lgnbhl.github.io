# BottomNavigation

<https://mui.com/material-ui/api/bottom-navigation/>

## Usage

``` r
BottomNavigation(...)

BottomNavigation.shinyInput(inputId, ..., value = defaultValue)

updateBottomNavigation.shinyInput(
  session = shiny::getDefaultReactiveDomain(),
  inputId,
  ...
)
```

## Arguments

- ...:

  Props to pass to the component.

- inputId:

  ID of the component.

- value:

  Starting value.

- session:

  Object passed as the \`session\` argument to Shiny server.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- children `node`  
  Default is - The content of the component.

- classes `object`  
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- component `elementType`  
  Default is - The component used for the root node. Either a string to
  use a HTML element or a component.

- onChange `func`  
  Default is - Callback fired when the value
  changes.Signature:function(event: React.SyntheticEvent, value: any) =
  voidevent The event source of the callback. Warning: This is a generic
  event not a change event.value We default to the index of the child.

- showLabels `bool`  
  Default is FALSE If true, all BottomNavigationActions will show their
  labels. By default, only the selected BottomNavigationAction will show
  its label.

- sx `Array func| object| bool | func| object`  
  Default is - The system prop that allows defining system overrides as
  well as additional CSS styles.See the `sx` page for more details.

- value `any`  
  Default is - The value of the currently selected
  BottomNavigationAction.

## Note

Give each child `BottomNavigationAction` a `value`; the selected
action's `value` is reported to `input[[inputId]]`. Pass an initial
`value` matching one of them to pre-select it; when omitted, the
component mounts with nothing selected (`value = FALSE`).
