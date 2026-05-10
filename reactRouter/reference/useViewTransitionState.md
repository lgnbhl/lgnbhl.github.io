# useViewTransitionState

<https://api.reactrouter.com/v7/functions/react-router.useViewTransitionState.html>

## Usage

``` r
useViewTransitionState(
  into = NULL,
  as = "children",
  render = NULL,
  to,
  relative = NULL,
  ...
)
```

## Arguments

- into:

  A component (HTML tag or shiny.react-based element) that will receive
  the hook value as the specified prop.

- as:

  Character. The name of the component's prop to inject the hook value
  into. Defaults to `"children"`.

- render:

  Optional
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  function `(value) => ReactNode` used in place of `into`/`as`.

- to:

  Character. The destination path being transitioned to.

- relative:

  Optional character. Either `"route"` (default) or `"path"`.

- ...:

  Additional props to pass to the component.

## Details

Calls the `useViewTransitionState()` hook and injects the boolean result
`as` a prop of the `into` component. Returns `TRUE` while a View
Transitions API navigation toward `to` is in progress. Pair with the
`viewTransition` prop on
[`Link`](https://felixluginbuhl.com/reactRouter/reference/Link.md)/[`NavLink`](https://felixluginbuhl.com/reactRouter/reference/NavLink.md)
to drive transition-aware styling.
