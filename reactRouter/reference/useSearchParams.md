# useSearchParams

<https://api.reactrouter.com/v7/functions/react-router.useSearchParams.html>

## Usage

``` r
useSearchParams(into = NULL, as = "children", param = NULL, render = NULL, ...)
```

## Arguments

- into:

  A component (HTML tag or shiny.react-based element) that will receive
  the hook data as the specified prop.

- as:

  Character. The name of the component's prop to inject the hook data
  into (by default `"children"` for text display, `"rows"` for a data
  grid, `"value"` for an input).

- param:

  Character. Name of a single query parameter to extract. Returns a
  character vector of all values for that key (length 0 if absent,
  length 1+ otherwise). When `NULL`, returns a named list mapping each
  key to its vector of values.

  **Empty vs. missing.** A missing key produces a length-0 vector, which
  renders as an empty string when injected with the default
  `as = "children"`. If you need to distinguish "absent" from
  "present-but-empty" (e.g. show a placeholder), use the `render` form
  and branch on `Array.isArray(v) && v.length === 0`, e.g.
  `render = JS("v => v.length ? v.join(', ') : <em>none</em>")`.

- render:

  Optional
  [`JS`](https://appsilon.github.io/shiny.react/reference/JS.html)
  function `(value) => ReactNode` used in place of `into`/`as`. Mirrors
  the native React Router pattern for cases where a single prop is not
  expressive enough (e.g. `` JS("v => `${v.first} ${v.last}`") ``).

- ...:

  Additional props to pass to the component.

## Details

Calls the `useSearchParams()` hook and injects the result `as` a prop of
the `into` component. Use the `param` argument to extract a query
parameter by name.

Values are always returned as character vectors so that repeated keys
(e.g. `"?tag=a&tag=b"`) are preserved. When injected as `"children"`,
vectors are joined with `", "`; for custom formatting, use `render`.

**Reading vs. writing.** The upstream JS hook returns a tuple
`[searchParams, setSearchParams]`. This wrapper splits the two paths:

- `into` / `as` — *read-only*. Receives the parsed params (or one
  `param`) and ignores the setter.

- `render` — receives both as `(params, setSearchParams)`, so use this
  form when you need to update the URL programmatically:


        useSearchParams(render = JS(
          "(p, set) => <button onClick={() => set({tag:'b'})}>Filter</button>"
        ))
          
