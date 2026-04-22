# createRoutesFromElements

<https://api.reactrouter.com/v7/variables/react-router.createRoutesFromElements.html>

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

Optional compatibility alias. In R,
[`createHashRouter`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
[`createBrowserRouter`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md),
and
[`createMemoryRouter`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md)
accept
[`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
elements directly, so wrapping them in `createRoutesFromElements()` is
not required. The function is kept so that examples copied verbatim from
the React Router v7 documentation
(`createHashRouter(createRoutesFromElements(...))`) keep working.

The actual JSX-to-route-object conversion always happens on the
JavaScript side; this R function simply bundles its arguments into a tag
list.
