# TabContext

<https://mui.com/material-ui/api/tab-context/>

## Usage

``` r
TabContext(...)

TabContext(...)

TabContext.shinyInput(inputId, ..., value = defaultValue)

updateTabContext.shinyInput(
  session = shiny::getDefaultReactiveDomain(),
  inputId,
  ...
)

TabContext.static(value, ...)
```

## Arguments

- ...:

  Child elements (typically a `Box` wrapping `TabList.static` and
  `TabPanel.static` components).

- inputId:

  ID of the component.

- value:

  Initial selected tab value.

- session:

  Object passed as the \`session\` argument to Shiny server.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- value `number| string`\
  Default is NA The value of the currently selected Tab.

- children `node`\
  Default is NA The content of the component.
