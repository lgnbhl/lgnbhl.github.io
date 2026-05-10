# replaceResponse (loader/action helper)

<https://api.reactrouter.com/v7/functions/react-router.replace.html>

## Usage

``` r
replaceResponse(to)
```

## Arguments

- to:

  Character. Destination path.

## Value

A [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
expression suitable for the `loader` argument of
[`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md).

## Details

Returns a
[`JS`](https://appsilon.github.io/shiny.react/reference/JS.html) loader
function that performs a *replace* navigation to `to` – same as
[`redirect`](https://felixluginbuhl.com/reactRouter/reference/redirect.md),
but the new entry replaces the current one in the history stack instead
of pushing a new one. Use for "alias" routes where the original URL
should not remain in the user's back-history.

Renamed from [`replace()`](https://rdrr.io/r/base/replace.html) to avoid
masking [`base::replace`](https://rdrr.io/r/base/replace.html). This
mirrors the
[`dataResponse()`](https://felixluginbuhl.com/reactRouter/reference/dataResponse.md)
naming for the same reason.

For conditional replacements inside a custom loader/action, call
`window.jsmodule['@/reactRouter'].helpers.replace(to)` from your own
[`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html)
string.

## Examples

``` r
if (FALSE) { # \dontrun{
Route(path = "/legacy", loader = replaceResponse("/new"), element = NULL)
} # }
```
