# Tabs

Tabs organize content into separate views where only one view is visible
at a time.

## Basic Usage

Use
[`TabContext.static()`](https://felixluginbuhl.com/muiMaterial/reference/TabContext.md),
[`TabList.static()`](https://felixluginbuhl.com/muiMaterial/reference/TabList.md),
and
[`TabPanel()`](https://felixluginbuhl.com/muiMaterial/reference/TabPanel.md)
to create tabs. These are custom wrappers around
[`@mui/lab`](https://mui.com/material-ui/about-the-lab/) tab components
that manage tab state internally with `React.useState`, so they work
everywhere – in Shiny apps, Quarto documents, and plain R Markdown –
with no server logic required.

``` r

library(muiMaterial)

TabContext.static(
  value = "one",
  Box(
    sx = list(borderBottom = 1, borderColor = "divider"),
    TabList.static(
      Tab(label = "Item One", value = "one"),
      Tab(label = "Item Two", value = "two"),
      Tab(label = "Item Three", value = "three")
    )
  ),
  TabPanel(value = "one", "Content 1"),
  TabPanel(value = "two", "Content 2"),
  TabPanel(value = "three", "Content 3")
)
```

The `value` argument in
[`TabContext.static()`](https://felixluginbuhl.com/muiMaterial/reference/TabContext.md)
sets the initially selected tab. Each `Tab` and `TabPanel.static` share
a matching `value` string to link headers to content.

### Quarto usage

In a Quarto document (`.qmd`), use the `.static` variants inside an R
code chunk. No server function or `runtime: shiny` is needed.

    ---
    title: "Tabs Example"
    format: html
    ---


    ``` r
    library(muiMaterial)

    TabContext.static(
      value = "one",
      Box(
        sx = list(borderBottom = 1, borderColor = "divider"),
        TabList.static(
          Tab(label = "Item One", value = "one"),
          Tab(label = "Item Two", value = "two"),
          Tab(label = "Item Three", value = "three")
        )
      ),
      TabPanel(value = "one", Typography("First tab content")),
      TabPanel(value = "two", Typography("Second tab content")),
      TabPanel(value = "three", Typography("Third tab content"))
    )
    ```


    ```{=html}
    <div class="react-container" data-react-id="kdcrprizswzfrkbqpkwn">
    <script class="react-data" type="application/json">{"type":"element","module":"@/muiMaterial","name":"MuiStaticTabContext","props":{"type":"object","value":{"value":{"type":"raw","value":"one"},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Box","props":{"type":"object","value":{"sx":{"type":"raw","value":{"borderBottom":1,"borderColor":"divider"}},"children":{"type":"element","module":"@/muiMaterial","name":"MuiStaticTabList","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Tab","props":{"type":"raw","value":{"label":"Item One","value":"one"}}},{"type":"element","module":"@mui/material","name":"Tab","props":{"type":"raw","value":{"label":"Item Two","value":"two"}}},{"type":"element","module":"@mui/material","name":"Tab","props":{"type":"raw","value":{"label":"Item Three","value":"three"}}}]}}}}}}},{"type":"element","module":"@mui/lab","name":"TabPanel","props":{"type":"object","value":{"value":{"type":"raw","value":"one"},"children":{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"children":"First tab content"}}}}}},{"type":"element","module":"@mui/lab","name":"TabPanel","props":{"type":"object","value":{"value":{"type":"raw","value":"two"},"children":{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"children":"Second tab content"}}}}}},{"type":"element","module":"@mui/lab","name":"TabPanel","props":{"type":"object","value":{"value":{"type":"raw","value":"three"},"children":{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"children":"Third tab content"}}}}}}]}}}}</script>
    <script>jsmodule['@/shiny.react'].findAndRenderReactData('kdcrprizswzfrkbqpkwn')</script>
    </div>
    ```

### Why `@mui/lab`?

MUI provides tab components in two packages:

- **`@mui/material`**: `Tabs` and `Tab` – base components that handle
  the tab header and selection state. Always controlled: requires a
  `value` prop and an `onChange` handler.
- **`@mui/lab`**: `TabContext`, `TabList`, and `TabPanel` – higher-level
  wrappers that add automatic coordination between tab headers and
  content panels.

The `.static` variants wrap `@mui/lab` components and add internal
`React.useState` management, which maps naturally to R’s declarative UI
model – you declare the tabs and their content, and the switching is
handled automatically.

## Advanced: `.shinyInput` Variants

The `.shinyInput` variants
([`TabContext.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabContext.md),
[`TabList.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabList.md),
[`TabPanel.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabPanel.md))
expose the selected tab to the Shiny server as a reactive input. This is
useful when:

- **Server-side reactions to tab changes**: You need the server to know
  which tab is active – for example, to lazy-load expensive content,
  trigger data fetches, or log analytics only when a specific tab is
  viewed.
- **Programmatic tab switching**: The server can change the active tab
  via
  [`updateTabContext.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabContext.md)
  in response to other events (e.g., completing a form step, receiving a
  notification).
- **Conditional server logic**: You want
  `observeEvent(input$tabList, ...)` to run code when the user switches
  tabs, such as refreshing a plot or resetting a form.

``` r

library(shiny)
library(muiMaterial)

ui <- muiMaterialPage(
  TabContext.shinyInput(
    inputId = "tabContext",
    value = "one",
    Box(
      sx = list(borderBottom = 1, borderColor = "divider"),
      TabList.shinyInput(
        inputId = "tabList",
        value = "one",
        Tab(label = "Item One", value = "one"),
        Tab(label = "Item Two", value = "two"),
        Tab(label = "Item Three", value = "three")
      )
    ),
    TabPanel.shinyInput(inputId = "panel1", value = "one", "Content 1"),
    TabPanel.shinyInput(inputId = "panel2", value = "two", "Content 2"),
    TabPanel.shinyInput(inputId = "panel3", value = "three", "Content 3")
  )
)

server <- function(input, output, session) {
  # Bridge TabList selection to TabContext
  observe({
    updateTabContext.shinyInput(
      inputId = "tabContext",
      value = input$tabList
    )
  })

  # React to tab changes on the server
  observeEvent(input$tabList, {
    message("User switched to tab: ", input$tabList)
  })
}

shinyApp(ui, server)
```

Because `TabContext` and `TabList` are separate Shiny inputs, clicking a
tab updates `TabList`’s value but does not automatically propagate to
`TabContext`. The
[`observe()`](https://rdrr.io/pkg/shiny/man/observe.html) block bridges
them: it watches `input$tabList` and calls
[`updateTabContext.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabContext.md)
to match, which controls which `TabPanel` is visible.

Note that
[`TabPanel.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabPanel.md)
requires an `inputId` even though it never produces a value for the
server. This is because `.shinyInput()` routes through the package’s
JavaScript bundle where it shares the same React tree as `TabContext`.
The plain
[`TabPanel()`](https://felixluginbuhl.com/muiMaterial/reference/TabPanel.md)
would resolve in a separate module context, breaking the React context
connection.

### Comparison

|  | `.static` | `.shinyInput` |
|----|----|----|
| Requires Shiny | No | Yes |
| Works in Quarto | Yes | No |
| Server can read selected tab | No | Yes (`input$tabList`) |
| Server can change selected tab | No | Yes (`updateTabContext.shinyInput`) |
| Requires observer | No | Yes |
| Requires `inputId` | No | Yes |
