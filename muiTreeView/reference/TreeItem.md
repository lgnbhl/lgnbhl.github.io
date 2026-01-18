# TreeItem

<https://mui.com/x/api/tree-view/tree-item/>

## Usage

``` r
TreeItem(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- itemId `string`  
  Default is - The id of the item. Must be unique.

- children `any`  
  Default is - The content of the component.

- classes `object`  
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- disabled `bool`  
  Default is FALSE If true, the item is disabled.

- id `string`  
  Default is - The id attribute of the item. If not provided, it will be
  generated.

- label `node`  
  Default is - The label of the item.

- onBlur `func`  
  Default is - Callback fired when the item root is blurred.

- onFocus `unsupportedProp`  
  Default is - This prop isn't supported. Use the onItemFocus callback
  on the tree if you need to monitor an item's focus.

- onKeyDown `func`  
  Default is - Callback fired when a key is pressed on the keyboard and
  the tree is in focus.

- slotProps `object`  
  Default is The props used for each component slot.

- slots `object`  
  Default is Overridable component slots.See Slots API below for more
  details.

- sx `Array<func| object| bool>| func| object`  
  Default is - The system prop that allows defining system overrides as
  well as additional CSS styles.See the `sx` page for more details.
