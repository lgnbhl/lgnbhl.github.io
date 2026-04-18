# muiCharts

**muiCharts** gives access to *MUI X Charts* React chart components for
data visualization from R.

## Install

You can install the development version of **muiCharts** like so:

``` r

remotes::install_github("lgnbhl/muiCharts")
```

**Read the full documentation with examples
[here](https://lgnbhl.github.io/muiCharts).**

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

### Contribute

If you have any issue, question or want to contribute with a pull
request, don’t hesitate to write me on
<https://github.com/lgnbhl/muiCharts>

For updates follow [Felix
Luginbuhl](https://linkedin.com/in/FelixLuginbuhl) on LinkedIn.
