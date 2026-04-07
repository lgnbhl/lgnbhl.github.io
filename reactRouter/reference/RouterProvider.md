# RouterProvider

<https://reactrouter.com/6.30.0/routers/router-provider>

## Usage

``` r
RouterProvider(..., type = c("hash", "memory", "browser"))
```

## Arguments

- ...:

  [`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
  elements, typically via
  [`createRoutesFromElements`](https://felixluginbuhl.com/reactRouter/reference/createRoutesFromElements.md).

- type:

  Character. One of `"hash"` (default), `"memory"`, or `"browser"`.

## Value

A RouterProvider component.

## Details

A unified wrapper around data routers. Use the `type` argument to select
the router variant: `"hash"` (default), `"memory"`, or `"browser"`.
Internally equivalent to
[`createHashRouter`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
[`createMemoryRouter`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md),
or
[`createBrowserRouter`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md).
