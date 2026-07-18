# Custom Components

## Overview

`muiCharts` wraps the components shipped by [MUI X
Charts](https://mui.com/x/react-charts/). Sometimes you need something
the library does not provide out of the box — for example **error bars**
(confidence intervals) drawn on top of a bar chart.

The good news: you can add your own chart component **without rebuilding
the R package**. A custom component is just a small JavaScript file that
you load alongside the chart. This article walks through the whole
pattern using an `ErrorBar` component as a worked example.

The three pieces are always the same:

1.  A **JavaScript file** that defines a React component and registers
    it.
2.  An **HTML dependency** that loads that file in the browser.
3.  A thin **R wrapper function** that emits the component and passes
    props from R.

## You don’t need to know React — ask an AI

Custom components are written in **JSX** (React’s JavaScript syntax). If
you are an R programmer who has never touched React, that is fine:
modern AI assistants (Claude, ChatGPT, Copilot, …) are very good at
writing these small components for you. The trick is to give the
assistant the few facts it needs about how `muiCharts` exposes React to
the browser.

A prompt like this works well:

> Write a plain-browser JavaScript file (no build step, no
> `import`/`require`) that defines a React component called `ErrorBar`
> for MUI X Charts. React is available as `window.jsmodule['react']` and
> the charts library as `window.jsmodule['@mui/x-charts']` (which
> exports the `useXScale` and `useYScale` hooks). The component receives
> a `data` prop — an array of `{ x, min, max }` objects — and draws a
> vertical error bar with caps for each category, mapping values to
> pixels with the scales. Register it with
> `window.jsmodule['muiCharts-custom'] = { ErrorBar: ErrorBar }`. Use
> `React.createElement` (not JSX) so the file runs directly in the
> browser.

The two things the AI must know are the **globals**
(`window.jsmodule[...]`) and the **registration line** — everything
below explains why.

## How muiCharts finds a component

Every `muiCharts` function ultimately calls
`shiny.react::reactElement(module, name, ...)`. In the browser,
`shiny.react` looks the component up as:

``` js
window.jsmodule[module][name]
```

The bundled dependencies already populate `window.jsmodule` with
everything you need to build on top of the library:

- `window.jsmodule['react']` — React itself (`createElement`, `useMemo`,
  …)
- `window.jsmodule['@mui/x-charts']` — every chart component **and**
  hook, including `useXScale()` and `useYScale()` for mapping data to
  pixels.

So a custom component just has to add **one more entry** to that object
under a module name of your choosing — here we use `"muiCharts-custom"`:

``` js
window.jsmodule['muiCharts-custom'] = { ErrorBar: ErrorBar };
```

Then, on the R side, you point `reactElement()` at that same module and
name.

## Step 1 — The JavaScript component

Below is the full component. It is **plain browser JavaScript** — no
`import`, no `require`, no webpack. It reads React and the chart hooks
from `window.jsmodule`, so it runs as-is once the chart’s dependencies
have loaded.

It auto-detects the chart orientation (the band axis is the one that has
a `.bandwidth()` method) and draws a line with two caps per category.

``` r

error_bar_js <- r"---(
(function () {
  var jsmodule = window.jsmodule;
  var React    = jsmodule['react'];
  var charts   = jsmodule['@mui/x-charts'];
  var useXScale = charts.useXScale;
  var useYScale = charts.useYScale;

  function ErrorBar(props) {
    var data      = props.data;
    var color     = props.color     || '#555';
    var lineWidth = props.lineWidth  || 1.5;
    var capSize   = props.capSize    || 6;

    var xScale = useXScale();
    var yScale = useYScale();

    // The band (category) scale is the one exposing .bandwidth()
    var horizontal  = typeof yScale.bandwidth === 'function';
    var bandScale   = horizontal ? yScale : xScale;
    var valueScale  = horizontal ? xScale : yScale;
    var bandwidth   = typeof bandScale.bandwidth === 'function'
      ? bandScale.bandwidth() : 0;

    if (!data || !Array.isArray(data)) return null;

    return React.createElement(
      'g',
      { className: 'error-bars' },
      data.map(function (d, i) {
        if (d.x == null || d.min == null || d.max == null) return null;

        var band = bandScale(d.x);
        if (band == null || isNaN(band)) return null;
        band += bandwidth / 2;

        var vMin = valueScale(d.min);
        var vMax = valueScale(d.max);
        if (isNaN(vMin) || isNaN(vMax)) return null;

        var stroke = { stroke: color, strokeWidth: lineWidth };

        if (horizontal) {
          return React.createElement('g', { key: i },
            React.createElement('line', Object.assign({ key: 'l',
              x1: vMin, y1: band, x2: vMax, y2: band }, stroke)),
            React.createElement('line', Object.assign({ key: 'a',
              x1: vMin, y1: band - capSize, x2: vMin, y2: band + capSize }, stroke)),
            React.createElement('line', Object.assign({ key: 'b',
              x1: vMax, y1: band - capSize, x2: vMax, y2: band + capSize }, stroke))
          );
        }

        // Vertical (default)
        return React.createElement('g', { key: i },
          React.createElement('line', Object.assign({ key: 'l',
            x1: band, y1: vMin, x2: band, y2: vMax }, stroke)),
          React.createElement('line', Object.assign({ key: 'a',
            x1: band - capSize, y1: vMin, x2: band + capSize, y2: vMin }, stroke)),
          React.createElement('line', Object.assign({ key: 'b',
            x1: band - capSize, y1: vMax, x2: band + capSize, y2: vMax }, stroke))
        );
      })
    );
  }

  // Register the component so shiny.react can find it
  window.jsmodule = window.jsmodule || {};
  window.jsmodule['muiCharts-custom'] =
    Object.assign({}, window.jsmodule['muiCharts-custom'], { ErrorBar: ErrorBar });
})();
)---"
```

> In a real project you would keep this in its own `error-bar.js` file.
> Here we hold it in an R string so the article stays self-contained and
> reproducible.

## Step 2 — Load the JavaScript as an HTML dependency

Write the script to disk and wrap it in an
[`htmltools::htmlDependency()`](https://rstudio.github.io/htmltools/reference/htmlDependency.html).
This is how Shiny and R Markdown know to include the `<script>` in the
page. We give it a name and version of our own; nothing here touches the
installed package.

``` r

library(htmltools)

# Write the component next to the rendered document
js_dir <- file.path(tempdir(), "muiCharts-custom")
dir.create(js_dir, showWarnings = FALSE)
writeLines(error_bar_js, file.path(js_dir, "error-bar.js"))

error_bar_dep <- htmlDependency(
  name    = "muiCharts-custom",
  version = "1.0.0",
  src     = js_dir,
  script  = "error-bar.js"
)
```

## Step 3 — The R wrapper function

Finally, an R function that emits the component. It mirrors how the
package’s own components are defined: call
[`shiny.react::reactElement()`](https://appsilon.github.io/shiny.react/reference/reactElement.html)
with the module and name you registered in JavaScript, and attach
**both** the chart dependencies and your custom script via `deps`.

``` r

library(muiCharts)

ErrorBar <- function(data, color = "#555", lineWidth = 1.5, capSize = 6) {
  shiny.react::reactElement(
    module = "muiCharts-custom",
    name   = "ErrorBar",
    props  = shiny.react::asProps(
      data      = data,
      color     = color,
      lineWidth = lineWidth,
      capSize   = capSize
    ),
    # Load MUI X Charts (react + the chart library) AND our custom script
    deps = c(muiChartsDependency(), list(error_bar_dep))
  )
}
```

A small helper makes it easy to turn a data frame with `min`/`max`
columns into the list-of-lists shape the component expects:

``` r

error_bar_data <- function(x, min, max) {
  lapply(seq_along(x), function(i) list(x = x[i], min = min[i], max = max[i]))
}
```

## Putting it together

Now use `ErrorBar()` like any other component — as a child of
[`BarChart()`](https://felixluginbuhl.com/muiCharts/reference/BarChart.md).
The `x` values must match the x-axis categories so the bars line up.

``` r

library(dplyr)

# Average height by species, with 95% confidence intervals
starwars_ci <- dplyr::starwars |>
  filter(!is.na(height), !is.na(species)) |>
  group_by(species) |>
  summarize(
    avg_height = mean(height),
    se = sd(height) / sqrt(n()),
    n = n(),
    .groups = "drop"
  ) |>
  filter(n >= 2) |>
  mutate(lower = avg_height - 1.96 * se, upper = avg_height + 1.96 * se) |>
  arrange(desc(n)) |>
  slice_head(n = 5)
```

``` r

BarChart(
  dataset = starwars_ci,
  xAxis  = list(list(scaleType = "band", dataKey = "species", label = "Species")),
  series = list(list(dataKey = "avg_height", label = "Average height (cm)")),
  height = 320,
  ErrorBar(
    data      = error_bar_data(starwars_ci$species, starwars_ci$lower, starwars_ci$upper),
    color     = "#d32f2f",
    lineWidth = 2,
    capSize   = 8
  )
)
```

Because the component auto-detects orientation from the scales, the
**same** `ErrorBar()` works on a horizontal bar chart — just set
`layout = "horizontal"` on the chart:

``` r

BarChart(
  dataset = starwars_ci,
  layout = "horizontal",
  yAxis  = list(list(scaleType = "band", dataKey = "species", label = "Species")),
  series = list(list(dataKey = "avg_height", label = "Average height (cm)")),
  height = 320,
  ErrorBar(
    data      = error_bar_data(starwars_ci$species, starwars_ci$lower, starwars_ci$upper),
    color     = "#d32f2f",
    lineWidth = 2,
    capSize   = 8
  )
)
```

## Recap

To add any custom chart component without rebuilding `muiCharts`:

1.  **Write a JavaScript component** that reads React and the chart
    hooks from `window.jsmodule` and registers itself under a module
    name of your choice
    (`window.jsmodule['muiCharts-custom'] = { MyComponent }`). Don’t
    know React? Ask an AI assistant to write it — just tell it about the
    `window.jsmodule` globals and the registration line.
2.  **Load it** with
    [`htmltools::htmlDependency()`](https://rstudio.github.io/htmltools/reference/htmlDependency.html).
3.  **Wrap it in R** with
    [`shiny.react::reactElement()`](https://appsilon.github.io/shiny.react/reference/reactElement.html),
    pointing at the same module and name, and attach
    `c(muiChartsDependency(), list(your_dep))` as `deps`.

The same recipe works in Shiny apps and Quarto documents — see the
[Shiny](https://felixluginbuhl.com/muiCharts/articles/shiny.md) and
[Quarto](https://felixluginbuhl.com/muiCharts/articles/quarto.md)
articles. Once a component proves useful, you can graduate it into a
bundled component by adding its source to the package’s `js/` directory
and rebuilding, but that is never required to get started.
