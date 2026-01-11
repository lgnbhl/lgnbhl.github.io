# muiMaterial

`muiMaterial` brings [Material
UI](https://mui.com/material-ui/getting-started/), a popular React
component library, to R and Shiny.

## Use cases

**Give your dashboards a unique look**

Do you have the feeling that all Shiny apps looks the same?

It is because they are generally using the Bootstrap framework. Its
strength is also its weakness: a high level of standardization.

Developed by the company MUI, Material UI is probably the most popular
React component library. It provides UI tools to easily customize Web
applications.

Break free from Bootstrap and give `muiMaterial` a try.

For example, launch a basic dashboard:

``` r
# remotes::install_github("lgnbhl/muiMaterial")
muiMaterial::muiMaterialExample("dashboard-simple")
```

Or have a look at the R replica of the official dashboard template:

``` r
muiMaterial::muiMaterialExample("mui-template-dashboard")
```

**Create new UI features easily**

Material UI allows to fully customize your dashboards by providing a
rich library of UI components.

Thanks to React, [UI
components](https://felixluginbuhl.com/muiMaterial/articles/) can be
easily combined together.

For example, you can create a custom
[`Card()`](https://felixluginbuhl.com/muiMaterial/reference/Card.md)
with
[`Typography()`](https://felixluginbuhl.com/muiMaterial/reference/Typography.md):

``` r
# remotes::install_github("lgnbhl/muiMaterial")
library(muiMaterial)

Card(
  sx = list(p = 3),
  Typography(
    "Material UI weekly downloads",
    variant = "h6",
    gutterBottom = TRUE
  ),
  Typography(
    "5.8M",
    variant = "h3",
    fontWeight = "bold"
  )
)
```

By comparison,
[here](https://rstudio.github.io/bslib/articles/custom-components/index.html)
is the more complex custom component example for `bslib`.

**Flexible Navigation**

With the [reactRouter](https://felixluginbuhl.com/reactRouter) R
package, you can build a complex and advanced web application with
Material UI.

Create multi-page MUI dashboards with [client-side
routing](https://felixluginbuhl.com/muiMaterial/articles/routing.html).

You are not blocked in standardized Shiny layouts, like in Bootstrap’s
based R packages such as `bslib` or `bs4Dash`.

**Rich Ecosystem**

Extend functionality with companion R packages:

- [muiDataGrid](https://felixluginbuhl.com/muiDataGrid/) - Feature-rich
  data tables with sorting, filtering, and editing
- [muiCharts](https://felixluginbuhl.com/muiCharts/) - Beautiful,
  responsive charts
- [muiTreeView](https://felixluginbuhl.com/muiTreeView/) - Hierarchical
  tree navigation

## Key Concepts

**Shiny Input Wrappers**

Material UI components become Shiny inputs through `*.shinyInput()`
wrapper functions. For example, use
[`Button.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Button.md)
instead of
[`Button()`](https://felixluginbuhl.com/muiMaterial/reference/Button.md)
to capture click events in Shiny.

Explore available Shiny inputs now:

``` r
muiMaterial::muiMaterialExample("showcase")
```

**Bootstrap-Free Pages**

**muiMaterial** conflicts with Bootstrap CSS (used in
[`shiny::fluidPage()`](https://rdrr.io/pkg/shiny/man/fluidPage.html) and
similar functions). Use
[`muiMaterialPage()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialPage.md)
instead and wrap your UI in
[`CssBaseline()`](https://felixluginbuhl.com/muiMaterial/reference/CssBaseline.md)
to normalize styles. Customize styling with the `sx` argument
(CSS-in-JS).

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

**Server side Shiny rendering**

When rendering a component from the server in R Shiny, always use
[`shiny::renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html) or
[`shiny.react::renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html)
in the server. The rendering in the UI side can be done with
[`shiny::uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) or
[`shiny.react::reactOutput()`](https://appsilon.github.io/shiny.react/reference/reactOutput.html).

**Tabs**

To create Tabs, you should not use
[`Tabs()`](https://felixluginbuhl.com/muiMaterial/reference/Tabs.md) but
instead
[`TabContext.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabContext.md)
with
[`TabList.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabList.md)
and
[`TabPanel.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabPanel.md)
(see
[example](https://github.com/lgnbhl/muiMaterial/blob/main/inst/examples/Tabs.R)).

**Read the full documentation with examples
[here](https://lgnbhl.github.io/muiMaterial).**

## Install

``` r
remotes::install_github("lgnbhl/muiMaterial")
```

## Contributing

Found a bug or have a feature request? Open an issue at
<https://github.com/lgnbhl/muiMaterial>

## More Information

- [Documentation](https://felixluginbuhl.com/muiMaterial/)
- [All
  Examples](https://github.com/lgnbhl/muiMaterial/tree/main/inst/examples)
- [Material UI
  Documentation](https://mui.com/material-ui/getting-started/)

Follow [Felix Luginbuhl](https://linkedin.com/in/FelixLuginbuhl) on
LinkedIn for updates.
