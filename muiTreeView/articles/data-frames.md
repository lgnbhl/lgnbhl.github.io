# Data frames with asMuiTree()

``` r

library(muiTreeView)
```

This page is specific to R.
[`RichTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/RichTreeView.md)
expects its `items` as a nested list, as described in the official [Rich
Tree View -
Items](https://mui.com/x/react-tree-view/rich-tree-view/items/#basic-usage)
docs. As R users mostly keep their data in data frames and tibbles,
[`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md)
builds that nested list from a data frame.

## From columns to levels

Each column given in `levels` becomes a level of the tree, in the given
order. By default, all the columns are used. Here, a selection of the
functions of the
[**muiMaterial**](https://felixluginbuhl.com/muiMaterial/),
[**muiCharts**](https://felixluginbuhl.com/muiCharts/) and
[**reactRouter**](https://felixluginbuhl.com/reactRouter/) packages:

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

Change the order or drop a column to look at the data from another
angle. Here, the topics come first, so the “Navigation” functions of
muiMaterial and reactRouter are grouped together:

``` r

RichTreeView(
  items = asMuiTree(fns, levels = c("group", "package", "fn"))
)
```

## The item structure

Each item is a list with an `id`, a `label` and, except at the last
level, `children`:

``` r

items <- asMuiTree(fns, levels = c("package", "fn"))
str(items[[1]], max.level = 2, list.len = 3)
#> List of 3
#>  $ label   : chr "muiMaterial"
#>  $ id      : chr "muiMaterial-6972885"
#>  $ children:List of 13
#>   ..$ :List of 2
#>   ..$ :List of 2
#>   ..$ :List of 2
#>   .. [list output truncated]
```

This is the structure described in the MUI docs: [item
identifier](https://mui.com/x/react-tree-view/rich-tree-view/items/#item-identifier),
[item
label](https://mui.com/x/react-tree-view/rich-tree-view/items/#item-label)
and [item
children](https://mui.com/x/react-tree-view/rich-tree-view/items/#item-children).

## Stable ids with `levels_id`

By default,
[`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md)
creates ids by joining the label with a random number
(e.g. `"muiCharts-4821937"`), so they change on each run. Stable ids are
needed to expand or select items by default, and to read the selection
in Shiny. Give one id column per level with `levels_id`:

``` r

fns$fn_id <- paste0(fns$package, "::", fns$fn)

RichTreeView(
  items = asMuiTree(
    fns,
    levels = c("package", "fn"),
    levels_id = c("package", "fn_id")
  ),
  defaultExpandedItems = list("muiCharts"),
  defaultSelectedItems = "muiCharts::BarChart"
)
```

Ids must not contain spaces. The `package::fn` ids read like R code, and
are unique even though `Link` and `Toolbar` exist in two packages.

### Repeated labels: use the path as id

Ids must be unique in the whole tree, but a label can appear under
several parents. Here, the group “Navigation” exists in muiMaterial and
in reactRouter. Build the ids from the path of the item:

``` r

# ids must not contain spaces
to_id <- function(x) gsub("[^a-z0-9]+", "-", tolower(x))

fns$group_id <- paste(fns$package, to_id(fns$group), sep = "-")
unique(fns$group_id)
#>  [1] "muiMaterial-layout"        "muiMaterial-inputs"       
#>  [3] "muiMaterial-navigation"    "muiMaterial-surfaces"     
#>  [5] "muiCharts-charts"          "muiCharts-building-blocks"
#>  [7] "reactRouter-routers"       "reactRouter-routes"       
#>  [9] "reactRouter-navigation"    "reactRouter-hooks"

RichTreeView(
  items = asMuiTree(
    fns,
    levels = c("package", "group", "fn"),
    levels_id = c("package", "group_id", "fn_id")
  ),
  defaultExpandedItems = list("muiMaterial", "muiMaterial-navigation", "reactRouter", "reactRouter-navigation")
)
```

## Labels with counts

A label is a string, so summaries can be added to it in R before calling
[`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md).
Here the number of functions is added to each package and group:

``` r

count <- function(...) ave(seq_along(fns$fn), ..., FUN = length)

fns$package_label <- paste0(fns$package, " (", count(fns$package), ")")
fns$group_label <- paste0(fns$group, " (", count(fns$package, fns$group), ")")

RichTreeView(
  items = asMuiTree(
    fns,
    levels = c("package_label", "group_label", "fn"),
    levels_id = c("package", "group_id", "fn_id")
  ),
  defaultExpandedItems = list("reactRouter")
)
```

To render the count in its own element instead, see the custom item in
[Rich Tree View -
Customization](https://felixluginbuhl.com/muiTreeView/articles/rich-tree-view-customization.html#custom-tree-item).

## Extra fields per level

Extra arguments named after a level column add fields to every item of
that level. The tree view ignores unknown fields, but you can read them
in functions such as `isItemDisabled`:

``` r

RichTreeView(
  items = asMuiTree(
    fns,
    levels = c("package", "group"),
    levels_id = c("package", "group_id"),
    package = list(disabled = TRUE)
  ),
  isItemDisabled = JS("(item) => !!item.disabled"),
  disabledItemsFocusable = TRUE,
  defaultExpandedItems = list("muiCharts")
)
```

With `disabledItemsFocusable = TRUE`, the disabled packages can still be
expanded with the keyboard. See [disabled
items](https://mui.com/x/react-tree-view/rich-tree-view/items/#disabled-items)
in the MUI docs.

## Missing values

Rows with a missing value (`NA`) at a level are dropped from that level
and below. Here, the group of `SparkLineChart` is missing, so it is not
in the tree:

``` r

charts <- data.frame(
  group = c("Charts", "Charts", "Charts", NA),
  fn = c("BarChart", "LineChart", "PieChart", "SparkLineChart")
)

RichTreeView(
  items = asMuiTree(charts, levels_id = c("group", "fn")),
  defaultExpandedItems = list("Charts")
)
```

Replace the missing values first to keep them:

``` r

charts$group[is.na(charts$group)] <- "Other"

RichTreeView(
  items = asMuiTree(charts, levels_id = c("group", "fn")),
  defaultExpandedItems = list("Charts", "Other")
)
```

## Tibbles

[`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md)
converts its input with
[`as.data.frame()`](https://rdrr.io/r/base/as.data.frame.html), so
tibbles work too:

``` r

library(dplyr)

hooks_and_charts <- as_tibble(fns) |>
  filter(startsWith(fn, "use") | endsWith(fn, "Chart")) |>
  select(package, fn) |>
  arrange(package, fn)

hooks_and_charts
#> # A tibble: 6 × 2
#>   package     fn           
#>   <chr>       <chr>        
#> 1 muiCharts   BarChart     
#> 2 muiCharts   LineChart    
#> 3 muiCharts   PieChart     
#> 4 reactRouter useLoaderData
#> 5 reactRouter useNavigate  
#> 6 reactRouter useParams

RichTreeView(
  items = asMuiTree(hooks_and_charts)
)
```

## Thanks

[`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md)
is adapted from
[`shinyWidgets::create_tree()`](https://dreamrs.github.io/shinyWidgets/reference/create_tree.html).
Thanks to the authors of shinyWidgets for their work!

## API

- [`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md)
- [`RichTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/RichTreeView.md)
  – [MUI API](https://mui.com/x/api/tree-view/rich-tree-view/)
