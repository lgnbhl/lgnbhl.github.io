# Simple Tree View - Selection

> Original MUI X documentation: [Simple Tree View -
> Selection](https://mui.com/x/react-tree-view/simple-tree-view/selection/).
> The examples of this page are written for R.

``` r

library(muiTreeView)
library(htmltools)

# Some functions of muiMaterial, muiCharts and reactRouter, used in all the examples of this page
pkg_items <- function() {
  list(
    TreeItem(
      itemId = "muiMaterial",
      label = "muiMaterial",
      TreeItem(itemId = "muiMaterial::Button", label = "Button()"),
      TreeItem(itemId = "muiMaterial::TextField", label = "TextField()"),
      TreeItem(itemId = "muiMaterial::Drawer", label = "Drawer()")
    ),
    TreeItem(
      itemId = "muiCharts",
      label = "muiCharts",
      TreeItem(itemId = "muiCharts::BarChart", label = "BarChart()"),
      TreeItem(itemId = "muiCharts::LineChart", label = "LineChart()")
    ),
    TreeItem(
      itemId = "reactRouter",
      label = "reactRouter",
      TreeItem(itemId = "reactRouter::RouterProvider", label = "RouterProvider()"),
      TreeItem(itemId = "reactRouter::Route", label = "Route()"),
      TreeItem(itemId = "reactRouter::NavLink", label = "NavLink()")
    )
  )
}
```

## Single selection

By default, one item can be selected at a time: click on an item, or
focus it and press Space. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/selection/#single-selection)

``` r

SimpleTreeView(pkg_items())
```

## Multi-selection

Use `multiSelect = TRUE` to select several items: hold Ctrl (⌘ Command
on macOS) while clicking, or Shift to select a range. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/selection/#multi-selection)

``` r

SimpleTreeView(multiSelect = TRUE, pkg_items())
```

## Disable selection

Use `disableSelection = TRUE` to prevent the selection of all items.
[MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/selection/#disable-selection)

``` r

SimpleTreeView(disableSelection = TRUE, pkg_items())
```

## Checkbox selection

Use `checkboxSelection = TRUE` to render a checkbox next to each item.
Combine it with `multiSelect = TRUE` to check several items. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/selection/#checkbox-selection)

``` r

SimpleTreeView(checkboxSelection = TRUE, pkg_items())
```

``` r

SimpleTreeView(checkboxSelection = TRUE, multiSelect = TRUE, pkg_items())
```

## Selectable items

Use `disableSelection = TRUE` on a
[`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)
to make only this item unselectable. Here, only the functions can be
selected, not their packages. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/selection/#selectable-items)

``` r

SimpleTreeView(
  checkboxSelection = TRUE,
  multiSelect = TRUE,
  defaultExpandedItems = list("muiCharts", "reactRouter"),
  TreeItem(
    itemId = "muiCharts",
    label = "muiCharts",
    disableSelection = TRUE,
    TreeItem(itemId = "muiCharts::BarChart", label = "BarChart()"),
    TreeItem(itemId = "muiCharts::LineChart", label = "LineChart()")
  ),
  TreeItem(
    itemId = "reactRouter",
    label = "reactRouter",
    disableSelection = TRUE,
    TreeItem(itemId = "reactRouter::RouterProvider", label = "RouterProvider()"),
    TreeItem(itemId = "reactRouter::Route", label = "Route()"),
    TreeItem(itemId = "reactRouter::NavLink", label = "NavLink()")
  )
)
```

## Default selection

Use `defaultSelectedItems` to select items when the tree is created.
With `multiSelect = TRUE`, give the ids in a
[`list()`](https://rdrr.io/r/base/list.html). [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/selection/#controlled-selection)

``` r

SimpleTreeView(
  multiSelect = TRUE,
  checkboxSelection = TRUE,
  defaultExpandedItems = list("muiCharts"),
  defaultSelectedItems = list("muiCharts::BarChart", "muiCharts::LineChart"),
  pkg_items()
)
```

## Controlled selection

Use `selectedItems` with `onSelectedItemsChange` to control the
selection from your app, for example from the Shiny server with
[`renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html).
See [controlled state in
Shiny](https://felixluginbuhl.com/muiTreeView/articles/shiny.html#controlled-state-from-the-server).
[MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/selection/#controlled-selection)

`onSelectedItemsChange` receives the ids of all the selected items. In
Shiny, use `onSelectedItemsChange = setInput("selected", 1)` to get them
in `input$selected`. On this page, a
[`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html)
function writes them below the tree:

``` r

div(
  SimpleTreeView(
    multiSelect = TRUE,
    checkboxSelection = TRUE,
    onSelectedItemsChange = JS(
      "(event, itemIds) => { document.getElementById('stv-selected').textContent = JSON.stringify(itemIds); }"
    ),
    pkg_items()
  ),
  tags$pre("Selected items: ", tags$span(id = "stv-selected", "[]"))
)
```


    Selected items: 
    []

## Track item selection change

Use `onItemSelectionToggle` to know which item was just selected or
deselected. It receives the event, the item id and whether the item is
now selected. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/selection/#track-item-selection-change)

``` r

div(
  SimpleTreeView(
    multiSelect = TRUE,
    checkboxSelection = TRUE,
    onItemSelectionToggle = JS(
      "(event, itemId, isSelected) => {
        document.getElementById('stv-toggle').textContent =
          itemId + (isSelected ? ' was selected' : ' was deselected');
      }"
    ),
    pkg_items()
  ),
  tags$pre(tags$span(id = "stv-toggle", "No item selection recorded"))
)
```


    No item selection recorded

## Automatic parents and children selection

With `multiSelect = TRUE`, use `selectionPropagation` to select the
children of a selected parent (`descendants = TRUE`), and the parent
when all its children are selected (`parents = TRUE`). Only the expanded
items are considered by
[`SimpleTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/SimpleTreeView.md).
[MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/selection/#automatic-parents-and-children-selection)

``` r

SimpleTreeView(
  multiSelect = TRUE,
  checkboxSelection = TRUE,
  defaultExpandedItems = list("muiMaterial", "muiCharts"),
  selectionPropagation = list(descendants = TRUE, parents = TRUE),
  pkg_items()
)
```

## Imperative API

The MUI imperative API (`apiRef`, to select an item or read its
selection status from JavaScript) relies on a React hook, which is not
available from R. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/selection/#imperative-api)

## API

- [`SimpleTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/SimpleTreeView.md)
  – [MUI API](https://mui.com/x/api/tree-view/simple-tree-view/)
- [`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)
  – [MUI API](https://mui.com/x/api/tree-view/tree-item/)
