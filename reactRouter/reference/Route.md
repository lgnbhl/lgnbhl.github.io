# Route

<https://api.reactrouter.com/v7/functions/react-router.Route.html>

## Usage

``` r
Route(
  ...,
  element,
  loader = NULL,
  action = NULL,
  errorElement = NULL,
  key = randomKey()
)
```

## Arguments

- ...:

  Additional Route props (see Details).

- element:

  The element to render when the route matches. Wrapped on the JS side
  in a no-DOM `Keyed` component so React remounts the subtree on every
  route change – this is required for Shiny output bindings (e.g.
  `textOutput()`) to reinitialise correctly when two routes render the
  same component shape with different namespaces. Unlike the previous
  `<div>` wrapper, `Keyed` adds no DOM node, so layouts like MUI `Grid`
  that require typed direct children keep working.

- loader:

  Optional. A
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  expression evaluating to a loader function, e.g.
  `JS("({ params }) => fetch(...)")`. For a plain unconditional
  redirect, use
  [`redirect`](https://felixluginbuhl.com/reactRouter/reference/redirect.md).
  To embed static R data, serialize it first with
  [`jsonlite::toJSON()`](https://jeroen.r-universe.dev/jsonlite/reference/fromJSON.html)
  and wrap the result in
  [`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html).

- action:

  Optional. A
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  expression evaluating to an action function called by
  [`Form`](https://felixluginbuhl.com/reactRouter/reference/Form.md)
  submissions and
  [`useSubmit`](https://felixluginbuhl.com/reactRouter/reference/useSubmit.md)
  /
  [`useFetcher`](https://felixluginbuhl.com/reactRouter/reference/useFetcher.md)
  submits.

- errorElement:

  Optional. Element rendered when the route's `loader`, `action`, or
  rendering throws.

- key:

  Stable React key for the route's `element`. Defaults to a random
  alphanumeric string per `Route()` call, so each route's element has a
  distinct identity from its siblings – this is what causes React to
  unmount the previous route's subtree (and reinitialise its Shiny
  output bindings) when navigating between routes that render the same
  component shape. You almost never need to pass this explicitly.
  **Note:** this key only affects identity of the route's `element`; it
  does *not* rebuild the
  [`RouterProvider`](https://felixluginbuhl.com/reactRouter/reference/RouterProvider.md)
  data router. The route tree is created once on mount and subsequent
  `Route()` edits are ignored; to apply a new route tree at runtime,
  give `RouterProvider` itself a changing `key` (e.g. via
  [`shiny::renderUI`](https://rdrr.io/pkg/shiny/man/renderUI.html)).

## Value

A Route component.

## Details

Internally the \`element\` is wrapped in a \`shiny::div()\` with a UUID
key so, in case R shiny is used, shiny can differentiate each element.

Additional React Router `Route` props can be passed through `...`:

- `path` (Character): path pattern, supports `:param`, optional
  `:param?`, and splat `*`.

- `index` (Boolean): mark this as the index route of its parent.

- `caseSensitive` (Boolean): match the path case-sensitively.

- `id` (Character): stable route id, required for use with
  [`useRouteLoaderData`](https://felixluginbuhl.com/reactRouter/reference/useRouteLoaderData.md).

- `handle` (Any): arbitrary value exposed via
  [`useMatches`](https://felixluginbuhl.com/reactRouter/reference/useMatches.md)
  for breadcrumbs and similar use cases.

- `shouldRevalidate`
  ([`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)):
  function controlling whether the loader re-runs on a given navigation.

- `lazy`
  ([`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)):
  code-splitting hook returning a `Promise` resolving to a route module.

- `hasErrorBoundary` (Boolean): explicit error-boundary flag (rarely
  needed when `errorElement` is provided).
