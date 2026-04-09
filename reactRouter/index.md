# reactRouter

The goal of **reactRouter** is to provide a wrapper around [React Router
(v6)](https://reactrouter.com/6.30.0).

> \[!CAUTION\] **Breaking Change in v.0.1.2** : `reloadDocument` is now
> FALSE by default in
> [`NavLink()`](https://felixluginbuhl.com/reactRouter/reference/NavLink.md)
> and
> [`Link()`](https://felixluginbuhl.com/reactRouter/reference/Link.md).
> Set `reloadDocument = TRUE` only when target routes contain Shiny
> server-rendered output like
> [`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) /
> [`renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html).

### Usage

You can easily add URL pages in a Quarto document or R Shiny app like
so:

``` r

library(reactRouter)

RouterProvider(
  Route(
    path = "/",
    element = div(
      NavLink(to = "/", "Main"),
      NavLink(to = "/analysis", "Analysis"),
      Outlet()
    ),
    Route(index = TRUE, element = "Main content"),
    Route(path = "analysis", element = "Analysis content")
  )
)
```

### Install

``` r

#remotes::install_github("lgnbhl/reactRouter") # development version

install.packages("reactRouter")
```

### Example

Get started with a showcase example:

``` r

# print all examples available: reactRouterExample()
reactRouterExample("dynamic-segment")
```

Read the vignette
[here](https://felixluginbuhl.com/reactRouter/articles/introduction.html)
for detailed use cases with Quarto and R Shiny.

### Choosing a router

The simplest way to add routing is
[`RouterProvider()`](https://felixluginbuhl.com/reactRouter/reference/RouterProvider.md),
which defaults to hash-based routing and works in Shiny apps, static
HTML, and Quarto documents:

``` r

RouterProvider(
  Route(path = "/", element = ..., Route(...))
)
# type = "hash" (default) — URL shows /#/about, bookmarkable
# type = "memory"         — URL never changes, great for embedded widgets
```

Lower-level functions
([`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
[`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md),
[`HashRouter()`](https://felixluginbuhl.com/reactRouter/reference/HashRouter.md),
[`MemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/MemoryRouter.md),
[`BrowserRouter()`](https://felixluginbuhl.com/reactRouter/reference/BrowserRouter.md))
are also available for more control. See the [Choosing a
router](https://felixluginbuhl.com/reactRouter/articles/routers.html)
vignette for details and code examples.

### Contribute

Would you like to contribute to the package? Have a look at the current
[roadmap](https://github.com/users/lgnbhl/projects/2/views/1).
