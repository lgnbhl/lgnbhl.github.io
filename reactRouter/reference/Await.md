# Await

<https://reactrouter.com/6.30.0/components/await>

## Usage

``` r
Await(
  into,
  as = "children",
  resolveKey,
  selector = NULL,
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

  Character. The key in the loader's `defer()` return value that holds
  the promise (e.g. if the loader returns `defer({ data: promise })`,
  set `resolveKey = "data"`).

- selector:

  Character. Optional key to extract from the hook data object. If
  `NULL` (the default), the entire data is passed.

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
whose `loader` returns a `defer()` object (written via
[`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)).
