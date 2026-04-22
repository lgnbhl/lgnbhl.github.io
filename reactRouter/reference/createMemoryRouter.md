# createMemoryRouter

<https://api.reactrouter.com/v7/functions/react-router.createMemoryRouter.html>

## Usage

``` r
createMemoryRouter(...)
```

## Arguments

- ...:

  [`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
  elements. Pass directly, or (optionally) wrapped in
  [`createRoutesFromElements`](https://felixluginbuhl.com/reactRouter/reference/createRoutesFromElements.md)
  to mirror the official React Router v7 API.

## Value

A createMemoryRouter component.

## Details

Creates a memory router using the data router API. Routing state is kept
in memory and the browser URL is never read or modified, making it
suitable for static HTML pages (`file://`), Quarto documents, and
embedded widgets where the real URL is irrelevant. Use with
[`createRoutesFromElements`](https://felixluginbuhl.com/reactRouter/reference/createRoutesFromElements.md)
and
[`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md).
