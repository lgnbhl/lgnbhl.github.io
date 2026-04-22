# Await

<https://api.reactrouter.com/v7/functions/react-router.Await.html>

## Usage

``` r
Await(
  into = NULL,
  as = "children",
  resolveKey,
  selector = NULL,
  render = NULL,
  errorElement = NULL,
  fallback = NULL,
  ...
)
```

## Arguments

- into:

  A component (HTML tag or shiny.react-based element) that will receive
  the hook data as the specified prop.

- as:

  Character. The name of the component's prop to inject the hook data
  into (by default `"children"` for text display, `"rows"` for a data
  grid, `"value"` for an input).

- resolveKey:

  Character. The key in the loader's return value that holds the promise
  (e.g. if the loader returns `{ data: promise }`, set
  `resolveKey = "data"`).

- selector:

  Character. Optional key to extract from the hook data object. If
  `NULL` (the default), the entire data is passed. Dotted paths like
  `"summary.title"` navigate nested objects.

- render:

  Optional
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  function `(value) => ReactNode` used in place of `into`/`as`. Mirrors
  the native React Router pattern for cases where a single prop is not
  expressive enough (e.g. `` JS("v => `${v.first} ${v.last}`") ``).

- errorElement:

  Element to render if the promise rejects.

- fallback:

  Element shown while the promise is pending. Defaults to a plain
  `"Loading\u2026"` span.

- ...:

  Additional props to pass to the component.

## Details

Renders `into` when a deferred loader promise resolves, injecting the
resolved value (or a `selector` from it) `as` a prop. Use inside a
[`Route`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
whose `loader` returns an object containing a promise (written via
[`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)). In
React Router v7, simply return the object directly — no `defer()`
wrapper is needed.
