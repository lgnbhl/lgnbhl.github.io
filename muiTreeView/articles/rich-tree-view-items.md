# Rich Tree View - Items

> Original MUI X documentation: [Rich Tree View -
> Items](https://mui.com/x/react-tree-view/rich-tree-view/items/). The
> examples of this page are written for R.

``` r

library(muiTreeView)
library(htmltools)
```

The examples of this page use a selection of the functions of the
[**muiMaterial**](https://felixluginbuhl.com/muiMaterial/),
[**muiCharts**](https://felixluginbuhl.com/muiCharts/) and
[**reactRouter**](https://felixluginbuhl.com/reactRouter/) packages,
grouped by package and topic:

``` r

to_id <- function(x) gsub("[^a-z0-9]+", "-", tolower(x))

fns <- rbind(
  data.frame(package = "muiMaterial", group = "Layout", fn = c("Box", "Stack", "Grid")),
  data.frame(package = "muiMaterial", group = "Inputs", fn = c("Button", "TextField", "Slider", "Switch")),
  data.frame(package = "muiMaterial", group = "Navigation", fn = c("Link", "Tabs", "Drawer")),
  data.frame(package = "muiMaterial", group = "Surfaces", fn = c("AppBar", "Toolbar", "Card")),
  data.frame(package = "muiCharts", group = "Charts", fn = c("BarChart", "LineChart", "PieChart", "Gauge")),
  data.frame(package = "muiCharts", group = "Building blocks", fn = c("ChartsContainer", "ChartsXAxis", "ChartsLegend", "Toolbar")),
  data.frame(package = "reactRouter", group = "Routers", fn = c("RouterProvider", "createHashRouter", "createMemoryRouter")),
  data.frame(package = "reactRouter", group = "Routes", fn = c("Route", "Outlet")),
  data.frame(package = "reactRouter", group = "Navigation", fn = c("Link", "NavLink", "Navigate")),
  data.frame(package = "reactRouter", group = "Hooks", fn = c("useParams", "useLoaderData", "useNavigate"))
)
# Stable ids, built from the path: "Navigation", "Link" and "Toolbar" exist in two packages
fns$group_id <- paste(fns$package, to_id(fns$group), sep = "-")
fns$fn_id <- paste0(fns$package, "::", fns$fn)

head(fns)
#>       package  group        fn           group_id                  fn_id
#> 1 muiMaterial Layout       Box muiMaterial-layout       muiMaterial::Box
#> 2 muiMaterial Layout     Stack muiMaterial-layout     muiMaterial::Stack
#> 3 muiMaterial Layout      Grid muiMaterial-layout      muiMaterial::Grid
#> 4 muiMaterial Inputs    Button muiMaterial-inputs    muiMaterial::Button
#> 5 muiMaterial Inputs TextField muiMaterial-inputs muiMaterial::TextField
#> 6 muiMaterial Inputs    Slider muiMaterial-inputs    muiMaterial::Slider

fn_items <- asMuiTree(
  fns,
  levels = c("package", "group", "fn"),
  levels_id = c("package", "group_id", "fn_id")
)
```

## Basic usage

[`RichTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/RichTreeView.md)
takes its items as data, with the `items` argument. Build them from a
data frame with
[`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md):
each column given in `levels` becomes a level of the tree. [MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#basic-usage)

``` r

RichTreeView(items = fn_items)
```

See [Data frames with
asMuiTree()](https://felixluginbuhl.com/muiTreeView/articles/data-frames.md)
for more options.

## Item identifier

Each item must have a unique id. By default, the tree view reads it from
the `id` field, which
[`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md)
creates from the `levels_id` columns. If your items use another field,
tell the tree view where to find it with `getItemId`. [MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#item-identifier)

``` r

RichTreeView(
  items = list(
    list(
      internalId = "muiCharts",
      label = "muiCharts",
      children = list(
        list(internalId = "muiCharts::BarChart", label = "BarChart"),
        list(internalId = "muiCharts::LineChart", label = "LineChart")
      )
    ),
    list(internalId = "reactRouter", label = "reactRouter")
  ),
  getItemId = JS("(item) => item.internalId")
)
```

## Item label

Each item must have a label, a string. By default, the tree view reads
it from the `label` field. Use `getItemLabel` to read it from another
field, or to build it from several fields. [MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#item-label)

``` r

RichTreeView(
  items = list(
    list(
      id = "muiCharts",
      name = "muiCharts",
      children = list(
        list(id = "muiCharts::BarChart", package = "muiCharts", name = "BarChart"),
        list(id = "muiCharts::PieChart", package = "muiCharts", name = "PieChart")
      )
    )
  ),
  defaultExpandedItems = list("muiCharts"),
  getItemLabel = JS("(item) => item.package ? `${item.package}::${item.name}()` : item.name")
)
```

To render UI elements in the label, see [Rich Tree View -
Customization](https://felixluginbuhl.com/muiTreeView/articles/rich-tree-view-customization.html#custom-tree-item),
or use
[`SimpleTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/SimpleTreeView.md).

## Item children

By default, the tree view reads the children of an item from the
`children` field. Use `getItemChildren` to read them from another field.
[MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#item-children)

``` r

RichTreeView(
  items = list(
    list(
      id = "reactRouter",
      label = "reactRouter",
      nodes = list(
        list(id = "reactRouter::Route", label = "Route"),
        list(id = "reactRouter::Outlet", label = "Outlet")
      )
    ),
    list(id = "muiMaterial", label = "muiMaterial")
  ),
  getItemChildren = JS("(item) => item.nodes")
)
```

## Loading state

The `loading` argument shown in the MUI docs is not part of the
Community version bundled with **muiTreeView** (`@mui/x-tree-view`
9.0.2). [MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#loading-state)

## Disabled items

Use `isItemDisabled` to disable items. It is a JavaScript function that
receives an item and returns `TRUE` to disable it. A convenient pattern
in R is to compute the ids to disable from the data frame, and pass them
to the function. Here, the React hooks of reactRouter, whose names start
with `use`, are disabled: [MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#disabled-items)

``` r

hooks <- fns$fn_id[startsWith(fns$fn, "use")]
hooks
#> [1] "reactRouter::useParams"     "reactRouter::useLoaderData"
#> [3] "reactRouter::useNavigate"

RichTreeView(
  items = fn_items,
  defaultExpandedItems = list("reactRouter", "reactRouter-hooks"),
  isItemDisabled = JS(sprintf(
    "(item) => %s.includes(item.id)",
    jsonlite::toJSON(hooks)
  ))
)
```

### Focus disabled items

By default, the keyboard navigation skips the disabled items. Use
`disabledItemsFocusable = TRUE` to let them receive the focus. [MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#focus-disabled-items)

``` r

RichTreeView(
  items = fn_items,
  defaultExpandedItems = list("reactRouter", "reactRouter-hooks"),
  disabledItemsFocusable = TRUE,
  isItemDisabled = JS(sprintf(
    "(item) => %s.includes(item.id)",
    jsonlite::toJSON(hooks)
  ))
)
```

## Item height

Use `itemHeight` to set the height of each item, in pixels. [MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#item-height)

``` r

RichTreeView(
  items = fn_items,
  itemHeight = 48,
  defaultExpandedItems = list("muiCharts")
)
```

## DOM structure

By default, the children of an item are rendered inside it
(`domStructure = "nested"`). Use `domStructure = "flat"` to render all
the items as siblings, with an indentation that reflects their depth.
[MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#dom-structure)

``` r

RichTreeView(
  items = fn_items,
  domStructure = "flat",
  defaultExpandedItems = list("muiCharts", "muiCharts-charts")
)
```

## Track item clicks

Use `onItemClick` to know which item was clicked. In Shiny, send the
clicked id to the server with
`onItemClick = setInput("clickedItem", 1)`. On this page, which runs
without a Shiny server, a
[`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html)
function writes it below the tree instead. [MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#track-item-clicks)

``` r

div(
  RichTreeView(
    items = fn_items,
    onItemClick = JS(
      "(event, itemId) => { document.getElementById('rtv-click').textContent = itemId; }"
    )
  ),
  tags$pre("Last clicked item: ", tags$span(id = "rtv-click", "none"))
)
```


    Last clicked item: 
    none

See [Shiny](https://felixluginbuhl.com/muiTreeView/articles/shiny.md)
for complete apps.

## Imperative API

The MUI imperative API (`apiRef`, e.g. to get an item, its parent or its
children from JavaScript) relies on a React hook, which is not available
from R. In R, you can look up the same information in the data frame.
[MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#imperative-api)

## API

- [`RichTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/RichTreeView.md)
  – [MUI API](https://mui.com/x/api/tree-view/rich-tree-view/)
- [`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)
  – [MUI API](https://mui.com/x/api/tree-view/tree-item/)
- [`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md)
