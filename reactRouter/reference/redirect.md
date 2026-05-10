# redirect (loader/action helper)

<https://api.reactrouter.com/v7/functions/react-router.redirect.html>

## Usage

``` r
redirect(to)
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
function that redirects to `to`. Pass as the `loader` argument of a
[`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md) to
perform an unconditional redirect – typically used for guard routes that
always send the user somewhere else.

**Security:** `to` must be a trusted, package-author-controlled string.
`javascript:`, `data:`, and `vbscript:` URL schemes are rejected. If you
build `to` from user-supplied input, validate it yourself before passing
it in – never round-trip untrusted strings through `redirect()` into a
navigation.

For conditional redirects inside a custom loader/action, call
`window.jsmodule['@/reactRouter'].helpers.redirect(to)` from your own
[`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html)
string, e.g.


      loader = JS(
        "async () => {
           const { redirect } = window.jsmodule['@/reactRouter'].helpers;
           if (!authed()) return redirect('/login'); ...
         }"
      )

The `data`, `replace`, and `redirectDocument` helpers are exposed on the
same namespace.

## Examples

``` r
if (FALSE) { # \dontrun{
Route(path = "/old", loader = redirect("/new"), element = NULL)
} # }
```
