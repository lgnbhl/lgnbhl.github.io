# Overview

> Original MUI X documentation: [Tree View -
> Overview](https://mui.com/x/react-tree-view/) and
> [Quickstart](https://mui.com/x/react-tree-view/quickstart/). The
> examples of this documentation are written for R.

**muiTreeView** gives access to [MUI X Tree
View](https://mui.com/x/react-tree-view/) React components, which let
users navigate hierarchical lists of data with nested levels that can be
expanded and collapsed. It works in Shiny apps, Quarto documents, R
Markdown and in static HTML pages.

## Install

``` r

install.packages("muiTreeView")
# or the development version
remotes::install_github("lgnbhl/muiTreeView")
```

``` r

library(muiTreeView)
```

## Community version only

MUI X Tree View ships in two packages: the free **Community** version
(`@mui/x-tree-view`, MIT license) and the commercial **Pro** version
(`@mui/x-tree-view-pro`). **muiTreeView** wraps the Community version
only, so the Pro features (virtualization, lazy loading, drag and drop
ordering) are not available. [MUI
docs](https://mui.com/x/react-tree-view/)

## Simple Tree View or Rich Tree View?

The Tree View comes as two components:

- [`SimpleTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/SimpleTreeView.md)
  takes its items as
  [`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)
  children. It is the natural choice for navigation, such as a sidebar
  or a file explorer, where you write each item by hand and can put any
  UI in its label.
- [`RichTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/RichTreeView.md)
  takes its items as data, through the `items` argument. It is the
  natural choice for exploring a dataset: build the items from a data
  frame with
  [`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md).

### Rich Tree View from a data frame

[`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md)
turns the columns of a data frame into the levels of the tree. Here, a
selection of the functions of three companion packages,
[**muiMaterial**](https://felixluginbuhl.com/muiMaterial/),
[**muiCharts**](https://felixluginbuhl.com/muiCharts/) and
[**reactRouter**](https://felixluginbuhl.com/reactRouter/), grouped by
package and topic:

``` r

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
head(fns)
#>       package  group        fn
#> 1 muiMaterial Layout       Box
#> 2 muiMaterial Layout     Stack
#> 3 muiMaterial Layout      Grid
#> 4 muiMaterial Inputs    Button
#> 5 muiMaterial Inputs TextField
#> 6 muiMaterial Inputs    Slider

RichTreeView(
  items = asMuiTree(fns)
)
```

See [Data frames with
asMuiTree()](https://felixluginbuhl.com/muiTreeView/articles/data-frames.md)
for stable ids, extra fields and tibbles. [MUI
docs](https://mui.com/x/react-tree-view/rich-tree-view/items/#basic-usage)

### Simple Tree View for navigation

``` r

SimpleTreeView(
  defaultExpandedItems = list("muiMaterial"),
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

[MUI
docs](https://mui.com/x/react-tree-view/simple-tree-view/items/#basics)

## Main features

``` r

RichTreeView(
  items = asMuiTree(fns),
  checkboxSelection = TRUE,
  multiSelect = TRUE
)
```

| Feature | Simple Tree View | Rich Tree View |
|----|----|----|
| Items | [Items](https://felixluginbuhl.com/muiTreeView/articles/simple-tree-view-items.md) | [Items](https://felixluginbuhl.com/muiTreeView/articles/rich-tree-view-items.md) |
| Selection | [Selection](https://felixluginbuhl.com/muiTreeView/articles/simple-tree-view-selection.md) | [Selection](https://felixluginbuhl.com/muiTreeView/articles/rich-tree-view-selection.md) |
| Expansion | [Expansion](https://felixluginbuhl.com/muiTreeView/articles/simple-tree-view-expansion.md) | [Expansion](https://felixluginbuhl.com/muiTreeView/articles/rich-tree-view-expansion.md) |
| Customization | [Customization](https://felixluginbuhl.com/muiTreeView/articles/simple-tree-view-customization.md) | [Customization](https://felixluginbuhl.com/muiTreeView/articles/rich-tree-view-customization.md) |
| Label editing | – | [Label editing](https://felixluginbuhl.com/muiTreeView/articles/rich-tree-view-editing.md) |

The [Tree Item
customization](https://felixluginbuhl.com/muiTreeView/articles/tree-item-customization.md)
and
[Accessibility](https://felixluginbuhl.com/muiTreeView/articles/accessibility.md)
pages apply to both components.

## In an app

- [Shiny](https://felixluginbuhl.com/muiTreeView/articles/shiny.md):
  send the selection, expansion and clicks to the server with
  [`setInput()`](https://appsilon.github.io/shiny.react/reference/setInput.html).
- [reactRouter](https://felixluginbuhl.com/muiTreeView/articles/react-router.md):
  use a tree view as the navigation of a multi-page app, without a Shiny
  server.
- [Theming](https://felixluginbuhl.com/muiTreeView/articles/theming.md):
  use a muiMaterial theme, dark mode, and avoid Bootstrap conflicts.

Every exported function also has a runnable Shiny example:

``` r

list.files(system.file("examples", package = "muiTreeView"))
source(system.file("examples/RichTreeView.R", package = "muiTreeView"))
```

## Use other MUI products

MUI X Tree View is developed by MUI, the company behind the popular
React framework Material UI. **muiTreeView** is a companion to the R
package [**muiMaterial**](https://felixluginbuhl.com/muiMaterial/),
which provides access to all Material UI components from R.

## API

- [`SimpleTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/SimpleTreeView.md)
  – [MUI API](https://mui.com/x/api/tree-view/simple-tree-view/)
- [`RichTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/RichTreeView.md)
  – [MUI API](https://mui.com/x/api/tree-view/rich-tree-view/)
- [`TreeItem()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItem.md)
  – [MUI API](https://mui.com/x/api/tree-view/tree-item/)
- [`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md)
