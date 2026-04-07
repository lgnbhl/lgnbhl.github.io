# createRoutesFromElements

<https://reactrouter.com/6.30.0/utils/create-routes-from-elements>

## Usage

``` r
createRoutesFromElements(...)
```

## Arguments

- ...:

  [`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
  elements.

## Value

A tag list of Route elements.

## Details

Wraps
[`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
elements for use with
[`createBrowserRouter`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md),
[`createHashRouter`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
or
[`createMemoryRouter`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md).
The actual conversion from JSX elements to route objects happens on the
JavaScript side.
