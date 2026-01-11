# HTML body without Bootstrap and margins

Creates a Material UI page without using CssBaseline, so you can use
regular Shiny inputs or shiny.router.

## Usage

``` r
muiMaterialPage(
  ...,
  materialSymbols = FALSE,
  addFontRoboto = FALSE,
  suppressBootstrap = TRUE,
  debugReact = FALSE
)
```

## Arguments

- ...:

  The contents of the document body.

- materialSymbols:

  List of Material Symbols to add with Google Font API, ex: c("home",
  "settings").

- addFontRoboto:

  Whether to add Roboto font with Google Font API.

- suppressBootstrap:

  Whether to suppress Bootstrap.

- debugReact:

  Whether to enable react debug mode. Default to FALSE.

## Value

html object with 'margin:0' which can be passed as the UI of a Shiny
app.

## Details

The Bootstrap library is suppressed by default, as it doesn't work well
with Material UI in general. Some default Material UI styles are apply,
i.e. the margin is removed for all browser and the font size.

<https://mui.com/material-ui/react-css-baseline/>
