# Shiny

muiCharts integrates with [Shiny](https://shiny.posit.co/) using
[`shiny::uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) and
[`shiny::renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html). This
article demonstrates common patterns for using muiCharts in Shiny
applications.

## Bootstrap Conflict

muiCharts uses [MUI](https://mui.com/) (Material UI) for rendering.
Shiny’s default UI functions
([`fluidPage()`](https://rdrr.io/pkg/shiny/man/fluidPage.html),
[`sidebarLayout()`](https://rdrr.io/pkg/shiny/man/sidebarLayout.html),
etc.) and [bslib](https://rstudio.github.io/bslib/) both rely on
Bootstrap CSS, which can conflict with MUI styling and cause visual
issues in your charts.

To avoid conflicts, we recommend using
[muiMaterial](https://github.com/lgnbhl/muiMaterial) for the general
layout and UI inputs of your app. Since muiMaterial is also built on
MUI, it shares the same design system as muiCharts and the two work
together seamlessly.

You can still use other R Shiny packages (e.g., `shiny`, `bslib`, `DT`,
`plotly`). However, if some UI elements look different than expected, it
is likely due to CSS conflicts between Bootstrap and MUI.

## Basic Usage

Render any muiCharts component inside
[`renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html):

``` r

library(muiCharts)
library(shiny)
library(dplyr)
library(tidyr)

starwars_gender <- starwars |>
  unnest_longer(films) |>
  count(films, sex) |>
  filter(!is.na(sex)) |>
  pivot_wider(names_from = sex, values_from = n) |>
  arrange(female)

ui <- tagList(
  uiOutput("chart")
)

server <- function(input, output, session) {
  output$chart <- renderUI({
    BarChart(
      dataset = starwars_gender,
      xAxis = list(
        list(
          scaleType = "band",
          dataKey = "films",
          label = "Movies"
        )
      ),
      series = list(
        list(dataKey = "male", label = "Male"),
        list(dataKey = "female", label = "Female"),
        list(dataKey = "hermaphroditic", label = "Hermaphroditic"),
        list(dataKey = "none", label = "None")
      ),
      grid = list(horizontal = TRUE),
      height = 300
    )
  })
}

shinyApp(ui, server)
```

![BarChart](https://raw.githubusercontent.com/lgnbhl/muiCharts/refs/heads/main/man/figures/BarChart.png)

## Reactive Charts

Use [muiMaterial](https://github.com/lgnbhl/muiMaterial) inputs to
dynamically update charts:

``` r

library(muiCharts)
library(muiMaterial)
library(shiny)
library(dplyr)
library(tidyr)

starwars_gender <- starwars |>
  unnest_longer(films) |>
  count(films, sex) |>
  filter(!is.na(sex)) |>
  pivot_wider(names_from = sex, values_from = n) |>
  mutate(release = c(1977, 2002, 1983, 2005, 1980, 2015, 1999)) |>
  arrange(release)

ui <- muiMaterialPage(
  CssBaseline(
    Container(
      maxWidth = "md",
      sx = list(py = 4),
      Typography("Star Wars Characters", variant = "h4", gutterBottom = TRUE),
      Stack(
        spacing = 3,
        ToggleButtonGroup.shinyInput(
          inputId = "chart_type",
          value = "bar",
          exclusive = TRUE,
          ToggleButton.shinyInput(inputId = "btn_bar", value = "bar", "Bar"),
          ToggleButton.shinyInput(inputId = "btn_line", value = "line", "Line")
        ),
        Box(
          Typography("Gender:", variant = "subtitle1"),
          FormGroup(
            row = TRUE,
            FormControlLabel(
              control = Checkbox.shinyInput(inputId = "chk_male", value = TRUE),
              label = "Male"
            ),
            FormControlLabel(
              control = Checkbox.shinyInput(inputId = "chk_female", value = TRUE),
              label = "Female"
            ),
            FormControlLabel(
              control = Checkbox.shinyInput(inputId = "chk_hermaphroditic", value = FALSE),
              label = "Hermaphroditic"
            ),
            FormControlLabel(
              control = Checkbox.shinyInput(inputId = "chk_none", value = FALSE),
              label = "None"
            )
          )
        ),
        uiOutput("chart")
      )
    )
  )
)

server <- function(input, output, session) {
  chart_type <- reactiveVal("bar")

  observeEvent(input$btn_bar, chart_type("bar"))
  observeEvent(input$btn_line, chart_type("line"))
  observeEvent(c(input$btn_bar, input$btn_line), {
    updateToggleButtonGroup.shinyInput(
      inputId = "chart_type", value = chart_type()
    )
  })

  selected_gender <- reactive({
    genders <- c(
      male = input$chk_male,
      female = input$chk_female,
      hermaphroditic = input$chk_hermaphroditic,
      none = input$chk_none
    )
    names(genders[genders == TRUE])
  })

  output$chart <- renderUI({
    req(length(selected_gender()) > 0)

    series <- lapply(selected_gender(), function(g) {
      list(dataKey = g, label = tools::toTitleCase(g))
    })

    if (chart_type() == "bar") {
      BarChart(
        dataset = starwars_gender,
        xAxis = list(
          list(
            scaleType = "band",
            dataKey = "films",
            tickLabelStyle = list(fontSize = "0.5em")
          )
        ),
        series = series,
        height = 400
      )
    } else {
      LineChart(
        dataset = starwars_gender,
        xAxis = list(
          list(
            scaleType = "point",
            dataKey = "films",
            tickLabelStyle = list(fontSize = "0.5em")
          )
        ),
        series = series,
        height = 400
      )
    }
  })
}

shinyApp(ui, server)
```

## Click Events

Capture user clicks on chart elements using `onAxisClick` and
`Shiny.setInputValue()`:

``` r

library(muiCharts)
library(shiny)
library(glue)

ui <- tagList(
  tags$h1("Click on the chart"),
  uiOutput("chart"),
  tags$h3("User clicked on:"),
  tableOutput("clickEvent")
)

server <- function(input, output, session) {

  setClickEvent <- function(inputId) {
    JS(glue::glue("(event, d) => Shiny.setInputValue('{inputId}', d)"))
  }

  output$clickEvent <- renderTable({
    includeNull <- function(x) {
      ifelse(length(x) == 0, NA_character_, paste0(x))
    }

    data.frame(
      films = includeNull(input$userClick$axisValue[1]),
      male = includeNull(input$userClick$seriesValues$`auto-generated-id-0`[1]),
      female = includeNull(input$userClick$seriesValues$`auto-generated-id-1`[1])
    )
  })

  output$chart <- renderUI({
    BarChart(
      dataset = starwars_gender,
      onAxisClick = setClickEvent("userClick"),
      xAxis = list(
        list(
          scaleType = "band",
          dataKey = "films",
          label = "Movies"
        )
      ),
      series = list(
        list(dataKey = "male", label = "Male"),
        list(dataKey = "female", label = "Female")
      ),
      height = 300
    )
  })
}

shinyApp(ui, server)
```

![ClickEvent](https://raw.githubusercontent.com/lgnbhl/muiCharts/refs/heads/main/man/figures/ClickEvent.png)

## Dashboard with muiMaterial

Use [muiMaterial](https://github.com/lgnbhl/muiMaterial) layout
components for a dashboard that works seamlessly with muiCharts:

``` r

library(muiCharts)
library(muiMaterial)
library(shiny)
library(dplyr)

starwars_sex <- starwars |>
  count(sex) |>
  filter(!is.na(sex)) |>
  select(label = sex, value = n)

human_pct <- round(
  sum(starwars$species == "Human", na.rm = TRUE) / nrow(starwars) * 100
)

ui <- muiMaterialPage(
  CssBaseline(
    Container(
      maxWidth = "lg",
      sx = list(py = 4),
      Typography("Star Wars Metrics", variant = "h4", gutterBottom = TRUE),
      Box(
        Typography("Chart height:", variant = "subtitle1"),
        Slider.shinyInput(
          inputId = "height",
          value = 300,
          min = 200,
          max = 500,
          step = 50,
          valueLabelDisplay = "auto",
          sx = list(maxWidth = 300)
        )
      ),
      Grid(
        container = TRUE,
        spacing = 3,
        sx = list(mt = 2),
        Grid(
          size = list(xs = 12, md = 8),
          Card(
            CardContent(
              Typography("Characters by Sex", variant = "h6"),
              uiOutput("pieChart")
            )
          )
        ),
        Grid(
          size = list(xs = 12, md = 4),
          Card(
            CardContent(
              Typography("Human Characters", variant = "h6"),
              uiOutput("gauge")
            )
          )
        )
      )
    )
  )
)

server <- function(input, output, session) {
  output$pieChart <- renderUI({
    PieChart(
      series = list(
        list(
          data = starwars_sex,
          innerRadius = 50,
          outerRadius = 100
        )
      ),
      height = input$height
    )
  })

  output$gauge <- renderUI({
    Gauge(
      width = 150,
      height = 150,
      value = human_pct,
      startAngle = -90,
      endAngle = 90
    )
  })
}

shinyApp(ui, server)
```

## Chart Dependency

[`muiChartsDependency()`](https://felixluginbuhl.com/muiCharts/reference/muiChartsDependency.md)
returns the HTML dependency for the MUI X Charts JavaScript library. Use
it to manually add the dependency when embedding charts in custom HTML:

``` r

library(htmltools)

browsable(tagList(
  muiChartsDependency(),
  tags$div(id = "my-custom-chart")
))
```

## reactOutput and renderReact

[`reactOutput()`](https://appsilon.github.io/shiny.react/reference/reactOutput.html)
and
[`renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html)
are alternatives to
[`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) /
[`renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html) from the
[shiny.react](https://appsilon.github.io/shiny.react/) package,
re-exported here for convenience. They provide more direct React
rendering control:

``` r

library(muiCharts)
library(shiny)
library(dplyr)
library(tidyr)

starwars_gender <- starwars |>
  unnest_longer(films) |>
  count(films, sex) |>
  filter(!is.na(sex)) |>
  pivot_wider(names_from = sex, values_from = n, values_fill = 0) |>
  arrange(female)

ui <- tagList(
  reactOutput("chart")
)

server <- function(input, output, session) {
  output$chart <- renderReact({
    BarChart(
      dataset = starwars_gender,
      xAxis = list(list(scaleType = "band", dataKey = "films")),
      series = list(list(dataKey = "male", label = "Male")),
      height = 300
    )
  })
}

shinyApp(ui, server)
```

## setInput and triggerEvent

[`setInput()`](https://appsilon.github.io/shiny.react/reference/setInput.html)
programmatically sets a Shiny input value from the server.
[`triggerEvent()`](https://appsilon.github.io/shiny.react/reference/triggerEvent.html)
fires a named event to connected JavaScript handlers. Both are
re-exported from [shiny.react](https://appsilon.github.io/shiny.react/):

``` r

server <- function(input, output, session) {
  # Reset a Shiny input value programmatically
  observeEvent(input$reset, {
    setInput(session, inputId = "selectedIndex", value = 0L)
  })

  # Trigger a custom event for JavaScript-side chart interactions
  observeEvent(input$highlight, {
    triggerEvent(session, "chart:highlight", data = list(index = 0L))
  })
}
```

## Learn More

- [Shiny documentation](https://shiny.posit.co/)
- [muiMaterial documentation](https://github.com/lgnbhl/muiMaterial)
