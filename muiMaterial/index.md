# muiMaterial

`muiMaterial` brings Material UI, the popular React components library,
to R and Shiny.

## Why using it?

#### Give your dashboards a unique look

Want to go beyond the standardised layout used by most Shiny dashboards?

If Shiny apps look all the same, it is because most use Bootstrap.
Replacing it with Material UI will take your dashboards to the next
level.

Developed by the company MUI, [Material
UI](https://mui.com/material-ui/getting-started/) is probably the most
popular React components library globally. `muiMaterial` allows access
to its vast library of UI tools, so you can create fully customized
dashboards and websites in R.

For example, launch a basic dashboard:

``` r
# remotes::install_github("lgnbhl/muiMaterial")
muiMaterial::muiMaterialExample("dashboard-simple")
```

Or have a look at the R replica of the official MUI dashboard template:

``` r
muiMaterial::muiMaterialExample("mui-template-dashboard")
```

#### Building custom components easily

Creating custom UI elements is simple. Here’s an example of a stat card:

``` r
Card(
  sx = list(p = 3),
  Typography("Material UI weekly downloads", variant = "h6", gutterBottom = TRUE),
  Typography("5.8M", variant = "h3", fontWeight = "bold")
)
```

Material UI’s component library makes customization intuitive. Just
compose components like building blocks.

#### Flexible Navigation

With the [reactRouter](https://felixluginbuhl.com/reactRouter) R
package, you can build a complex and multi-page websites thanks to
[client-side
routing](https://felixluginbuhl.com/muiMaterial/articles/routing.html).

You are not blocked in standardized Shiny layouts, like in Bootstrap’s
based R packages such as `bslib` or `bs4Dash`.

#### Rich Ecosystem

Extend functionality with companion R packages:

- [muiDataGrid](https://felixluginbuhl.com/muiDataGrid/) - Professional
  data tables with filtering, sorting, and inline editing
- [muiCharts](https://felixluginbuhl.com/muiCharts/) - Beautiful,
  responsive charts
- [muiTreeView](https://felixluginbuhl.com/muiTreeView/) - Interactive
  tree navigation

## Quick start

#### Installation

``` r
install.packages("muiMaterial")
```

#### Your first Material UI app

``` r
library(shiny)
library(muiMaterial)

ui <- muiMaterialPage(
  CssBaseline(
    Box(
      sx = list(p = 2),
      Typography("Hello Material UI!", variant = "h4")
    )
  )
)

server <- function(input, output, session) {}

shinyApp(ui, server)
```

**Important**: Use
[`muiMaterialPage()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialPage.md)
instead of [`fluidPage()`](https://rdrr.io/pkg/shiny/man/fluidPage.html)
and wrap your UI in
[`CssBaseline()`](https://felixluginbuhl.com/muiMaterial/reference/CssBaseline.md)
to ensure proper styling. Material UI uses its own design system and
conflicts with Bootstrap.

#### Shiny Input Wrappers

Material UI components become Shiny inputs with `*.shinyInput()`
wrappers. For example, use
[`Button.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Button.md)
instead of
[`Button()`](https://felixluginbuhl.com/muiMaterial/reference/Button.md)
to capture user interactions in Shiny.

Explore available Shiny inputs with:

``` r
muiMaterial::muiMaterialExample("showcase")
```

#### Server side Shiny rendering

When rendering components from the server, use
[`shiny::renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html) or
[`shiny.react::renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html)
in your server function, and
[`shiny::uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) or
[`shiny.react::reactOutput()`](https://appsilon.github.io/shiny.react/reference/reactOutput.html)
in your UI.

#### Creating tabs

Use
[`TabContext.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabContext.md),
[`TabList.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabList.md),
and
[`TabPanel.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabPanel.md)
instead of the basic
[`Tabs()`](https://felixluginbuhl.com/muiMaterial/reference/Tabs.md)
component (which currently doesn’t work). [See full
example](https://github.com/lgnbhl/muiMaterial/blob/main/inst/examples/Tabs.R).

For more advanced use cases, it is preferabe to use client-side routing
with [reactRouter](https://felixluginbuhl.com/reactRouter).

#### Styling with sx

Customize any component using the `sx` argument for inline CSS-in-JS
styling. It’s more powerful and maintainable than traditional CSS.

**Read the full documentation with examples
[here](https://lgnbhl.github.io/muiMaterial).**

## Contributing

Found a bug or have a feature request? Open an issue at
<https://github.com/lgnbhl/muiMaterial>

## More Information

- [Package documentation](https://felixluginbuhl.com/muiMaterial/)
- [All R
  examples](https://github.com/lgnbhl/muiMaterial/tree/main/inst/examples)
- [Official Material UI
  docs](https://mui.com/material-ui/getting-started/)

Follow [Felix Luginbuhl](https://linkedin.com/in/FelixLuginbuhl) on
LinkedIn for updates.
