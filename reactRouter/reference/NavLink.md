# NavLink

The \`reloadDocument\` prop controls whether clicking the link triggers
a full page reload (\`TRUE\`) or client-side navigation (\`FALSE\`). The
default is \`FALSE\`, matching React Router's own default. Set
\`reloadDocument = TRUE\` in Shiny apps that use server-rendered UI
(\`uiOutput\`/\`renderUI\`) so that Shiny can re-initialize and read the
new URL hash.

<https://reactrouter.com/6.30.0/components/nav-link>

## Usage

``` r
NavLink(..., reloadDocument = FALSE)

NavLink.shinyInput(inputId, ..., reloadDocument = TRUE)

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

  Boolean. Default TRUE. Let browser handle the transition normally

- inputId:

  ID of the component.

- session:

  Object passed as the \`session\` argument to Shiny server.

## Value

A NavLink component.
