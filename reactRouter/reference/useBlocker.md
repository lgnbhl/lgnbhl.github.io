# useBlocker

<https://api.reactrouter.com/v7/functions/react-router.useBlocker.html>

## Usage

``` r
useBlocker(
  into = NULL,
  as = "children",
  selector = "state",
  render = NULL,
  shouldBlock = FALSE,
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

- shouldBlock:

  A [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  function receiving `{ currentLocation, nextLocation, historyAction }`
  and returning `true` to block navigation or `false` to allow it. Pass
  `FALSE` to disable blocking entirely (the default).

- ...:

  Additional props to pass to the component.

## Details

Calls the `useBlocker()` hook and injects the blocker's `state` (or
another `selector` field) `as` a prop of the `into` component. Use to
intercept navigation — e.g. warn the user about unsaved changes before
they leave a route.

The blocker `state` is one of `"unblocked"` (default), `"blocked"`
(navigation intercepted), or `"proceeding"` (user confirmed, navigation
in progress).
