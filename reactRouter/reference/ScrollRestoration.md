# ScrollRestoration

<https://api.reactrouter.com/v7/functions/react-router.ScrollRestoration.html>

## Usage

``` r
ScrollRestoration(...)
```

## Arguments

- ...:

  Props to pass to element. Notable props: `getKey` (a
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  function to compute the scroll key from the location) and `storageKey`
  (Character, custom `sessionStorage` key).

## Value

A ScrollRestoration component.

## Details

Emulates the browser's scroll restoration on location changes after
loaders have completed. Place once inside the root layout of a data
router app. Requires a data router
([`createBrowserRouter`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md),
[`createHashRouter`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
etc.).
