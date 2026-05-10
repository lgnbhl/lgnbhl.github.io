# useOutlet

<https://api.reactrouter.com/v7/functions/react-router.useOutlet.html>

## Usage

``` r
useOutlet(into = NULL, as = "children", render = NULL, context = NULL, ...)
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

- context:

  Optional value to expose to descendants via
  [`useOutletContext`](https://felixluginbuhl.com/reactRouter/reference/useOutletContext.md).

- ...:

  Additional props to pass to the component.

## Details

Calls the `useOutlet()` hook and injects the matched child route's
element `as` a prop of the `into` component (or passes it to `render`).
Returns `NULL` when no child route matches – useful for rendering a
fallback inside a layout when the user is on the parent route.

Differs from the
[`Outlet`](https://felixluginbuhl.com/reactRouter/reference/Outlet.md)
component in that it returns the element as a value, so you can branch
on whether a child route is matched.

## Examples

``` r
if (FALSE) { # \dontrun{
# In a layout route: render the matched child, or a fallback if on the
# parent route itself.
useOutlet(
  render = JS("o => o || <p>Pick a section from the menu.</p>")
)

# Inject the matched outlet element as the body of a wrapping <section>.
useOutlet(into = shiny::tags$section(class = "page"))
} # }
```
