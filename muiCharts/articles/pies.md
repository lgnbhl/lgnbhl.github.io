# Pie Charts

## Overview

Pie charts express portions of a whole using arcs or angles within a
circle. They are ideal for showing proportions and making relative
shares easy to compare at a glance. Each slice represents a category’s
contribution to the total.

> **Note:** The `data` argument of
> [`PieChart()`](https://felixluginbuhl.com/muiCharts/reference/PieChart.md)
> expects a data frame with at least two columns named `label` (slice
> names) and `value` (numeric sizes). Any additional columns
> (e.g. `color`) are passed through as per-slice properties.

## Setup

``` r

library(muiCharts)
library(dplyr)
```

## Basic Pie Chart

Top 4 species by number of members:

``` r

PieChart(
  series = list(
    list(
      data = starwars_people |> 
        count(gender, sort = TRUE) |>
        filter(!is.na(gender)) |>
        rename(label = gender, value = n)
      )
  ),
  height = 300
)
```

## Per-Slice Colors

Add a `color` column to assign colors to individual slices:

``` r

PieChart(
  series = list(
    list(
      data = starwars_species |> head(4) |>
        transmute(
          label = name,  
          value = lengths(people),
          color = c("#4338CA", "#7C3AED", "#A78BFA", "#DDD6FE"))
    )
  ),
  height = 300
)
```

## Donut Chart

Create a donut chart by setting `innerRadius`:

``` r

PieChart(
  series = list(
    list(
      data = starwars_species |> head(4) |>
      transmute(label = name, value = lengths(people)),
    innerRadius = 50,
    outerRadius = 100
    )
  ),
  height = 300
)
```

## Arc Labels

Display labels directly on the slices with `arcLabel`:

``` r

PieChart(
  series = list(
    list(
      data = starwars_species |> head(4) |>
        transmute(label = name, value = lengths(people)),
      arcLabel = "label",
      innerRadius = 50,
      outerRadius = 100
    )
  ),
  height = 300
)
```

## Value Labels

Show the count on each arc using `arcLabel = "value"`:

``` r

PieChart(
  series = list(
    list(
      data = starwars_species |> head(4) |>
        transmute(label = name, value = lengths(people)),
      arcLabel = "value",
      innerRadius = 40,
      outerRadius = 100
    )
  ),
  height = 300
)
```

## Percentage Labels

Use `arcLabel` with a JavaScript formatter to show the percentage of
each slice:

``` r

total <- sum(lengths(head(starwars_species, 4)$people))

PieChart(
  series = list(
    list(
      data = starwars_species |> head(4) |>
        transmute(label = name, value = lengths(people)),
        arcLabel = JS(paste0("(item) => Math.round(item.value / ", total, " * 100) + '%'")),
        arcLabelMinAngle = 20,
        innerRadius = 50,
        outerRadius = 100
    )
  ),
  height = 300
)
```

## Padding and Corner Radius

Add spacing between slices with `paddingAngle` and rounded corners with
`cornerRadius`:

``` r

PieChart(
  series = list(
    list(
      data = starwars_species |> head(4) |>
        transmute(label = name, value = lengths(people)),
      paddingAngle = 5,
      cornerRadius = 5,
      innerRadius  = 40,
      outerRadius  = 100
    )
  ),
  height = 300
)
```

## Semi-Circle Chart

Restrict the arc range with `startAngle` and `endAngle`:

``` r

PieChart(
  series = list(
    list(
      data = starwars_species |> head(4) |>
        transmute(label = name, value = lengths(people)),
      startAngle = -90,
      endAngle =  90,
      innerRadius = 50,
      outerRadius = 100
    )
  ),
  height = 250
)
```

## Gauge-Style Donut

A semi-donut showing what share of characters are female:

``` r

female_pct <- starwars_people |>
  summarise(pct = round(mean(gender == "female", na.rm = TRUE) * 100)) |>
  pull(pct)

PieChart(
  series = list(list(
    data = data.frame(
      label = c("Female", "Other"),
      value = c(female_pct, 100 - female_pct)
    ),
    innerRadius = 70,
    outerRadius = 90,
    startAngle  = -90,
    endAngle    =  90
  )),
  height = 250
)
```

## Pie Chart Composition

Build pie charts from individual sub-components using
`ChartDataProvider` and `PiePlot`:

``` r

ChartDataProvider(
  series = list(list(
    type        = "pie",
    data        = starwars_species |> head(4) |>
      transmute(label = name, value = lengths(people)),
    innerRadius = 50,
    outerRadius = 100
  )),
  height = 300,
  ChartsLegend(),
  ChartsTooltip(trigger = "item"),
  ChartsSurface(PiePlot())
)
```

## Dashboard Example

muiCharts integrates seamlessly with
[muiMaterial](https://felixluginbuhl.com/muiMaterial) to create modern,
fully-styled dashboards. muiMaterial’s `Card`, `Typography`, and `Stack`
components make it easy to add titles, subtitles, and footers around
charts. Combine `ThemeProvider` to customize colors across your entire
dashboard:

``` r

library(muiMaterial)

muiMaterialPage(
  CssBaseline(),
  {
    primaryColor <- "#1976d2"
    secondaryColor <- "#dc004e"
    tertiaryColor <- "#9c27b0"

    ThemeProvider(
      theme = list(palette = list(primary = list(main = primaryColor), secondary = list(main = secondaryColor))),
      Box(sx = list(p = 3, bgcolor = "background.paper"),
        Card(sx = list(boxShadow = 3),
          CardContent(
            Stack(spacing = 1.5,
              Typography("Species Population", variant = "h6", sx = list(fontWeight = 600)),
              Typography("Character distribution across species", variant = "body2", sx = list(color = "text.secondary")),
              PieChart(
                series = list(list(
                  data = starwars_species |> head(3) |> transmute(label = name, value = lengths(people), color = c(primaryColor, secondaryColor, tertiaryColor)),
                  innerRadius = 50, outerRadius = 100
                )),
                height = 280
              ),
              Divider(),
              Typography("Made with muiCharts and muiMaterial", variant = "caption", sx = list(color = "text.secondary"))
            )
          )
        )
      )
    )
  }
)
```

The `Stack` component organizes the title, chart, and footer. Colors
from `ThemeProvider` are reused in the chart. This pattern works with
any muiCharts component and fits perfectly within the Material Design
ecosystem.

## Learn More

- [MUI Pie Charts Documentation](https://mui.com/x/react-charts/pie/)

See also:
[Highlighting](https://felixluginbuhl.com/muiCharts/articles/highlighting.md)
for hover effects,
[Styling](https://felixluginbuhl.com/muiCharts/articles/styling.md) for
colors,
[Legend](https://felixluginbuhl.com/muiCharts/articles/legend.md) for
legend options.
