# Theming

This page is specific to R. It shows how the Tree View follows the
Material UI [theme](https://mui.com/material-ui/customization/theming/),
set with the [**muiMaterial**](https://felixluginbuhl.com/muiMaterial/)
package. To style the parts of the items, see [Simple Tree View -
Customization](https://felixluginbuhl.com/muiTreeView/articles/simple-tree-view-customization.html#custom-styling).

``` r

library(muiTreeView)
library(muiMaterial)
```

``` r

fns <- data.frame(
  package = c("muiMaterial", "muiMaterial", "muiMaterial", "muiCharts", "muiCharts", "reactRouter", "reactRouter", "reactRouter"),
  fn = c("Button", "TextField", "Drawer", "BarChart", "PieChart", "Route", "NavLink", "useParams")
)
fns$fn_id <- paste0(fns$package, "::", fns$fn)
fn_items <- asMuiTree(fns, levels = c("package", "fn"), levels_id = c("package", "fn_id"))
```

## Theme and dark mode

The tree view shares muiMaterial’s MUI runtime, so a
[`muiMaterial::ThemeProvider()`](https://felixluginbuhl.com/muiMaterial/reference/ThemeProvider.html)
applies to it. The selection, focus and checkbox colors follow the
theme, including dark mode.

The items inherit their text color from their parent. Set
`color = "text.primary"` on the surrounding container so that the text
follows the theme too. Alternatively, place
[`CssBaseline()`](https://felixluginbuhl.com/muiMaterial/reference/CssBaseline.html)
inside the
[`ThemeProvider()`](https://felixluginbuhl.com/muiMaterial/reference/ThemeProvider.html)
to apply the theme’s colors to the whole page:

``` r

ThemeProvider(
  theme = list(
    palette = list(
      mode = "dark",
      primary = list(main = "#9819d2")
    )
  ),
  Box(
    sx = list(p = 2, bgcolor = "background.default", color = "text.primary"),
    RichTreeView(
      items = fn_items,
      checkboxSelection = TRUE,
      multiSelect = TRUE,
      defaultExpandedItems = list("muiCharts"),
      defaultSelectedItems = list("muiCharts::BarChart", "muiCharts::PieChart")
    )
  )
)
```

## Theme values in `sx`

The `sx` argument accepts the theme values, such as the palette colors
(`"primary.main"`, `"text.secondary"`, `"divider"`…) and the spacing
units:

``` r

RichTreeView(
  items = fn_items,
  sx = list(
    color = "primary.main",
    fontWeight = "bold",
    "& .MuiTreeItem-groupTransition" = list(color = "text.secondary", fontWeight = "normal")
  ),
  defaultExpandedItems = list("reactRouter")
)
```

## Bootstrap conflict

**muiTreeView** can conflict with the Bootstrap CSS framework, used by
default in Shiny functions such as
[`shiny::fluidPage()`](https://rdrr.io/pkg/shiny/man/fluidPage.html) and
friends.

Use
[`muiMaterial::muiMaterialPage()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialPage.html)
and
[`muiMaterial::CssBaseline()`](https://felixluginbuhl.com/muiMaterial/reference/CssBaseline.html)
to avoid Bootstrap and get a normalized CSS. See the
[**muiMaterial**](https://felixluginbuhl.com/muiMaterial/articles/bootstrap.html)
docs for more information.

``` r

library(shiny)

ui <- muiMaterialPage(
  CssBaseline(),
  RichTreeView(items = fn_items)
)

shinyApp(ui, function(input, output, session) {})
```

## Security notes

- [`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html)
  code runs in the browser of every visitor. Only pass fixed code to it;
  never build the string with
  [`paste0()`](https://rdrr.io/r/base/paste.html) or `glue()` from user
  input, URL parameters, files or databases. Put the data in the `items`
  (or other arguments) and read it inside the function,
  e.g. `getItemLabel = JS("(item) => item.name")`. To embed values
  computed from your own data, serialize them with
  [`jsonlite::toJSON()`](https://jeroen.r-universe.dev/jsonlite/reference/fromJSON.html),
  which escapes them.
- Labels given as plain strings are escaped. Never wrap untrusted text
  in
  [`HTML()`](https://rstudio.github.io/htmltools/reference/HTML.html),
  which is rendered as markup.
- Values sent to Shiny come from the browser and can be forged: see
  [Shiny](https://felixluginbuhl.com/muiTreeView/articles/shiny.html#security-notes).

## API

- [`muiMaterial::ThemeProvider()`](https://felixluginbuhl.com/muiMaterial/reference/ThemeProvider.html)
- [`RichTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/RichTreeView.md)
  – [MUI API](https://mui.com/x/api/tree-view/rich-tree-view/)
- [`SimpleTreeView()`](https://felixluginbuhl.com/muiTreeView/reference/SimpleTreeView.md)
  – [MUI API](https://mui.com/x/api/tree-view/simple-tree-view/)
