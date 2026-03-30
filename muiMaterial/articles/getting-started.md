# Getting Started

``` r
library(muiMaterial)
library(shiny)
```

## Getting Started

### Installation

``` r
install.packages("muiMaterial")
```

Or install the development version:

``` r
remotes::install_github("lgnbhl/muiMaterial")
```

### Your first Material UI app

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

### Shiny input wrappers

Material UI components become Shiny inputs with `*.shinyInput()`
wrappers. For example, use
[`Button.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Button.md)
instead of
[`Button()`](https://felixluginbuhl.com/muiMaterial/reference/Button.md)
to capture user interactions in Shiny.

Explore available Shiny inputs with the showcase app (live
[here](https://lgnbhl-muimaterial-showcase.share.connect.posit.cloud/)):

``` r
muiMaterial::muiMaterialExample("showcase")
```

### Server-side rendering

When rendering components from the server, use
[`shiny::renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html) or
[`shiny.react::renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html)
in your server function, and
[`shiny::uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) or
[`shiny.react::reactOutput()`](https://appsilon.github.io/shiny.react/reference/reactOutput.html)
in your UI.

### Creating tabs

Use
[`TabContext.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabContext.md),
[`TabList.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabList.md),
and
[`TabPanel.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabPanel.md)
instead of the basic
[`Tabs()`](https://felixluginbuhl.com/muiMaterial/reference/Tabs.md)
component (which currently doesn’t work). See [full
example](https://github.com/lgnbhl/muiMaterial/blob/main/inst/examples/Tabs.R).

For more advanced navigation, use client-side routing with
[reactRouter](https://felixluginbuhl.com/reactRouter/).

### Styling with sx

Customize any component using the `sx` argument for inline CSS-in-JS
styling:

``` r
Box(
  sx = list(
    bgcolor = "primary.main",
    color = "white",
    p = 3,
    borderRadius = 2
  ),
  Typography("Styled with sx", variant = "h5")
)
```

It is more powerful and maintainable than traditional CSS. See the [MUI
sx documentation](https://mui.com/system/getting-started/the-sx-prop/)
for all available properties.
