# useRoutes

<https://api.reactrouter.com/v7/functions/react-router.useRoutes.html>

## Usage

``` r
useRoutes(..., routes = NULL)
```

## Arguments

- ...:

  [`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
  elements describing the route tree. Ignored if `routes` is supplied.

- routes:

  Optional. A
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  expression evaluating to a plain JavaScript array of route objects
  (e.g. `JS("[\{ path: '/', element: ... \}]")`), used in place of
  [`Route()`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
  children.

## Details

Builds a route tree from
[`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
children (or a plain object `routes` array) and renders the matched
route. The hook-based equivalent of
[`Routes`](https://felixluginbuhl.com/reactRouter/reference/Routes.md) /
`createRoutesFromElements` for code that prefers a configuration-as-data
style. Must be called inside a router
([`RouterProvider`](https://felixluginbuhl.com/reactRouter/reference/RouterProvider.md),
[`HashRouter`](https://felixluginbuhl.com/reactRouter/reference/HashRouter.md),
etc.).
