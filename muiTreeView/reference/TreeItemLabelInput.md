# TreeItemLabelInput

Input rendered in place of the label when label editing is enabled with
`isItemEditable`. See
<https://mui.com/x/react-tree-view/rich-tree-view/editing/>.

## Usage

``` r
TreeItemLabelInput(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- value `string`  
  Default is - The value of the input.

- onChange `func`  
  Default is - Callback fired when the value changes.

- onKeyDown `func`  
  Default is - Callback fired when a key is pressed.

- onBlur `func`  
  Default is - Callback fired when the input is blurred.

- autoFocus `bool`  
  Default is - If TRUE, the input is focused on mount.
