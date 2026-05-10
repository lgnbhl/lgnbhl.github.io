# dataResponse (loader/action helper)

<https://api.reactrouter.com/v7/functions/react-router.data.html>

## Usage

``` r
dataResponse(value, init = NULL)
```

## Arguments

- value:

  The payload to expose via
  [`useLoaderData()`](https://felixluginbuhl.com/reactRouter/reference/useLoaderData.md)
  /
  [`useActionData()`](https://felixluginbuhl.com/reactRouter/reference/useActionData.md).
  Either an R object (list, vector, data.frame – serialized to JSON), or
  a [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  expression for a JavaScript value.

- init:

  Optional. Either a list with `status` (integer), `statusText`
  (character) and/or `headers` (named list), or a
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  expression evaluating to such an object.

## Value

A [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
expression suitable for the `loader` or `action` argument of
[`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md).

## Details

Returns a
[`JS`](https://appsilon.github.io/shiny.react/reference/JS.html) loader
function that resolves to a React Router
[`data()`](https://rdrr.io/r/utils/data.html) response – a thin wrapper
that lets you attach an HTTP `status`, `statusText`, and/or `headers`
alongside the loader/action payload while still exposing `value` via
[`useLoaderData`](https://felixluginbuhl.com/reactRouter/reference/useLoaderData.md)
/
[`useActionData`](https://felixluginbuhl.com/reactRouter/reference/useActionData.md).

Use the R helper for static loaders that always return the same value
plus status. For values computed inside a custom loader/action, call
`window.jsmodule['@/reactRouter'].helpers.data(value, init)` directly in
your [`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html)
string, e.g.


      loader = JS("async () => {
        const { data } = window.jsmodule['@/reactRouter'].helpers;
        const rows = await fetchRows();
        return data({ rows }, { status: 200 });
      }")

## Examples

``` r
if (FALSE) { # \dontrun{
Route(
  path = "/profile",
  loader = dataResponse(
    list(name = "Ada", role = "Engineer"),
    init = list(status = 200)
  ),
  element = useLoaderData(tags$pre())
)
} # }
```
