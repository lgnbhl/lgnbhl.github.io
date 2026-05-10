# Print reactRouter components

When called interactively, renders the component in the IDE viewer
panel. Otherwise, falls back to standard shiny.tag printing (raw HTML
text).

## Usage

``` r
# S3 method for class 'reactRouter'
print(x, browse = interactive(), ...)
```

## Arguments

- x:

  A reactRouter object (also inherits shiny.tag).

- browse:

  Whether to render in viewer. Defaults to TRUE in interactive sessions.

- ...:

  Additional arguments passed to print.

## Value

Invisibly returns x.

## Details

Only the router-root constructors carry the `"reactRouter"` S3 class and
therefore dispatch to this method:
[`RouterProvider`](https://felixluginbuhl.com/reactRouter/reference/RouterProvider.md),
[`createHashRouter`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
[`createBrowserRouter`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md),
[`createMemoryRouter`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md),
[`HashRouter`](https://felixluginbuhl.com/reactRouter/reference/HashRouter.md),
[`BrowserRouter`](https://felixluginbuhl.com/reactRouter/reference/BrowserRouter.md),
and
[`MemoryRouter`](https://felixluginbuhl.com/reactRouter/reference/MemoryRouter.md).
Inner pieces
([`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md),
[`Link`](https://felixluginbuhl.com/reactRouter/reference/Link.md),
[`Outlet`](https://felixluginbuhl.com/reactRouter/reference/Outlet.md),
hooks, ...) are plain `shiny.tag` elements – printing one of those on
its own is rarely useful (it has no router context to render against),
so they intentionally fall through to the default `shiny.tag` print
method.
