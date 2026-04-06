# Styling

``` r

library(muiCharts)
library(dplyr)
library(tidyr)
```

MUI X Charts offer several ways to customize colors and appearance. This
article demonstrates styling options based on the [MUI Styling
documentation](https://mui.com/x/react-charts/styling/).

## Color Palette

Use the `colors` prop to set a custom color palette for all series:

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
  colors = c("#440154FF", "#2A788EFF", "#FDE725FF", "#35B779FF"),
  height = 300
)
```

## Per-Series Colors

Assign colors to individual series using the `color` property:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(dataKey = "male", label = "Male", color = "#1976d2"),
    list(dataKey = "female", label = "Female", color = "#d32f2f")
  ),
  height = 300
)
```

## Color Maps

The `colorMap` property on axes maps data values to colors. Three types
are available:

### Piecewise Color Map

Defines thresholds and assigns different colors to ranges:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  yAxis = list(
    list(
      colorMap = list(
        type = "piecewise",
        thresholds = c(5, 10, 15),
        colors = c("#4caf50", "#ff9800", "#f44336", "#9c27b0")
      )
    )
  ),
  series = list(list(dataKey = "male", label = "Male")),
  height = 300
)
```

### Continuous Color Map

Maps a value range to a color gradient:

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
        color = c("#d01c8b", "#f1b6da", "#b8e186", "#4dac26")
      )
    )
  )
)
```

### Ordinal Color Map

Maps categorical values to specific colors:

``` r

starwars_species <- starwars |>
  filter(!is.na(height), species %in% c("Human", "Droid", "Wookiee")) |>
  count(species)

BarChart(
  dataset = starwars_species,
  xAxis = list(
    list(
      scaleType = "band",
      dataKey = "species",
      colorMap = list(
        type = "ordinal",
        values = c("Human", "Droid", "Wookiee"),
        colors = c("#1976d2", "#ff9800", "#4caf50")
      )
    )
  ),
  series = list(list(dataKey = "n", label = "Count")),
  height = 300
)
```

## The sx Prop

Use the `sx` prop for CSS overrides on chart elements using MUI CSS
class selectors:

``` r

BarChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "band", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(list(dataKey = "male", label = "Male")),
  sx = list(
    "& .MuiBarElement-root" = list(
      rx = 10
    ),
    "& .MuiChartsAxis-line" = list(
      stroke = "#999",
      strokeWidth = 2
    )
  ),
  height = 300
)
```

## Line Chart Styling

Customize line appearance with `sx`:

``` r

LineChart(
  dataset = starwars_gender,
  xAxis = list(
    list(scaleType = "point", dataKey = "films", tickLabelStyle = list(fontSize = "0.5em"))
  ),
  series = list(
    list(dataKey = "male", label = "Male"),
    list(dataKey = "female", label = "Female")
  ),
  sx = list(
    "& .MuiLineElement-root" = list(
      strokeWidth = 3,
      strokeDasharray = "5 5"
    ),
    "& .MuiMarkElement-root" = list(
      scale = "1.5"
    )
  ),
  height = 300
)
```

## Pie Chart Styling

Customize pie chart appearance:

``` r

df <- starwars |>
  count(sex) |>
  filter(!is.na(sex)) |>
  select(label = sex, value = n)

PieChart(
  series = list(
    list(
      data = df,
      innerRadius = 50,
      paddingAngle = 3,
      cornerRadius = 5
    )
  ),
  height = 300
)
```

## Dark/Light Mode Colors

Use a JavaScript function for the `color` prop to adapt to theme mode:

``` r

SparkLineChart(
  data = c(3, 5, 8, 12, 7, 15, 9),
  height = 100,
  color = JS("(mode) => (mode === 'light' ? '#1976d2' : '#90caf9')"),
  area = TRUE
)
```

## Learn More

For more details about styling, visit the [MUI X Styling
documentation](https://mui.com/x/react-charts/styling/).
