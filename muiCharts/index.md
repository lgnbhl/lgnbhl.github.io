# muiCharts

**muiCharts** gives access to *MUI X Charts* React chart components for
data visualization from R.

## Install and load

You can install the development version of **muiCharts** like so:

``` r

remotes::install_github("lgnbhl/muiCharts")
```

``` r

library(muiCharts)
```

**Read the full documentation with examples
[here](https://lgnbhl.github.io/muiCharts).**

## Basic example

``` r

library(dplyr)

starwars_summary <- starwars |>
  filter(species %in% c("Human", "Droid", "Wookiee")) |>
  group_by(species) |>
  summarise(height = mean(height, na.rm = TRUE), mass = mean(mass, na.rm = TRUE))

BarChart(
  dataset = starwars_summary,
  xAxis = list(
    list(scaleType = "band", dataKey = "species")
  ),
  series = list(
    list(dataKey = "height", label = "Height"),
    list(dataKey = "mass", label = "Mass")
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
