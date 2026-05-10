# Link

<https://api.reactrouter.com/v7/variables/react-router.Link.html>

<https://api.reactrouter.com/v7/variables/react-router.Link.html>

**Repeat clicks.** The Shiny input value is the link's `to` string.
Clicking the same link twice publishes the same value, and Shiny
suppresses identical-value updates by default — your
`observeEvent(input$myLink, ...)` will fire only on the first click. If
you need to react to every click (e.g. logging, refreshing a panel),
bind to a counter or use
`shiny::observeEvent(..., ignoreNULL = FALSE, priority = "event")`
alongside an explicit click counter, or wrap the click target in a
regular
[`shiny::actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html)
that triggers the navigation programmatically.

## Usage

``` r
Link(..., reloadDocument = FALSE)

Link.shinyInput(inputId, ..., reloadDocument = FALSE)

updateLink.shinyInput(
  session = shiny::getDefaultReactiveDomain(),
  inputId,
  ...
)
```

## Arguments

- ...:

  Props to pass to element.

- reloadDocument:

  Boolean. Default FALSE. Let browser handle the transition normally

- inputId:

  ID of the component.

- session:

  For `updateLink.shinyInput()` /
  [`updateNavLink.shinyInput()`](https://felixluginbuhl.com/reactRouter/reference/NavLink.md)
  only: the Shiny session object. Defaults to the current reactive
  domain. Not used by `Link.shinyInput()` /
  [`NavLink.shinyInput()`](https://felixluginbuhl.com/reactRouter/reference/NavLink.md)
  themselves.

## Value

A Link component.

## Details

The \`reloadDocument\` prop controls whether clicking the link uses
React Router's client-side navigation (\`FALSE\`, the default) or skips
it and lets the browser handle the click natively (\`TRUE\`). The
default is correct for almost every use, including Shiny apps with
server-rendered output (\`uiOutput\`, \`renderUI\`, \`plotOutput\`,
htmlwidgets) — Shiny output bindings re-attach automatically when React
Router mounts the new route's element. See \`vignette("routers", package
= "reactRouter")\` for details.

**Two flavors.** Pick `Link()` for a plain navigation link (the common
case, mirroring React Router's API one-to-one). Pick `Link.shinyInput()`
only when you also need the click to fire a Shiny input on the server —
it adds an `inputId` that updates with the link's `to` every time it is
clicked, while still navigating. If in doubt, use `Link()`.
