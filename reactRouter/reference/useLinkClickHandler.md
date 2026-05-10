# useLinkClickHandler

<https://api.reactrouter.com/v7/functions/react-router.useLinkClickHandler.html>

## Usage

``` r
useLinkClickHandler(
  into = NULL,
  as = "children",
  render = NULL,
  to,
  replace = NULL,
  state = NULL,
  target = NULL,
  preventScrollReset = NULL,
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

  Character. Destination path.

- replace:

  Optional boolean. Replace the current entry in the history stack
  instead of pushing a new one.

- state:

  Optional. State value to attach to the new location.

- target:

  Optional character. Anchor target (e.g. `"_blank"`).

- preventScrollReset:

  Optional boolean. If `TRUE`, do not reset scroll position on
  navigation.

- relative:

  Optional character. Either `"route"` (default) or `"path"`.

- ...:

  Additional props to pass to the component.

## Details

Calls the `useLinkClickHandler()` hook and exposes the returned click
handler function via `render` (or injects it `as` a prop of `into`, e.g.
`as = "onClick"`). Lets you build link-like components that drive
client-side navigation without using
[`Link`](https://felixluginbuhl.com/reactRouter/reference/Link.md).

Because the hook returns a function, the `render` form is the natural
fit:


      useLinkClickHandler(
        to = "/about",
        render = JS("h => <span onClick={h} role='link'>About</span>")
      )
