# redirectDocument (loader/action helper)

<https://api.reactrouter.com/v7/functions/react-router.redirectDocument.html>

## Usage

``` r
redirectDocument(to)
```

## Arguments

- to:

  Character. Destination path or absolute URL.

## Value

A [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
expression suitable for the `loader` argument of
[`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md).

## Details

Returns a
[`JS`](https://appsilon.github.io/shiny.react/reference/JS.html) loader
function that performs a *document* redirect to `to` – a full page
reload, as opposed to the client-side navigation that
[`redirect`](https://felixluginbuhl.com/reactRouter/reference/redirect.md)
performs. Use when navigating to a URL outside the router's control
(e.g. a server-rendered page) so the browser fully unloads the SPA.

For conditional document redirects inside a custom loader/action, call
`window.jsmodule['@/reactRouter'].helpers.redirectDocument(to)` from
your own
[`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html)
string.

## Examples

``` r
if (FALSE) { # \dontrun{
Route(
  path = "/docs",
  loader = redirectDocument("/static/docs/index.html"),
  element = NULL
)
} # }
```
