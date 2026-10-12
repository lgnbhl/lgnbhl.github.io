# Simple Tree View - Items

> Original MUI X documentation: [Simple Tree View -
> Items](https://mui.com/x/react-tree-view/simple-tree-view/items/). The
> examples of this page are written for R.

``` r

library(muiTreeView)
library(htmltools)
```

## Basics

[`SimpleTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/SimpleTreeView.md)
takes its items as
[`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)
children. Nest
[`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)s
to create levels. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/items/#basics)

``` r

SimpleTreeView(
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
```

### Item identifier

Each
[`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)
needs an `itemId` that is unique in the whole tree. It is used to expand
or select items by default, and it is the value sent to Shiny. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/items/#item-identifier)

### Item label

The `label` of a
[`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)
can be a string or any UI element, such as icons or
[muiMaterial](https://felixluginbuhl.com/muiMaterial/) components. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/items/#item-label)

``` r

library(muiMaterial)

shiny_input_label <- function(icon, text) {
  Stack(
    direction = "row",
    spacing = 1,
    alignItems = "center",
    span(shiny::icon(icon), " ", text),
    Chip(label = "Shiny input", size = "small", color = "primary")
  )
}

SimpleTreeView(
  defaultExpandedItems = list("muiMaterial"),
  TreeItem(
    itemId = "muiMaterial",
    label = span(shiny::icon("cube"), " muiMaterial"),
    TreeItem(itemId = "muiMaterial::Button.shinyInput", label = shiny_input_label("hand-pointer", "Button.shinyInput()")),
    TreeItem(itemId = "muiMaterial::Slider.shinyInput", label = shiny_input_label("sliders", "Slider.shinyInput()")),
    TreeItem(itemId = "muiMaterial::Card", label = span(shiny::icon("square"), " Card()"))
  ),
  TreeItem(itemId = "muiCharts", label = span(shiny::icon("chart-column"), " muiCharts")),
  TreeItem(itemId = "reactRouter", label = span(shiny::icon("route"), " reactRouter"))
)
```

### Disabled items

Use `disabled = TRUE` on a
[`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)
to disable it: it can’t be selected, expanded or focused. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/items/#disabled-items)

``` r

SimpleTreeView(
  TreeItem(
    itemId = "muiMaterial",
    label = "muiMaterial",
    TreeItem(itemId = "muiMaterial::Button", label = "Button()"),
    TreeItem(itemId = "muiMaterial::TextField", label = "TextField()"),
    TreeItem(itemId = "muiMaterial::Drawer", label = "Drawer()", disabled = TRUE)
  ),
  TreeItem(
    itemId = "muiCharts",
    label = "muiCharts",
    disabled = TRUE,
    TreeItem(itemId = "muiCharts::BarChart", label = "BarChart()"),
    TreeItem(itemId = "muiCharts::LineChart", label = "LineChart()")
  ),
  TreeItem(itemId = "reactRouter", label = "reactRouter")
)
```

#### Focus disabled items

By default, the keyboard navigation skips the disabled items. Use
`disabledItemsFocusable = TRUE` to let them receive the focus, so their
children can still be reached with the keyboard. Click on “muiMaterial”
and use the arrow keys. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/items/#disabled-items)

``` r

SimpleTreeView(
  disabledItemsFocusable = TRUE,
  TreeItem(itemId = "muiMaterial", label = "muiMaterial"),
  TreeItem(
    itemId = "muiCharts",
    label = "muiCharts (disabled)",
    disabled = TRUE,
    TreeItem(itemId = "muiCharts::BarChart", label = "BarChart()")
  ),
  TreeItem(itemId = "reactRouter", label = "reactRouter")
)
```

## Track item clicks

Use `onItemClick` to know which item was clicked. In Shiny, send the
clicked id to the server with
[`setInput()`](https://appsilon.github.io/shiny.react/reference/setInput.html).
On this page, which runs without a Shiny server, a small
[`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html)
function writes it below the tree instead. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/items/#track-item-clicks)

``` r

div(
  SimpleTreeView(
    onItemClick = JS(
      "(event, itemId) => { document.getElementById('stv-click').textContent = itemId; }"
    ),
    TreeItem(
      itemId = "muiCharts",
      label = "muiCharts",
      TreeItem(itemId = "muiCharts::BarChart", label = "BarChart()"),
      TreeItem(itemId = "muiCharts::LineChart", label = "LineChart()")
    ),
    TreeItem(itemId = "reactRouter", label = "reactRouter")
  ),
  tags$pre("Last clicked item: ", tags$span(id = "stv-click", "none"))
)
```


    Last clicked item: 
    none

In a Shiny app:

``` r

SimpleTreeView(
  onItemClick = setInput("clickedItem", 1), # 1 = second argument: the item id
  ...
)
# server: input$clickedItem
```

See [Shiny](https://felixluginbuhl.com/muiTreeView/articles/shiny.md)
for complete apps.

## Item height

Use `itemHeight` to set the height of each item, in pixels. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/items/#item-height)

``` r

SimpleTreeView(
  itemHeight = 48,
  defaultExpandedItems = list("muiCharts"),
  TreeItem(
    itemId = "muiCharts",
    label = "muiCharts",
    TreeItem(itemId = "muiCharts::BarChart", label = "BarChart()"),
    TreeItem(itemId = "muiCharts::LineChart", label = "LineChart()")
  ),
  TreeItem(itemId = "reactRouter", label = "reactRouter")
)
```

## Build items from a data frame

This section is specific to R. To create the
[`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)s
from a data frame, split it by the parent column and create the items
with [`lapply()`](https://rdrr.io/r/base/lapply.html). Here, some
functions grouped by package:

``` r

fns <- data.frame(
  package = c("muiMaterial", "muiMaterial", "muiCharts", "muiCharts", "reactRouter", "reactRouter"),
  fn = c("Button", "Drawer", "BarChart", "PieChart", "Route", "NavLink")
)
fns_by_package <- split(fns$fn, fns$package)

SimpleTreeView(
  defaultExpandedItems = list("muiCharts"),
  lapply(names(fns_by_package), function(package) {
    TreeItem(
      itemId = package,
      label = package,
      lapply(fns_by_package[[package]], function(fn) {
        TreeItem(itemId = paste0(package, "::", fn), label = paste0(fn, "()"))
      })
    )
  })
)
```

[`RichTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/RichTreeView.md)
with
[`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md)
does the same in one line: see [Data frames with
asMuiTree()](https://felixluginbuhl.com/muiTreeView/articles/data-frames.md).
Building the
[`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)s
yourself is useful when the labels must contain UI elements.

## Imperative API

The MUI imperative API (`apiRef`, e.g. to get the DOM element of an
item) relies on a React hook, which is not available from R. [MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/items/#imperative-api)

## API

- [`SimpleTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/SimpleTreeView.md)
  – [MUI API](https://mui.com/x/api/tree-view/simple-tree-view/)
- [`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)
  – [MUI API](https://mui.com/x/api/tree-view/tree-item/)
