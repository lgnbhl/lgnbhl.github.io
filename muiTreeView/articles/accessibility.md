# Accessibility

> Original MUI X documentation: [Tree View -
> Accessibility](https://mui.com/x/react-tree-view/accessibility/) and
> [Focus](https://mui.com/x/react-tree-view/rich-tree-view/focus/). The
> examples of this page are written for R.

``` r

library(muiTreeView)
library(htmltools)
```

## Guidelines

The Tree View follows the [WAI-ARIA Authoring Practices for the tree
view pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/): it
has the `tree` role, its items the `treeitem` role, and it can be used
with the keyboard only. [MUI
docs](https://mui.com/x/react-tree-view/accessibility/#guidelines)

Give the tree an accessible name, so that screen reader users know what
it contains. Use `aria-label`, or `aria-labelledby` with the id of a
visible title:

``` r

fns <- data.frame(
  package = c("muiMaterial", "muiMaterial", "muiMaterial", "muiCharts", "muiCharts", "reactRouter", "reactRouter", "reactRouter"),
  fn = c("Button", "TextField", "Drawer", "BarChart", "PieChart", "Route", "NavLink", "useParams")
)
fns$fn_id <- paste0(fns$package, "::", fns$fn)
fn_items <- asMuiTree(fns, levels = c("package", "fn"), levels_id = c("package", "fn_id"))

div(
  tags$h4(id = "fns-title", "Functions by package"),
  RichTreeView(
    `aria-labelledby` = "fns-title",
    items = fn_items
  )
)
```

#### Functions by package

## Keyboard interactions

Click on an item of the tree above, then try the keys below. On macOS,
use ⌘ Command instead of Ctrl. [MUI
docs](https://mui.com/x/react-tree-view/accessibility/#keyboard-interactions)

| Keys | Description |
|----|----|
| Enter | Activates the focused item: expands or collapses it if it has children, selects it otherwise. |
| Arrow Up | Moves the focus to the previous focusable item, without expanding or collapsing it. |
| Arrow Down | Moves the focus to the next focusable item, without expanding or collapsing it. |
| Arrow Right | Expands a collapsed item; moves the focus to the first child of an expanded item; does nothing on an end item. |
| Arrow Left | Collapses an expanded item; moves the focus to the parent of a collapsed item; does nothing on a collapsed root item. |
| Home | Focuses the first item of the tree. |
| End | Focuses the last item of the tree. |
| \* | Expands all the siblings of the focused item. |
| Typing characters | Moves the focus to the next item whose label starts with the typed characters. |

In right-to-left languages, Arrow Right and Arrow Left are switched.

## Selection

### On single-select trees

[MUI
docs](https://mui.com/x/react-tree-view/accessibility/#on-single-select-trees)

| Keys  | Description                                      |
|-------|--------------------------------------------------|
| Space | Toggles the selection of the focused item.       |
| Enter | Selects the focused item, if it has no children. |

### On multi-select trees

[MUI
docs](https://mui.com/x/react-tree-view/accessibility/#on-multi-select-trees)

| Keys | Description |
|----|----|
| Space | Toggles the selection of the focused item. |
| Shift+Arrow Up | Moves the focus and toggles the selection of the previous item. |
| Shift+Arrow Down | Moves the focus and toggles the selection of the next item. |
| Ctrl+Shift+Home | Selects the focused item and all the items up to the first one. |
| Ctrl+Shift+End | Selects the focused item and all the items down to the last one. |
| Ctrl+A | Selects all the items. |

``` r

RichTreeView(
  `aria-label` = "Functions by package",
  items = fn_items,
  multiSelect = TRUE,
  checkboxSelection = TRUE
)
```

## Focus

### Track item focus

Use `onItemFocus` to know which item has the focus. Click on the tree
and move with the arrow keys: [MUI
API](https://mui.com/x/api/tree-view/rich-tree-view/#rich-tree-view-prop-onItemFocus)

``` r

div(
  RichTreeView(
    `aria-label` = "Functions by package",
    items = fn_items,
    onItemFocus = JS(
      "(event, itemId) => { document.getElementById('a11y-focus').textContent = itemId; }"
    )
  ),
  tags$pre("Focused item: ", tags$span(id = "a11y-focus", "none"))
)
```


    Focused item: 
    none

### Focus disabled items

By default, the keyboard skips the disabled items. Use
`disabledItemsFocusable = TRUE` to let them receive the focus, as shown
in [Rich Tree View -
Items](https://felixluginbuhl.com/muiTreeView/articles/rich-tree-view-items.html#focus-disabled-items).

### Focus a specific item

Moving the focus from code uses the MUI imperative API (`apiRef`), which
relies on a React hook not available from R. [MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/focus/#focus-a-specific-item)

## API

- [`SimpleTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/SimpleTreeView.md)
  – [MUI API](https://mui.com/x/api/tree-view/simple-tree-view/)
- [`RichTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/RichTreeView.md)
  – [MUI API](https://mui.com/x/api/tree-view/rich-tree-view/)
