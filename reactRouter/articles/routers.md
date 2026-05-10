# Choosing a router

The **reactRouter** package provides multiple ways to add routing.
[`RouterProvider()`](https://felixluginbuhl.com/reactRouter/reference/RouterProvider.md)
is the recommended entry point: pass a router built with
[`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
[`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md),
or
[`createBrowserRouter()`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md)
to its `router` argument.

## `RouterProvider()` — recommended entry point

[`RouterProvider()`](https://felixluginbuhl.com/reactRouter/reference/RouterProvider.md)
renders a data router. It mirrors the React Router v7 composition
pattern: you build a router with one of the `create*Router()` functions
and pass it to the `router` argument.

``` r

RouterProvider(
  router = createHashRouter(
    Route(
      path = "/",
      element = div(
        NavLink(to = "/",         "Home"),
        NavLink(to = "/analysis", "Analysis"),
        Outlet()
      ),
      Route(index = TRUE,        element = "Main content"),
      Route(path = "analysis",   element = "Analysis content")
    )
  )
)
```

### Arguments

**`router`** — required. A router object produced by
[`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
[`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md),
or
[`createBrowserRouter()`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md).

**`fallbackElement`** — optional. An element shown while the initial
route’s `loader` is resolving (i.e. the loading state before the first
route renders). Example:

``` r

RouterProvider(
  router   = createHashRouter( ... ),
  fallbackElement = div("Loading…")
)
```

------------------------------------------------------------------------

## Choosing a router

The three `create*Router()` functions differ only in how they interact
with the browser URL:

| Function | URL style | Works on `file://` | Recommended |
|----|----|----|----|
| [`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md) | `/#/about` | yes | **yes — default choice** |
| [`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md) | in-memory (no URL change) | yes | **yes — for embedded / multi-router pages** |
| [`createBrowserRouter()`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md) | `/about` | no | no (see below) |

------------------------------------------------------------------------

## `createHashRouter()` — recommended default

[`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md)
uses the URL hash (`/#/about`) for routing. Hash changes never trigger a
real HTTP request, so the router works in Shiny apps, Quarto documents,
and static HTML pages without any server configuration.

**Why it works well with Shiny:**

- Hash changes do not affect Shiny’s HTTP layer.
- `session$clientData$url_hash` updates reactively whenever the route
  changes.

**Why it is preferred over the legacy
[`HashRouter()`](https://felixluginbuhl.com/reactRouter/reference/HashRouter.md):**

- Unlocks the full data router API: `loader`, `action`, `errorElement`,
  `useLoaderData`, `useNavigation`, `useFetcher`, and deferred data via
  `Await`.
- This is the model React Router is actively developing;
  [`HashRouter()`](https://felixluginbuhl.com/reactRouter/reference/HashRouter.md)
  is a legacy compatibility wrapper.

``` r

library(reactRouter)
library(htmltools)

RouterProvider(
  router = createHashRouter(
    Route(
      path = "/",
      element = div(
        tags$nav(
          tags$ul(
            tags$li(NavLink(to = "/",      "Home")),
            tags$li(NavLink(to = "/about", "About"))
          )
        ),
        tags$hr(),
        Outlet()
      ),
      Route(index = TRUE,   element = div(h2("Home"),  p("Welcome."))),
      Route(path = "about", element = div(h2("About"), p("About page.")))
    )
  )
)
```

------------------------------------------------------------------------

## `createMemoryRouter()` — recommended for in-memory routing

[`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md)
keeps routing state entirely in memory. It never reads or modifies the
browser URL, which means:

- It always starts at `/`, regardless of the real URL.
- Navigation updates the in-memory location but the browser address bar
  does not change.
- Browser back/forward buttons and bookmarks do not reflect the current
  route.

This makes it ideal for **internal-only navigation** — multi-step
wizards, tabbed panels, or any UI where the route is an implementation
detail rather than something the user should share or bookmark. It is
also the right choice when you need **multiple independent routers on
the same page** (e.g. several routed widgets in a Shiny dashboard),
since they don’t touch the URL and therefore can’t conflict with each
other.

``` r

library(reactRouter)
library(htmltools)

RouterProvider(
  router = createMemoryRouter(
    Route(
      path = "/",
      element = div(
        tags$nav(
          tags$ul(
            tags$li(NavLink(to = "/",      "Home")),
            tags$li(NavLink(to = "/about", "About"))
          )
        ),
        tags$hr(),
        Outlet()
      ),
      Route(index = TRUE,   element = div(h2("Home"),  p("Welcome."))),
      Route(path = "about", element = div(h2("About"), p("About page.")))
    )
  )
)
```

**Choosing between hash and memory routers:**

| Scenario | Recommended router |
|----|----|
| Shiny app with bookmarkable/shareable routes | [`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md) |
| Static site (Quarto, R Markdown) with multiple pages | [`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md) |
| Shiny app with internal-only navigation (wizards, tabbed panels) | [`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md) |
| Multiple independent routed widgets on the same page | [`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md) |
| Embedded widget where the URL should not change | [`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md) |

In short: if the route should be visible in the URL (bookmarks, deep
links, back/forward), use
[`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md).
If routing is purely an internal UI concern, use
[`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md).

------------------------------------------------------------------------

## `createBrowserRouter()` — not recommended in R

[`createBrowserRouter()`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md)
uses the HTML5 History API (`pushState`) for clean URLs (e.g. `/about`
instead of `/#/about`). It is the standard router in full React web
applications, but it is **not well-suited for use with this R package**:

- **Static files (`file://`):** The URL path is a file system path
  (e.g. `/C:/Users/.../file.html`), not `/`. No route matches and the
  app immediately shows a 404.
- **Shiny apps:** Clean URLs like `/about` require the server to rewrite
  all paths back to `/`. Shiny does not do this by default.
- **Refreshing on a sub-route:** Even when served from a proper HTTP
  server, refreshing on `/about` will 404 unless the server is
  configured to rewrite all routes to `index.html`.

[`createBrowserRouter()`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md)
only works correctly in a full web application deployment (e.g. React
served by Node.js, Express, or Nginx with URL rewriting). That scenario
is outside the scope of this R package.

If you nevertheless decide to use
[`createBrowserRouter()`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md)
and your Shiny app is mounted under a sub-path (e.g. on Posit Connect at
`/content/abc/` or behind a reverse proxy), set `basename` so the router
knows where the app starts. Otherwise every route 404s because the
router compares the full path (`/content/abc/about`) against patterns
rooted at `/`.

``` r

RouterProvider(
  router = createBrowserRouter(
    Route(path = "/", element = ...),
    basename = "/content/abc"   # match your deployment prefix
  )
)
```

[`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md)
and
[`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md)
do not need `basename` — neither uses the URL path.

------------------------------------------------------------------------

## Legacy: `HashRouter()` and `MemoryRouter()` — component API

[`HashRouter()`](https://felixluginbuhl.com/reactRouter/reference/HashRouter.md)
and
[`MemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/MemoryRouter.md)
are the older, component-based equivalents of
[`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md)
and
[`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md).
They remain **fully supported** and are safe to use in existing code.

**However,
[`RouterProvider()`](https://felixluginbuhl.com/reactRouter/reference/RouterProvider.md)
with
[`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md)
/
[`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md)
is preferred for new code** because the component-based API:

- Does not support `loader`, `action`, `errorElement`, or any data
  router features.
- Is not the direction React Router is developing toward.

Use
[`HashRouter()`](https://felixluginbuhl.com/reactRouter/reference/HashRouter.md)
or
[`MemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/MemoryRouter.md)
only if you have a specific reason to stay with the component API
(e.g. migrating an existing app incrementally).

### Legacy router caveat: re-rendering parent UI remounts route elements

[`Route()`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
attaches a fresh random React `key` to its `element` on every R-side
call. The data router
([`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md)
/
[`RouterProvider()`](https://felixluginbuhl.com/reactRouter/reference/RouterProvider.md))
builds the route tree once on mount and is unaffected. The component-API
routers
([`HashRouter()`](https://felixluginbuhl.com/reactRouter/reference/HashRouter.md)
/
[`MemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/MemoryRouter.md) +
[`Routes()`](https://felixluginbuhl.com/reactRouter/reference/Routes.md) +
[`Route()`](https://felixluginbuhl.com/reactRouter/reference/Route.md))
are different: if the host UI is re-rendered — typically via
[`shiny::renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html) /
[`shiny::uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) —
[`Route()`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
is re-evaluated, every route element gets a new key, and React unmounts
and remounts the matched element on every parent render even when the
URL has not changed. Any client-side state inside the route element
(form input, scroll position, third-party widget state) is reset.

Workarounds:

- **Preferred:** switch to
  `RouterProvider(router = createHashRouter(...))`. The data router
  builds the route tree once and is immune.
- If you must keep the legacy component API, render the router at the
  top level of your `ui` (not inside `renderUI`) so it is built once.

------------------------------------------------------------------------

## Understanding `reloadDocument`

[`Link()`](https://felixluginbuhl.com/reactRouter/reference/Link.md) and
[`NavLink()`](https://felixluginbuhl.com/reactRouter/reference/NavLink.md)
accept a `reloadDocument` prop. The default is `FALSE`, matching React
Router’s own default, and that default is correct for almost every use
of this package — including Shiny apps with server-rendered output.

### `reloadDocument = FALSE` (default, recommended)

React Router intercepts the click and updates the route **entirely on
the client side**, without reloading the page. This is the right
behavior for:

- **Static sites and Quarto documents** — there is no server to
  re-initialize.
- **[`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md)
  /
  [`MemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/MemoryRouter.md)**
  — a full page reload would reset the in-memory routing state back to
  `/`.
- **Data router `loader` / `action`** — these only run during
  client-side navigations; a full reload bypasses them.
- **Shiny apps with `uiOutput`, `renderUI`, `plotOutput`, or
  htmlwidgets.** Shiny output bindings re-attach automatically when
  React Router mounts the new route’s element, and reactives that depend
  on the URL —
  [`useLocation()`](https://felixluginbuhl.com/reactRouter/reference/useLocation.md),
  [`useParams()`](https://felixluginbuhl.com/reactRouter/reference/useParams.md),
  [`useSearchParams()`](https://felixluginbuhl.com/reactRouter/reference/useSearchParams.md),
  or Shiny’s own reactive `session$clientData$url_hash` — update without
  any reload. The bundled `shiny.fluent` example
  (`reactRouterExample("shiny.fluent")`) navigates between routes
  containing live `echarts4rOutput()` and
  [`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) and uses
  the default `reloadDocument = FALSE` throughout.

A full reload would actually be *worse* for Shiny: it tears down the
session, drops shared reactives (e.g. a `hero_selected` reactive used
across routes), and re-runs every initialization step on every click.

### `reloadDocument = TRUE` (rare)

Setting `reloadDocument = TRUE` skips React Router’s client-side
navigation and lets the browser handle the `<a>` click natively. What
this actually does depends on the router:

| Router | Rendered href | Effect of `reloadDocument = TRUE` |
|----|----|----|
| [`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md) / [`HashRouter()`](https://felixluginbuhl.com/reactRouter/reference/HashRouter.md) | `#/path` | Effectively a no-op — browsers don’t reload on hash-only changes. The URL hash updates and React Router still picks it up via `hashchange`. |
| [`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md) / [`MemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/MemoryRouter.md) | (none — no real `<a href>`) | No effect; memory routers don’t use real URLs. |
| [`createBrowserRouter()`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md) | `/path` | Triggers a full HTTP request to `/path`. Requires the server to serve the app on every route, which Shiny does not do by default — the request will 404. |

In practice this means `reloadDocument = TRUE` is rarely the right
choice in this package. Leave it at the default.

### Quick reference

| Context | `reloadDocument` |
|----|----|
| Static site / Quarto / R Markdown | `FALSE` (default) |
| [`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md) / [`MemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/MemoryRouter.md) | `FALSE` (default) |
| Data router with `loader` / `action` | `FALSE` (default) |
| Shiny app with `uiOutput` / `renderUI` / `plotOutput` | `FALSE` (default) |
