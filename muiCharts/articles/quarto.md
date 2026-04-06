# Quarto

muiCharts works with [Quarto](https://quarto.org/) HTML documents and
dashboards. Charts render as interactive HTML widgets in any Quarto
output format that supports HTML.

## Bootstrap Conflict

muiCharts uses [MUI](https://mui.com/) (Material UI) for rendering,
which can conflict with Bootstrap CSS bundled by Quarto. This may cause
visual issues such as broken layouts, unexpected margins, or wrong font
sizing.

### Solution 1: Minimal HTML (Recommended)

The simplest fix is to disable Bootstrap entirely by setting
`minimal: true` in the YAML header:

``` markdown
---
title: "My Charts"
format:
  html:
    minimal: true
---
```

This removes Bootstrap and most Quarto styling features (navbar, footer,
search, etc.), giving MUI full control over chart rendering. This is the
recommended approach for standalone chart documents.

### Solution 2: Disable Theme Only

If you want to keep some Quarto features but disable Bootstrap, use
`theme: none`:

``` markdown
---
title: "My Charts"
format:
  html:
    theme: none
---
```

Note that `theme: none` still strips Quarto structural elements that
depend on Bootstrap (navigation, footer, logo). It is similar to
`minimal: true` which sets `theme: none` automatically.

### Solution 3: Custom CSS Override

If you need to keep Bootstrap (e.g., for Quarto websites or dashboards),
you can add targeted CSS to fix specific conflicts:

``` markdown
---
title: "My Charts"
format:
  html:
    css: custom.css
---
```

In `custom.css`, scope overrides to MUI chart containers:

``` css
.mui-charts-widget * {
  box-sizing: content-box;
}
.mui-charts-widget label {
  margin-bottom: 0;
}
```

The exact overrides needed depend on which Bootstrap styles conflict
with your charts. Inspect the rendered output to identify specific
issues.

### Quarto Dashboards

The `dashboard` format uses Bootstrap for its layout grid. If you
experience conflicts, the custom CSS approach (Solution 3) is the best
option since `minimal: true` and `theme: none` are not compatible with
the dashboard format.

## Tips

- muiCharts renders interactive HTML widgets, so it works with any
  Quarto format that supports HTML output (`html`, `dashboard`,
  `revealjs`).
- For static formats like PDF or Word, charts will not render. Use
  `format: html` or `format: dashboard`.
- Set `height` on your charts to control sizing within Quarto layout
  containers.
