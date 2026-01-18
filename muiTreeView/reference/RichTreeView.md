# RichTreeView

<https://mui.com/x/api/tree-view/rich-tree-view/>

## Usage

``` r
RichTreeView(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- apiRef
  `{ current?: { focusItem?: func, getItem?: func, getItemDOMElement?: func, getItemOrderedChildrenIds?: func, getItemTree?: func, getParentId?: func, isItemExpanded?: func, setEditedItem?: func, setIsItemDisabled?: func, setItemExpansion?: func, setItemSelection?: func, updateItemLabel?: func } }`  
  Default is - The ref object that allows Tree View manipulation. Can be
  instantiated with useTreeViewApiRef().

- checkboxSelection `bool`  
  Default is FALSE If true, the Tree View renders a checkbox at the left
  of its label that allows selecting it.

- classes `object`  
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- defaultExpandedItems `Array<string>`  
  Default is \[\] Expanded item ids. Used when the item's expansion is
  not controlled.

- defaultSelectedItems `any`  
  Default is \[\] Selected item ids. (Uncontrolled) When multiSelect is
  true this takes an array of strings; when false (default) a string.

- disabledItemsFocusable `bool`  
  Default is FALSE If true, will allow focus on disabled items.

- disableSelection `bool`  
  Default is FALSE If true selection is disabled.

- expandedItems `Array<string>`  
  Default is - Expanded item ids. Used when the item's expansion is
  controlled.

- expansionTrigger `'content'| 'iconContainer'`  
  Default is 'content' The slot that triggers the item's expansion when
  clicked.

- getItemChildren `func`  
  Default is (item) =\> item.children Used to determine the children of
  a given item.Signature:function(item: R) =\> Arrayitem The item to
  check.

- getItemId `func`  
  Default is (item) =\> item.id Used to determine the id of a given
  item.Signature:function(item: R) =\> stringitem The item to check.

- getItemLabel `func`  
  Default is (item) =\> item.label Used to determine the string label
  for a given item.Signature:function(item: R) =\> stringitem The item
  to check.

- id `string`  
  Default is - This prop is used to help implement the accessibility
  logic. If you don't provide this prop. It falls back to a randomly
  generated id.

- isItemDisabled `func`  
  Default is - Used to determine if a given item should be
  disabled.Signature:function(item: R) =\> booleanitem The item to
  check.

- isItemEditable `func| bool`  
  Default is () =\> FALSE Determine if a given item can be edited.

- itemChildrenIndentation `number| string`  
  Default is 12px Horizontal indentation between an item and its
  children. Examples: 24, "24px", "2rem", "2em".

- multiSelect `bool`  
  Default is FALSE If true, ctrl and shift will trigger multiselect.

- onExpandedItemsChange `func`  
  Default is - Callback fired when Tree Items are
  expanded/collapsed.Signature:function(event: React.SyntheticEvent,
  itemIds: array) =\> voidevent The DOM event that triggered the change.
  Can be null when the change is caused by the
  publicAPI.setItemExpansion() method.itemIds The ids of the expanded
  items.

- onItemClick `func`  
  Default is - Callback fired when the content slot of a given Tree Item
  is clicked.Signature:function(event: React.MouseEvent, itemId: string)
  =\> voidevent The DOM event that triggered the change.itemId The id of
  the focused item.

- onItemExpansionToggle `func`  
  Default is - Callback fired when a Tree Item is expanded or
  collapsed.Signature:function(event: React.SyntheticEvent \| null,
  itemId: array, isExpanded: boolean) =\> voidevent The DOM event that
  triggered the change. Can be null when the change is caused by the
  publicAPI.setItemExpansion() method.itemId The itemId of the modified
  item.isExpanded true if the item has just been expanded, false if it
  has just been collapsed.

- onItemFocus `func`  
  Default is - Callback fired when a given Tree Item is
  focused.Signature:function(event: React.SyntheticEvent \| null,
  itemId: string) =\> voidevent The DOM event that triggered the change.
  Warning: This is a generic event not a focus event.itemId The id of
  the focused item.

- onItemLabelChange `func`  
  Default is - Callback fired when the label of an item
  changes.Signature:function(itemId: TreeViewItemId, newLabel: string)
  =\> voiditemId The id of the item that was edited.newLabel The new
  label of the items.

- onItemSelectionToggle `func`  
  Default is - Callback fired when a Tree Item is selected or
  deselected.Signature:function(event: React.SyntheticEvent, itemId:
  array, isSelected: boolean) =\> voidevent The DOM event that triggered
  the change. Can be null when the change is caused by the
  publicAPI.setItemSelection() method.itemId The itemId of the modified
  item.isSelected true if the item has just been selected, false if it
  has just been deselected.

- onSelectedItemsChange `func`  
  Default is - Callback fired when Tree Items are
  selected/deselected.Signature:function(event: React.SyntheticEvent,
  itemIds: Array \| string) =\> voidevent The DOM event that triggered
  the change. Can be null when the change is caused by the
  publicAPI.setItemSelection() method.itemIds The ids of the selected
  items. When multiSelect is true, this is an array of strings; when
  false (default) a string.

- selectedItems `any`  
  Default is - Selected item ids. (Controlled) When multiSelect is true
  this takes an array of strings; when false (default) a string.

- selectionPropagation `{ descendants?: bool, parents?: bool }`  
  Default is parents: FALSE, descendants: FALSE When
  selectionPropagation.descendants is set to true.- Selecting a parent
  selects all its descendants automatically. - Deselecting a parent
  deselects all its descendants automatically.When
  selectionPropagation.parents is set to true.- Selecting all the
  descendants of a parent selects the parent automatically. -
  Deselecting a descendant of a selected parent deselects the parent
  automatically.Only works when multiSelect is true. On the , only the
  expanded items are considered (since the collapsed item are not passed
  to the Tree View component at all)

- slotProps `object`  
  Default is The props used for each component slot.

- slots `object`  
  Default is Overridable component slots.See Slots API below for more
  details.

- sx `Array<func| object| bool>| func| object`  
  Default is - The system prop that allows defining system overrides as
  well as additional CSS styles.See the `sx` page for more details.
