# Shiny inputs and server updates

This guide explains how muiMaterial components talk to a Shiny server:
the `.shinyInput()` wrappers, the `update*.shinyInput()` functions, the
reserved props, and the lower-level helpers
[`triggerEvent()`](https://appsilon.github.io/shiny.react/reference/triggerEvent.html),
[`setInput()`](https://appsilon.github.io/shiny.react/reference/setInput.html),
[`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html),
[`renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html)
and
[`reactOutput()`](https://appsilon.github.io/shiny.react/reference/reactOutput.html).

## `.shinyInput()` wrappers

A plain component such as
[`Slider()`](https://felixluginbuhl.com/muiMaterial/reference/Slider.md)
renders in the browser only. Its `.shinyInput()` variant,
`Slider.shinyInput(inputId, ...)`, also sends its value to the server as
`input[[inputId]]`:

``` r

library(shiny)
library(muiMaterial)

ui <- muiMaterialPage(
  CssBaseline(),
  Box(
    sx = list(p = 2, width = 300),
    Slider.shinyInput("size", value = 30, min = 0, max = 100, valueLabelDisplay = "auto"),
    verbatimTextOutput("value")
  )
)

server <- function(input, output, session) {
  output$value <- renderPrint(input$size)
}

shinyApp(ui, server)
```

- The first argument is the `inputId`; every other argument is a prop of
  the MUI component, exactly as with the plain component.
- `value` sets the **initial** value.

There are two kinds of `.shinyInput()` wrappers.

**Value inputs** report their current value:

| Function | `input[[inputId]]` |
|----|----|
| [`Autocomplete.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Autocomplete.md) | the selected option, or a vector with `multiple = TRUE` |
| [`BottomNavigation.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/BottomNavigation.md) | the `value` of the selected action |
| [`Checkbox.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Checkbox.md), [`Switch.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Switch.md), [`Radio.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Radio.md), [`FormControlLabel.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/FormControlLabel.md) | `TRUE` or `FALSE` |
| [`TextField.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TextField.md), [`Input.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Input.md), [`OutlinedInput.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/OutlinedInput.md), [`FilledInput.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/FilledInput.md) | the text (sent 250ms after the last keystroke) |
| [`Select.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Select.md), [`NativeSelect.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/NativeSelect.md) | the selected value, or a vector with `multiple = TRUE` |
| [`RadioGroup.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/RadioGroup.md) | the `value` of the selected radio |
| [`Slider.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Slider.md) | a number, or a vector of two for a range (sent 250ms after the last move) |
| [`Rating.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Rating.md) | a number |
| [`Pagination.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Pagination.md) | the page number (starting at 1) |
| [`Tabs.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Tabs.md), [`TabList.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TabList.md) | the `value` of the selected tab |
| [`ToggleButtonGroup.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/ToggleButtonGroup.md) | the selected value, or a vector without `exclusive = TRUE` |

**Action inputs** report a click counter, like
[`shiny::actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html):
[`Button.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Button.md),
[`IconButton.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/IconButton.md),
[`Fab.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Fab.md),
[`LoadingButton.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/LoadingButton.md),
[`ListItemButton.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/ListItemButton.md),
[`MenuItem.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/MenuItem.md),
[`StepButton.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/StepButton.md),
[`ToggleButton.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/ToggleButton.md).
Use them with
[`observeEvent()`](https://rdrr.io/pkg/shiny/man/observeEvent.html).

The overlays
[`Dialog.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Dialog.md),
[`Drawer.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Drawer.md),
[`Menu.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Menu.md),
[`Modal.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Modal.md)
and
[`Snackbar.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Snackbar.md)
are also action inputs: they count clicks inside the surface. Their
`open` state is set from the server; see
[Dialog](https://felixluginbuhl.com/muiMaterial/articles/dialog.html#dialogs-in-shiny-apps)
and
[Snackbar](https://felixluginbuhl.com/muiMaterial/articles/snackbar.html#snackbars-in-shiny-apps).
For overlays opened by a button,
[`.triggerId`](https://felixluginbuhl.com/muiMaterial/articles/triggerid.md)
is simpler.

The bundled showcase app lists all of them:

``` r

muiMaterialExample("showcase")
```

## Updating inputs from the server

Each `.shinyInput()` has an `update*.shinyInput()` function. It changes
**any prop** of the component, not only its value:

``` r

ui <- muiMaterialPage(
  CssBaseline(),
  Stack(
    spacing = 2,
    sx = list(p = 2, width = 300),
    TextField.shinyInput("name", label = "Name", value = ""),
    Button.shinyInput("reset", "Reset", variant = "outlined"),
    Button.shinyInput("submit", "Submit", variant = "contained", disabled = TRUE)
  )
)

server <- function(input, output, session) {
  # Enable the submit button once a name is typed
  observe({
    updateButton.shinyInput(inputId = "submit", disabled = !nzchar(input$name))
  })
  # Clear the field and change its label
  observeEvent(input$reset, {
    updateTextField.shinyInput(inputId = "name", value = "", label = "Name (cleared)")
  })
}

shinyApp(ui, server)
```

`session` is the first argument of the update functions and defaults to
the current session, so `inputId` must be named.

## Reserved props

A `.shinyInput()` wrapper owns the props that carry its value:

- value inputs own `value` (or `checked` / `page`) and `onChange`,
- action inputs own `onClick`.

Passing one of them through `...` replaces the wrapper’s own handler,
and `input[[inputId]]` stops updating. muiMaterial warns when this
happens:

``` r

Switch.shinyInput("dark", checked = TRUE)
#> Warning: Switch.shinyInput(): `checked` is a reserved prop -- a caller-supplied
#> value overrides the .shinyInput wiring and `input[[inputId]]` may stop updating. ...
```

Set the initial state with the `value` argument instead:
`Switch.shinyInput("dark", value = TRUE)`. For a custom
browser-to-server signal on a component, use a plain component with
`onClick = triggerEvent("name")` (see below).

Overriding the wiring on purpose is a legitimate advanced pattern, for
example when the server is the single source of truth and pushes
`checked` down with
[`renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html),
as in the [Transfer
List](https://felixluginbuhl.com/muiMaterial/articles/transfer-list.html#transfer-lists-in-shiny-apps)
example. Silence the warning with:

``` r

options(muiMaterial.warnReservedProps = FALSE)
```

## Events without an input: `triggerEvent()` and `setInput()`

Any callback prop of any component (`onClick`, `onChange`, `onClose`, …)
can send a value to the server, without a `.shinyInput()` wrapper:

- `triggerEvent("name")` sets `input$name` each time the callback runs.
  Use it with `observeEvent(input$name, ...)`.
- `setInput("name", accessor)` sets `input$name` to one of the arguments
  of the callback: `setInput("name")` is the first argument,
  `setInput("name", 1)` the second one, and
  `setInput("name", "[0].target.value")` a JavaScript accessor.

``` r

ui <- muiMaterialPage(
  CssBaseline(),
  Box(
    sx = list(p = 2),
    Chip(label = "Delete me", onDelete = triggerEvent("chip_deleted")),
    Accordion(
      onChange = setInput("details_expanded", 1), # onChange(event, expanded)
      AccordionSummary("Details"),
      AccordionDetails("Content")
    ),
    verbatimTextOutput("state")
  )
)

server <- function(input, output, session) {
  output$state <- renderPrint(list(deleted = input$chip_deleted, expanded = input$details_expanded))
}

shinyApp(ui, server)
```

## JavaScript callbacks: `JS()`

Props that expect a JavaScript function (callbacks, render functions,
`sx` functions of the theme) are written as strings marked with
[`JS()`](https://appsilon.github.io/shiny.react/reference/JS.html). The
function runs in the browser:

``` r

Button(onClick = JS("() => alert('Hello from the browser')"), "Say hello")

# Send a custom value with Shiny's JavaScript API
MenuItem(onClick = JS("() => Shiny.setInputValue('action', 'edit', {priority: 'event'})"), "Edit")

# sx as a function of the theme
Box(sx = JS("(theme) => ({ color: theme.palette.primary.main })"), "Themed text")
```

`{priority: 'event'}` makes Shiny send the value even when it did not
change, so
[`observeEvent()`](https://rdrr.io/pkg/shiny/man/observeEvent.html) runs
on every click. When a component prop expects a component (not an
element), pass it by reference, for example
`slots = list(transition = JS("jsmodule['@mui/material'].Fade"))`.

## Server-side rendering: `renderReact()` and `reactOutput()`

Render muiMaterial components from the server with either:

- [`shiny::renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html) and
  [`shiny::uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html),
  or
- [`renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html)
  and
  [`reactOutput()`](https://appsilon.github.io/shiny.react/reference/reactOutput.html),
  re-exported from shiny.react.

[`renderReact()`](https://appsilon.github.io/shiny.react/reference/renderReact.html)
updates the React elements already on the page instead of replacing
them. Transitions run, and the state of components that did not change
is kept. Prefer it for components that change often, such as progress
bars or
[transitions](https://felixluginbuhl.com/muiMaterial/articles/transitions.html#transitions-in-shiny-apps):

``` r

ui <- muiMaterialPage(
  CssBaseline(),
  Box(sx = list(p = 2, width = 300), Slider.shinyInput("value", value = 40), reactOutput("progress"))
)

server <- function(input, output, session) {
  output$progress <- renderReact({
    LinearProgress(variant = "determinate", value = input$value)
  })
}

shinyApp(ui, server)
```

## Bookmarking

Shiny’s
[bookmarking](https://shiny.posit.co/r/articles/share/bookmarking-state/)
saves `input` values in the URL, but restores them only for Shiny’s own
input bindings. Restore `.shinyInput()` values in
[`onRestore()`](https://rdrr.io/pkg/shiny/man/onBookmark.html) with
their update function:

``` r

ui <- function(request) {
  muiMaterialPage(
    CssBaseline(),
    Box(
      sx = list(p = 2),
      TextField.shinyInput("txt", label = "Enter text", value = "initial"),
      verbatimTextOutput("show_txt")
    )
  )
}

server <- function(input, output, session) {
  output$show_txt <- renderPrint(input$txt)

  onRestore(function(state) {
    updateTextField.shinyInput(session, "txt", value = state$input$txt)
  })

  # Update the URL on every change
  observe({
    reactiveValuesToList(input)
    session$doBookmark()
  })
  onBookmarked(function(url) updateQueryString(url))
}

shinyApp(ui, server, enableBookmarking = "url")
```

[`shiny::bookmarkButton()`](https://rdrr.io/pkg/shiny/man/bookmarkButton.html)
needs Bootstrap, which
[`muiMaterialPage()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialPage.md)
removes. Updating the URL automatically, as above, avoids the button.
Run this example with `muiMaterialExample("bookmarking")`.

For state kept in the URL on the client side (no server), see [Using a
router](https://felixluginbuhl.com/muiMaterial/articles/routing.md).
