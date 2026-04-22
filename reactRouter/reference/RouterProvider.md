# RouterProvider

<https://api.reactrouter.com/v7/functions/react-router.RouterProvider.html>

## Usage

``` r
RouterProvider(router, fallbackElement = NULL)
```

## Arguments

- router:

  A router element produced by
  [`createHashRouter`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
  [`createBrowserRouter`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md),
  or
  [`createMemoryRouter`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md).

- fallbackElement:

  Element shown while the initial route's loader is resolving.

## Value

A RouterProvider component.

## Details

Renders a data router. Mirrors the React Router v7 composition pattern:
pass a router built with
[`createHashRouter`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
[`createBrowserRouter`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md),
or
[`createMemoryRouter`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md)
to the `router` argument.
