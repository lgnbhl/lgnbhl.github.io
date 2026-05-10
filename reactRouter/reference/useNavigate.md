# useNavigate

<https://api.reactrouter.com/v7/functions/react-router.useNavigate.html>

## Usage

``` r
useNavigate(into = NULL, as = "children", render = NULL, ...)
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

- ...:

  Additional props to pass to the component.

## Details

Calls the `useNavigate()` hook and passes the navigate function to
`render` (or injects it `as` a prop of `into`). The navigate function
has signature `navigate(to, options?)`, e.g. `navigate("/about")` or
`navigate(-1)` to go back.

Because the hook returns a function (not a value), the `render` form is
the natural way to use it:


      useNavigate(render = JS(
        "nav => <button onClick={() => nav('/about')}>Go</button>"
      ))
