# muiCharts

**muiCharts** gives access to *MUI X Charts* React chart components for
data visualization from R.

## Install

You can install the development version of **muiCharts** like so:

``` r

remotes::install_github("lgnbhl/muiCharts")
```

**Read the full documentation with examples
[here](https://felixluginbuhl.com/muiCharts/).**

## Basic example

``` r

library(muiCharts)

BarChart(
  dataset = head(starwars_people, 4),
  xAxis = list(
    list(scaleType = "band", dataKey = "name")
  ),
  series = list(
    list(dataKey = "height", label = "Height")
  ),
  height = 300
)
```

![BarChart
example](https://raw.githubusercontent.com/lgnbhl/muiCharts/refs/heads/master/man/Figures/BarChart.png)

### Resources

- [Package documentation](https://felixluginbuhl.com/muiCharts/)
- [Official MUI X Charts docs](https://mui.com/x/react-charts/)

### Acknowledgements

`muiCharts` is built on top of
[shiny.react](https://github.com/Appsilon/shiny.react), the R package by
[Appsilon](https://www.appsilon.com/) that makes it possible to use
React components in Shiny and Quarto.

### Contributing

If you have any issue, question or want to contribute with a pull
request, don’t hesitate to write me on
<https://github.com/lgnbhl/muiCharts>

Follow [Felix Luginbuhl](https://linkedin.com/in/FelixLuginbuhl) on
LinkedIn for updates.

### Trademark notice

“MUI” and “MUI X Charts” are trademarks of MUI Inc. `muiCharts` is an
independent, community-maintained R package and is **not affiliated
with, sponsored by, or endorsed by MUI Inc.** The names are used solely
to identify the underlying JavaScript library that this package wraps.
See MUI’s [legal information](https://mui.com/legal/) for the canonical
list of MUI’s published policies.
