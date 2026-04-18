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

film_counts <- starwars_films |>
  mutate(
    Characters = lengths(characters),
    Planets    = lengths(planets)
  ) |>
  arrange(episode_id)

ui <- tagList(uiOutput("chart"))

server <- function(input, output, session) {
  output$chart <- renderUI({
    BarChart(
      dataset = film_counts,
      layout  = "horizontal",
      yAxis   = list(list(scaleType = "band", dataKey = "title", width = 220)),
      series  = list(
        list(dataKey = "Characters", label = "Characters"),
        list(dataKey = "Planets",    label = "Planets")
      ),
      grid   = list(horizontal = TRUE),
      height = 380
    )
  })
}

shinyApp(ui, server)
```

![BarChart](https://raw.githubusercontent.com/lgnbhl/muiCharts/refs/heads/main/man/figures/BarChart.png)

## Reactive Charts

Use [muiMaterial](https://github.com/lgnbhl/muiMaterial) inputs to
dynamically update charts — switch chart type and select which film
elements to display:

``` r

library(muiCharts)
library(muiMaterial)
library(shiny)
library(dplyr)

film_counts <- starwars_films |>
  mutate(
    Characters = lengths(characters),
    Planets    = lengths(planets),
    Species    = lengths(species),
    Starships  = lengths(starships)
  ) |>
  arrange(episode_id)

ui <- muiMaterialPage(
  CssBaseline(
    Container(
      maxWidth = "md",
      sx = list(py = 4),
      Typography("Star Wars Films", variant = "h4", gutterBottom = TRUE),
      Stack(
        spacing = 3,
        ToggleButtonGroup.shinyInput(
          inputId   = "chart_type",
          value     = "bar",
          exclusive = TRUE,
          ToggleButton.shinyInput(inputId = "btn_bar",  value = "bar",  "Bar"),
          ToggleButton.shinyInput(inputId = "btn_line", value = "line", "Line")
        ),
        Box(
          Typography("Elements:", variant = "subtitle1"),
          FormGroup(
            row = TRUE,
            FormControlLabel(
              control = Checkbox.shinyInput(inputId = "chk_chars",     value = TRUE),
              label   = "Characters"
            ),
            FormControlLabel(
              control = Checkbox.shinyInput(inputId = "chk_planets",   value = TRUE),
              label   = "Planets"
            ),
            FormControlLabel(
              control = Checkbox.shinyInput(inputId = "chk_species",   value = FALSE),
              label   = "Species"
            ),
            FormControlLabel(
              control = Checkbox.shinyInput(inputId = "chk_starships", value = FALSE),
              label   = "Starships"
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

  observeEvent(input$btn_bar,  chart_type("bar"))
  observeEvent(input$btn_line, chart_type("line"))

  selected_series <- reactive({
    keys <- c(
      Characters = input$chk_chars,
      Planets    = input$chk_planets,
      Species    = input$chk_species,
      Starships  = input$chk_starships
    )
    names(keys[keys == TRUE])
  })

  output$chart <- renderUI({
    req(length(selected_series()) > 0)
    series <- lapply(selected_series(), function(s) list(dataKey = s, label = s))

    if (chart_type() == "bar") {
      BarChart(
        dataset = film_counts,
        xAxis   = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
        series  = series,
        height  = 400
      )
    } else {
      LineChart(
        dataset = film_counts,
        xAxis   = list(list(scaleType = "point", dataKey = "episode_id", label = "Star Wars Episode")),
        series  = series,
        height  = 400
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
library(dplyr)
library(glue)

film_counts <- starwars_films |>
  mutate(
    Characters = lengths(characters),
    Planets    = lengths(planets)
  ) |>
  arrange(episode_id)

ui <- tagList(
  tags$h1("Click on the chart"),
  uiOutput("chart"),
  tags$h3("You clicked:"),
  tableOutput("clickEvent")
)

server <- function(input, output, session) {
  setClickEvent <- function(inputId) {
    JS(glue::glue("(event, d) => Shiny.setInputValue('{inputId}', d)"))
  }

  output$clickEvent <- renderTable({
    includeNull <- function(x) ifelse(length(x) == 0, NA_character_, paste0(x))
    data.frame(
      episode    = includeNull(input$userClick$axisValue[1]),
      Characters = includeNull(input$userClick$seriesValues$`auto-generated-id-0`[1]),
      Planets    = includeNull(input$userClick$seriesValues$`auto-generated-id-1`[1])
    )
  })

  output$chart <- renderUI({
    BarChart(
      dataset    = film_counts,
      onAxisClick = setClickEvent("userClick"),
      xAxis      = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
      series     = list(
        list(dataKey = "Characters", label = "Characters"),
        list(dataKey = "Planets",    label = "Planets")
      ),
      height = 300
    )
  })
}

shinyApp(ui, server)
```

![ClickEvent](https://raw.githubusercontent.com/lgnbhl/muiCharts/refs/heads/main/man/figures/ClickEvent.png)

## Dashboard with muiMaterial

Combine pie chart and gauge in a responsive dashboard layout:

``` r

library(muiCharts)
library(muiMaterial)
library(shiny)
library(dplyr)

gender_dist <- starwars_people |>
  count(gender) |>
  filter(!is.na(gender)) |>
  select(label = gender, value = n)

male_pct <- round(mean(starwars_people$gender == "male", na.rm = TRUE) * 100)

ui <- muiMaterialPage(
  CssBaseline(
    Container(
      maxWidth = "lg",
      sx = list(py = 4),
      Typography("Star Wars Metrics", variant = "h4", gutterBottom = TRUE),
      Box(
        Typography("Chart height:", variant = "subtitle1"),
        Slider.shinyInput(
          inputId          = "height",
          value            = 300,
          min              = 200,
          max              = 500,
          step             = 50,
          valueLabelDisplay = "auto",
          sx               = list(maxWidth = 300)
        )
      ),
      Grid(
        container = TRUE,
        spacing   = 3,
        sx        = list(mt = 2),
        Grid(
          size = list(xs = 12, md = 8),
          Card(CardContent(
            Typography("Characters by Gender", variant = "h6"),
            uiOutput("pieChart")
          ))
        ),
        Grid(
          size = list(xs = 12, md = 4),
          Card(CardContent(
            Typography("Male Characters", variant = "h6"),
            uiOutput("gauge")
          ))
        )
      )
    )
  )
)

server <- function(input, output, session) {
  output$pieChart <- renderUI({
    PieChart(
      series = list(list(data = gender_dist, innerRadius = 50, outerRadius = 100)),
      height = input$height
    )
  })

  output$gauge <- renderUI({
    Gauge(width = 150, height = 150, value = male_pct, startAngle = -90, endAngle = 90)
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
re-exported here for convenience:

``` r

library(muiCharts)
library(shiny)
library(dplyr)

film_counts <- starwars_films |>
  mutate(Characters = lengths(characters)) |>
  arrange(episode_id)

ui     <- tagList(reactOutput("chart"))
server <- function(input, output, session) {
  output$chart <- renderReact({
    BarChart(
      dataset = film_counts,
      xAxis   = list(list(scaleType = "band", dataKey = "episode_id", label = "Star Wars Episode")),
      series  = list(list(dataKey = "Characters", label = "Characters")),
      height  = 300
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
