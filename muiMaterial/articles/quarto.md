# Quarto and R Markdown

``` r

library(muiMaterial)
```

muiMaterial components render in [Quarto](https://quarto.org/) documents
and R Markdown HTML documents, without a Shiny server. Every page of
this website is an R Markdown document: all the live demos are rendered
this way.

## Rendering components

A code chunk that returns a muiMaterial component renders it in the
document:

```` markdown

``` r
library(muiMaterial)

Stack(
  direction = "row",
  spacing = 2,
  Button(variant = "contained", "Contained"),
  Chip(label = "A chip", color = "primary"),
  Rating(defaultValue = 3)
)
```

```{=html}
<div class="react-container" data-react-id="vhoipeyoohljamkajowk">
<script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Stack","props":{"type":"object","value":{"direction":{"type":"raw","value":"row"},"spacing":{"type":"raw","value":2},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Button","props":{"type":"raw","value":{"variant":"contained","children":"Contained"}}},{"type":"element","module":"@mui/material","name":"Chip","props":{"type":"raw","value":{"label":"A chip","color":"primary"}}},{"type":"element","module":"@mui/material","name":"Rating","props":{"type":"raw","value":{"defaultValue":3}}}]}}}}</script>
<script>jsmodule['@/shiny.react'].findAndRenderReactData('vhoipeyoohljamkajowk')</script>
</div>
```
````

Each chunk is its own React tree, so a
[`ThemeProvider()`](https://felixluginbuhl.com/muiMaterial/reference/ThemeProvider.md)
only applies to the components of its chunk.

## What works without a server

In a document, everything runs in the browser:

- **Uncontrolled components** keep their own state:
  `Rating(defaultValue = 3)`,
  [`Accordion()`](https://felixluginbuhl.com/muiMaterial/reference/Accordion.md),
  `Checkbox(defaultChecked = TRUE)`,
  [`TextField()`](https://felixluginbuhl.com/muiMaterial/reference/TextField.md),
  `Slider(defaultValue = 30)`, …
- **Tabs**:
  [`TabContext.static()`](https://felixluginbuhl.com/muiMaterial/reference/TabContext.md),
  [`TabList.static()`](https://felixluginbuhl.com/muiMaterial/reference/TabList.md)
  and
  [`TabPanel()`](https://felixluginbuhl.com/muiMaterial/reference/TabPanel.md)
  (see [Tabs](https://felixluginbuhl.com/muiMaterial/articles/tabs.md)).
- **Overlays**: the `.triggerId()` wrappers open dialogs, drawers, menus
  and popovers (see [Overlays with
  `.triggerId`](https://felixluginbuhl.com/muiMaterial/articles/triggerid.md)).
- **State in the URL**:
  [reactRouter](https://felixluginbuhl.com/reactRouter/) routes hold the
  state of controlled components (see
  [Dialog](https://felixluginbuhl.com/muiMaterial/articles/dialog.md)
  and [Using a
  router](https://felixluginbuhl.com/muiMaterial/articles/routing.md)).
- **JavaScript callbacks** written with
  [`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html).

The `.shinyInput()` wrappers render too, but they only report their
value to a Shiny server. For inputs that talk to R, use a Quarto
document with
[`server: shiny`](https://quarto.org/docs/interactive/shiny/) or a Shiny
app.

## `muiMaterialPage()` in documents

[`muiMaterialPage()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialPage.md)
is not required in a document, but it is the simplest way to load the
Google fonts:

``` r

muiMaterialPage(
  useMaterialIconsFilled = TRUE,
  Stack(direction = "row", spacing = 2, Icon("home"), Icon("favorite", color = "error"), Icon("star", color = "primary"))
)
```

The fonts (`useFontRoboto`, `useMaterialIcons*`) are added to the
document head, once even if several chunks request them.

[`muiMaterialPage()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialPage.md)
also removes Bootstrap by default (`suppressBootstrap = TRUE`):

- In **Quarto** and in **pkgdown** websites, the page theme is part of
  the page template, so it is not affected.
- In an **R Markdown `html_document`**, the Bootstrap theme is an HTML
  dependency, so it is removed and the document loses its styling. Use
  `muiMaterialPage(suppressBootstrap = FALSE, ...)` in R Markdown
  documents.

## `CssBaseline()` in documents

[`CssBaseline()`](https://felixluginbuhl.com/muiMaterial/reference/CssBaseline.md)
sets global styles on the page `<body>` (margin, background, font). In a
document, you may prefer
[`ScopedCssBaseline()`](https://felixluginbuhl.com/muiMaterial/reference/ScopedCssBaseline.md),
which only applies them to its children (see [CSS
Baseline](https://felixluginbuhl.com/muiMaterial/articles/css-baseline.md)).

## Quarto example

```` markdown
---
title: "My report"
format: html
---


```{=html}
<div class="react-container" data-react-id="wwiafyhwyaofqswjxvsa">
<script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Card","props":{"type":"object","value":{"sx":{"type":"raw","value":{"maxWidth":400}},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"CardHeader","props":{"type":"object","value":{"avatar":{"type":"element","module":"@mui/material","name":"Avatar","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"Icon","props":{"type":"raw","value":{"children":"insights"}}}}}},"title":{"type":"raw","value":"Summary"},"subheader":{"type":"raw","value":"Monthly report"}}}},{"type":"element","module":"@mui/material","name":"CardContent","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"variant":"body2","children":"All indicators are up this month."}}}}}},{"type":"element","module":"@mui/material","name":"CardActions","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"Button","props":{"type":"raw","value":{"id":"details-button","size":"small","children":"Details"}}}}}}]}}}}</script>
<script>jsmodule['@/shiny.react'].findAndRenderReactData('wwiafyhwyaofqswjxvsa')</script>
</div>
<div class="react-container" data-react-id="phctukbtnhgofqthwwbj">
<script class="react-data" type="application/json">{"type":"element","module":"@/muiMaterial","name":"MuiDialogTriggerId","props":{"type":"object","value":{"triggerId":{"type":"raw","value":"details-button"},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"DialogTitle","props":{"type":"raw","value":{"children":"Details"}}},{"type":"element","module":"@mui/material","name":"DialogContent","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"DialogContentText","props":{"type":"raw","value":{"children":"Details rendered without a server."}}}}}}]}}}}</script>
<script>jsmodule['@/shiny.react'].findAndRenderReactData('phctukbtnhgofqthwwbj')</script>
</div>
```
````
