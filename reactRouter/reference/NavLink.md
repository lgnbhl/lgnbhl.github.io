# NavLink

<https://api.reactrouter.com/v7/variables/react-router.NavLink.html>

<https://api.reactrouter.com/v7/variables/react-router.NavLink.html>

**Repeat clicks.** The Shiny input value is the link's `to` string;
clicking the same link twice publishes the same value and Shiny
suppresses identical-value updates by default. See
[`Link.shinyInput`](https://felixluginbuhl.com/reactRouter/reference/Link.md)
for the workaround.

## Usage

``` r
NavLink(..., reloadDocument = FALSE)

NavLink.shinyInput(inputId, ..., reloadDocument = FALSE)

updateNavLink.shinyInput(
  session = shiny::getDefaultReactiveDomain(),
  inputId,
  ...
)
```

## Arguments

- ...:

  Props to pass to element.

- reloadDocument:

  Boolean. Default FALSE Let browser handle the transition normally

- inputId:

  ID of the component.

- session:

  For
  [`updateLink.shinyInput()`](https://felixluginbuhl.com/reactRouter/reference/Link.md)
  / `updateNavLink.shinyInput()` only: the Shiny session object.
  Defaults to the current reactive domain. Not used by
  [`Link.shinyInput()`](https://felixluginbuhl.com/reactRouter/reference/Link.md)
  / `NavLink.shinyInput()` themselves.

## Value

A NavLink component.

## Details

The \`reloadDocument\` prop controls whether clicking the link uses
React Router's client-side navigation (\`FALSE\`, the default) or skips
it and lets the browser handle the click natively (\`TRUE\`). The
default is correct for almost every use, including Shiny apps with
server-rendered output (\`uiOutput\`, \`renderUI\`, \`plotOutput\`,
htmlwidgets) — Shiny output bindings re-attach automatically when React
Router mounts the new route's element. See \`vignette("routers", package
= "reactRouter")\` for details.
