# Legend

``` r

library(muiCharts)
library(dplyr)
library(tidyr)
```

The legend identifies each series displayed in the chart. This article
demonstrates legend customization based on the [MUI Legend
documentation](https://mui.com/x/react-charts/legend/).

## Default Legend

By default, a legend is displayed above the chart showing all series:

``` r

starwars_gender <- dplyr::starwars |>
  unnest_longer(films) |>
  count(films, sex) |>
  filter(!is.na(sex)) |>
  pivot_wider(names_from = sex, values_from = n) |>
  mutate(release = c(1977, 2002, 1983, 2005, 1980, 2015, 1999)) |>
  arrange(release)

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(dataKey = "male", label = "Male"),
    list(dataKey = "female", label = "Female"),
    list(dataKey = "hermaphroditic", label = "Hermaphroditic"),
    list(dataKey = "none", label = "None")
  ),
  height = 300
)
```

## Hiding the Legend

Use `hideLegend = TRUE` to remove the legend:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(dataKey = "male", label = "Male"),
    list(dataKey = "female", label = "Female")
  ),
  hideLegend = TRUE,
  height = 300
)
```

## Legend Position

Customize legend position using `slotProps`. The legend can be
positioned at `"start"`, `"middle"`, or `"end"` in both horizontal and
vertical directions:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(dataKey = "male", label = "Male"),
    list(dataKey = "female", label = "Female")
  ),
  slotProps = list(
    legend = list(
      position = list(
        vertical = "middle",
        horizontal = "right"
      )
    )
  ),
  height = 300
)
```

## Legend Direction

Change the legend layout direction from horizontal (default) to
vertical:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(dataKey = "male", label = "Male"),
    list(dataKey = "female", label = "Female"),
    list(dataKey = "hermaphroditic", label = "Hermaphroditic"),
    list(dataKey = "none", label = "None")
  ),
  slotProps = list(
    legend = list(
      direction = "vertical"
    )
  ),
  height = 350
)
```

## Pie Chart Legend

Pie charts automatically show legend entries for each slice:

``` r

df <- starwars |>
  count(sex) |>
  filter(!is.na(sex)) |>
  select(label = sex, value = n)

PieChart(
  series = list(
    list(data = df)
  ),
  height = 300
)
```

## Color Legends

For charts using `colorMap`, you can use `ContinuousColorLegend` or
`PiecewiseColorLegend`:

### Continuous Color Legend

``` r

starwars_color <- starwars |>
  filter(!is.na(height), !is.na(mass), !is.na(birth_year), mass < 200) |>
  select(name, height, mass, birth_year) |>
  mutate(id = row_number())

ScatterChart(
  height = 350,
  dataset = starwars_color,
  series = list(
    list(
      datasetKeys = list(x = "height", y = "mass", z = "birth_year"),
      label = "Characters"
    )
  ),
  xAxis = list(list(label = "Height (cm)")),
  yAxis = list(list(label = "Mass (kg)")),
  zAxis = list(
    list(
      colorMap = list(
        type = "continuous",
        min = 0,
        max = 100,
        color = c("#d01c8b", "#4dac26")
      )
    )
  )
)
```

## Legend in Composition

When using composition, place `ChartsLegend` inside `ChartDataProvider`
but **outside** `ChartsSurface` (since in MUI v8 the legend is an HTML
component, not SVG):

``` r

library(muiMaterial)
#> 
#> Attaching package: 'muiMaterial'
#> The following object is masked from 'package:muiCharts':
#> 
#>     Toolbar

ChartDataProvider(
  dataset = starwars_gender,
  height = 300,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(type = "bar", dataKey = "male", label = "Male"),
    list(type = "bar", dataKey = "female", label = "Female")
  ),
  ChartsLegend(),
  ChartsSurface(
    BarPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Label Marks

`ChartsLabelMark` renders the colored shape used to identify a series —
the small icon that appears next to a series name. Use it inside custom
legend layouts or annotations:

``` r

library(muiMaterial)

ChartDataProvider(
  dataset = starwars_gender,
  height = 300,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(type = "bar", dataKey = "male", label = "Male"),
    list(type = "bar", dataKey = "female", label = "Female")
  ),
  Box(
    sx = list(display = "flex", gap = "16px", padding = "8px"),
    Box(
      sx = list(display = "flex", alignItems = "center", gap = "4px"),
      ChartsLabelMark(type = "square", color = "#19d23e"),
      Typography(variant = "body2", "Male")
    ),
    Box(
      sx = list(display = "flex", alignItems = "center", gap = "4px"),
      ChartsLabelMark(type = "square", color = "#9c27b0"),
      Typography(variant = "body2", "Female")
    )
  ),
  ChartsSurface(
    BarPlot(),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Learn More

For more details about legend customization, visit the [MUI X Legend
documentation](https://mui.com/x/react-charts/legend/).
