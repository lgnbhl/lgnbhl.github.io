# reactRouter

The goal of **reactRouter** is to provide a wrapper around [React
Router](https://reactrouter.com).

> \[!CAUTION\] **Breaking Change in v.0.2.0** : `reloadDocument` is now
> FALSE by default in
> [`NavLink()`](https://felixluginbuhl.com/reactRouter/reference/NavLink.md)
> and
> [`Link()`](https://felixluginbuhl.com/reactRouter/reference/Link.md).
> Set `reloadDocument = TRUE` only when target routes contain Shiny
> server-rendered output like
> [`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) /
> [`renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html) in dynamic
> segments (`/:id/`).

### Usage

You can easily add URL pages in a Quarto document or R Shiny app like
so:

``` r

library(reactRouter)
library(htmltools)

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

### Resources

- [Package documentation](https://felixluginbuhl.com/reactRouter/)
- [Getting Started
  vignette](https://felixluginbuhl.com/reactRouter/articles/introduction.html)
- [All R
  examples](https://github.com/lgnbhl/reactRouter/tree/main/inst/examples)
- [Official Material UI
  docs](https://mui.com/material-ui/getting-started/)

### Contribute

Would you like to contribute to the package? Have a look at the current
[roadmap](https://github.com/users/lgnbhl/projects/2/views/1).
