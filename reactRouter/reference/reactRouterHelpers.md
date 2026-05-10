# JavaScript helpers exposed on `window.jsmodule['@/reactRouter'].helpers`

For convenience, the package exposes a curated set of React Router v7
utility functions under `window.jsmodule['@/reactRouter'].helpers` so
user-authored
[`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
loaders, actions, and render callbacks can call them without reaching
into webpack internals. The same names are available as on the JS side
of React Router itself.

## Details

Scoped under the shiny.react `jsmodule` registry rather than `window` so
the package never adds a top-level global to the host page. A short
alias is the only ergonomic cost:


      loader = JS("async () => {
        const { redirect } = window.jsmodule['@/reactRouter'].helpers;
        if (!await ok()) return redirect('/login');
        return { ok: true };
      }")

**Loader/action response helpers**

- `redirect(to, init?)` – client-side navigation redirect.

- `replace(to, init?)` – redirect that replaces the history entry.

- `redirectDocument(to)` – full document reload redirect.

- `data(value, init?)` – attach status/headers to a payload.

**Path / URL utilities**

- `generatePath(path, params)` – build a URL from a pattern.

- `matchPath(pattern, pathname)` – match a pathname.

- `matchRoutes(routes, location, basename?)` – match a route tree
  against a location.

- `resolvePath(to, fromPathname?)` – resolve a relative path.

- `parsePath(path)` – split into `pathname/search/hash`.

- `createPath(parts)` – inverse of `parsePath`.

- `createSearchParams(init)` – build a `URLSearchParams`.

These run in the browser only (inside
[`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
loader/action code). For R-side construction of a
[`Link()`](https://felixluginbuhl.com/reactRouter/reference/Link.md)
`to` value from data, use base R:
`paste0("/users/", utils::URLencode(id, reserved = TRUE))`.

**Error helpers**

- `isRouteErrorResponse(error)` – type guard intended for use inside an
  `errorElement` alongside
  [`useRouteError`](https://felixluginbuhl.com/reactRouter/reference/useRouteError.md);
  returns `true` when the error came from a thrown `Response` (e.g.
  `throw new Response(..., { status: 404 })`).

These are the JavaScript implementations from `react-router-dom`.

## Examples

``` r
if (FALSE) { # \dontrun{
# Conditional redirect inside a custom loader.
Route(
  path = "/admin",
  loader = JS("async () => {
    const { redirect } = window.jsmodule['@/reactRouter'].helpers;
    const ok = await checkAuth();
    if (!ok) return redirect('/login');
    return { ok: true };
  }"),
  element = useLoaderData(tags$pre())
)

# Branch on whether the route error is a Response.
Route(
  path = "/items/:id",
  loader = JS("async ({ params }) => {
    const r = await fetch('/api/items/' + params.id);
    if (!r.ok) throw new Response('Not found', { status: 404 });
    return r.json();
  }"),
  errorElement = useRouteError(
    render = JS(
      "e => window.jsmodule['@/reactRouter'].helpers.isRouteErrorResponse(e)" +
      " ? <p>HTTP {e.status}</p> : <p>Unknown error</p>"
    )
  ),
  element = useLoaderData(tags$pre())
)
} # }
```
