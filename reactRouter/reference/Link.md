# Link

<https://api.reactrouter.com/v7/variables/react-router.Link.html>

<https://api.reactrouter.com/v7/variables/react-router.Link.html>

## Usage

``` r
Link(..., reloadDocument = FALSE)

Link.shinyInput(inputId, ..., reloadDocument = TRUE)

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

  Boolean. Default TRUE. Let browser handle the transition normally

- inputId:

  ID of the component.

- session:

  Object passed as the \`session\` argument to Shiny server.

## Value

A Link component.

## Details

The \`reloadDocument\` prop controls whether clicking the link triggers
a full page reload (\`TRUE\`) or client-side navigation (\`FALSE\`). The
default is \`FALSE\`, matching React Router's own default. Set
\`reloadDocument = TRUE\` in Shiny apps that use server-rendered UI
(\`uiOutput\`/\`renderUI\`) so that Shiny can re-initialize and read the
new URL hash.
