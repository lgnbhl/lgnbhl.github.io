# Axis & Grid

``` r

library(muiCharts)
library(dplyr)
library(tidyr)
```

MUI X Charts provide flexible axis configuration. This article
demonstrates axis customization based on the [MUI Axis
documentation](https://mui.com/x/react-charts/axis/).

## Scale Types

The `scaleType` property defines how data maps to axis positions.
Available types:

- `"band"` — categorical (for bar charts)
- `"point"` — categorical (for line/scatter charts)
- `"linear"` — numeric (default for value axes)
- `"log"` — logarithmic
- `"sqrt"` — square root
- `"time"` — date/time values

### Band Scale

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
    list(scaleType = "band", dataKey = "films")
  ),
  series = list(list(dataKey = "male", label = "Male")),
  height = 300
)
```

### Linear Scale

``` r

LineChart(
  dataset = data.frame(x = c(1, 2, 5, 10, 20), y = c(2, 5, 10, 15, 30)),
  xAxis = list(list(scaleType = "linear", dataKey = "x")),
  series = list(list(dataKey = "y")),
  height = 300
)
```

### Log Scale

``` r

LineChart(
  dataset = data.frame(x = c(1, 10, 100, 1000), y = c(1, 2, 3, 4)),
  xAxis = list(list(scaleType = "log", dataKey = "x")),
  series = list(list(dataKey = "y")),
  height = 300
)
```

## Axis Labels

Add labels to axes using the `label` property:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      label = "Star Wars Films",
      tickLabelStyle = list(fontSize = "0.5em")
    )
  ),
  yAxis = list(
    list(label = "Number of Characters")
  ),
  series = list(list(dataKey = "male", label = "Male")),
  height = 300
)
```

## Value Formatters

Customize how axis values are displayed using `valueFormatter`:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      tickLabelStyle = list(fontSize = "0.5em")
    )
  ),
  yAxis = list(
    list(
      valueFormatter = JS("(value) => `${value} characters`"),
      width = 100
    )
  ),
  series = list(list(dataKey = "male", label = "Male")),
  height = 300
)
```

## Tick Label Styling

Customize tick label appearance with `tickLabelStyle`:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      height = 100,
      tickLabelStyle = list(
        fontSize = "0.6em",
        angle = 45
      )
    )
  ),
  series = list(list(dataKey = "male", label = "Male")),
  height = 350
)
```

## Multiple Axes

Use multiple y-axes for series with different scales:

``` r

starwars_multi <- starwars |>
  filter(!is.na(height), !is.na(mass), !is.na(birth_year), mass < 200) |>
  select(name, height, mass, birth_year) |>
  head(10)

LineChart(
  dataset = starwars_multi,
  xAxis = list(
    list(scaleType = "point", dataKey = "name", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  yAxis = list(
    list(id = "leftAxis", label = "Height (cm)"),
    list(id = "rightAxis", label = "Mass (kg)")
  ),
  series = list(
    list(dataKey = "height", label = "Height", yAxisId = "leftAxis"),
    list(dataKey = "mass", label = "Mass", yAxisId = "rightAxis")
  ),
  height = 350
)
```

## Grid Lines

Add grid lines with the `grid` prop:

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
  grid = list(horizontal = TRUE, vertical = TRUE),
  height = 300
)
```

## Reference Lines

Use `ChartsReferenceLine` to add horizontal or vertical reference lines.
This requires the composition API:

``` r

library(muiMaterial)
#> 
#> Attaching package: 'muiMaterial'
#> The following object is masked from 'package:muiCharts':
#> 
#>     Toolbar

avg_male <- round(mean(starwars_gender$male, na.rm = TRUE))

ChartDataProvider(
  dataset = starwars_gender,
  height = 350,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "films",
      tickLabelStyle = list(fontSize = "0.5em")
    )
  ),
  series = list(
    list(type = "bar", dataKey = "male", label = "Male")
  ),
  ChartsTooltip(),
  ChartsSurface(
    ChartsGrid(horizontal = TRUE),
    BarPlot(),
    ChartsReferenceLine(
      y = avg_male,
      label = paste("Avg:", avg_male),
      lineStyle = list(stroke = "red", strokeDasharray = "5 5")
    ),
    ChartsXAxis(),
    ChartsYAxis()
  )
)
```

## Margin Customization

Control spacing between the SVG edge and drawing area with the `margin`
prop:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(list(dataKey = "male", label = "Male")),
  margin = list(top = 20, bottom = 60, left = 80, right = 20),
  height = 300
)
```

## Learn More

For more details about axis customization, visit the [MUI X Axis
documentation](https://mui.com/x/react-charts/axis/).
