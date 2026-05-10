# isRouteErrorResponse

<https://api.reactrouter.com/v7/functions/react-router.isRouteErrorResponse.html>

## Usage

``` r
isRouteErrorResponse()
```

## Value

A [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
expression evaluating to the `isRouteErrorResponse` function reference.

## Details

Returns a
[`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
reference to the `isRouteErrorResponse` type guard. Use it inside an
`errorElement` render callback to branch on whether the error came from
a thrown `Response` (e.g. `throw new Response(..., { status: 404 })`) or
from arbitrary code. Pair with
[`useRouteError`](https://felixluginbuhl.com/reactRouter/reference/useRouteError.md).

Calling `isRouteErrorResponse()` from R returns a
[`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
expression that evaluates, in the browser, to the upstream
`isRouteErrorResponse` function. Interpolate it inside the `render`
string of
[`useRouteError()`](https://felixluginbuhl.com/reactRouter/reference/useRouteError.md)
as shown below.

For convenience, the same function is also reachable inside any
user-authored
[`JS`](https://appsilon.github.io/shiny.react/reference/JS.html) string
as `window.jsmodule['@/reactRouter'].helpers.isRouteErrorResponse`.

## Examples

``` r
if (FALSE) { # \dontrun{
useRouteError(render = JS(paste0(
  "e => ", isRouteErrorResponse(),
  "(e) ? <p>HTTP {e.status}</p> : <p>Unknown error</p>"
)))
} # }
```
