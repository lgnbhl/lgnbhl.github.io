# Documentation template for hook wrappers whose value has no internal structure to walk (scalars, booleans, or functions). Identical to `hook-wrapper` except that `selector` is intentionally omitted – it would have nothing to walk.

Documentation template for hook wrappers whose value has no internal
structure to walk (scalars, booleans, or functions). Identical to
`hook-wrapper` except that `selector` is intentionally omitted – it
would have nothing to walk.

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

- ...:

  Additional props to pass to the component.
