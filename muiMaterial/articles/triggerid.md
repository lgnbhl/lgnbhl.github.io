# Overlays with .triggerId

``` r

library(muiMaterial)
library(shiny)
```

Overlays (dialogs, drawers, menus, popovers) have an open state. In
React, it lives in a `useState()` hook of the parent component, which R
code cannot write. muiMaterial offers several ways to handle it:

| Approach | Open state lives in | Server code | Works in Quarto / static HTML |
|----|----|----|----|
| **`.triggerId()` wrappers** (this page) | the browser | none | yes |
| [reactRouter](https://felixluginbuhl.com/reactRouter/) routes (see [Dialog](https://felixluginbuhl.com/muiMaterial/articles/dialog.md)) | the URL | none | yes |
| `.shinyInput()` wrappers + `update*.shinyInput()` | the Shiny server | yes | no |

The `.triggerId()` wrappers cover the most common case: **open an
overlay when an element is clicked**. They are available for six
components:

| Function | Opens | Closes |
|----|----|----|
| [`Dialog.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Dialog.triggerId.md) | a dialog | backdrop click, Escape |
| [`Modal.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Modal.triggerId.md) | a modal | backdrop click, Escape |
| [`Drawer.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Drawer.triggerId.md) | a temporary drawer | backdrop click, Escape, a click on a link inside |
| [`SwipeableDrawer.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/SwipeableDrawer.triggerId.md) | a swipeable drawer | same as [`Drawer.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Drawer.triggerId.md), and swiping |
| [`Menu.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Menu.triggerId.md) | a menu, next to the trigger | click outside, Escape, a click on an item |
| [`Popover.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Popover.triggerId.md) | a popover, next to the trigger | click outside, Escape |

## How it works

Give any element an `id`, and pass the same id as the `triggerId` of the
overlay. A click on the element opens the overlay:

``` r

muiMaterialPage(
  CssBaseline(),
  Button(id = "open-dialog", variant = "outlined", "Open dialog"),
  Dialog.triggerId(
    triggerId = "open-dialog",
    DialogTitle("Hello"),
    DialogContent(DialogContentText("Open/close is managed entirely in the browser."))
  )
)
```

- The trigger can be **any element with an `id`**: a muiMaterial
  component, an HTML tag, or a Shiny widget such as
  [`shiny::actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html).
- The overlay can be anywhere on the page. It does not need to be next
  to its trigger.
- The binding survives re-renders: a trigger rendered later with
  [`renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html)/[`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html)
  (or replaced by it) keeps working.
- Several triggers cannot share one id, but several overlays can each
  have their own trigger.

## The six wrappers

``` r

muiMaterialPage(
  useMaterialIconsFilled = TRUE,
  CssBaseline(),
  Stack(
    direction = "row",
    spacing = 1,
    sx = list(flexWrap = "wrap"),
    Button(id = "t-dialog", variant = "outlined", "Dialog"),
    Button(id = "t-modal", variant = "outlined", "Modal"),
    Button(id = "t-drawer", variant = "outlined", "Drawer"),
    Button(id = "t-swipeable", variant = "outlined", "Swipeable drawer"),
    Button(id = "t-menu", variant = "outlined", "Menu"),
    Button(id = "t-popover", variant = "outlined", "Popover")
  ),
  Dialog.triggerId("t-dialog", DialogTitle("Dialog"), DialogContent("Press Escape to close.")),
  Modal.triggerId(
    "t-modal",
    Box(
      sx = list(position = "absolute", top = "50%", left = "50%", transform = "translate(-50%, -50%)",
                width = 300, bgcolor = "background.paper", boxShadow = 24, p = 4),
      Typography("Modal content")
    )
  ),
  Drawer.triggerId("t-drawer", anchor = "left", width = 250, Box(sx = list(p = 2), Typography("Drawer content"))),
  SwipeableDrawer.triggerId("t-swipeable", anchor = "bottom", width = "auto", Box(sx = list(p = 2), Typography("Swipe down to close"))),
  Menu.triggerId("t-menu", MenuItem("Profile"), MenuItem("My account"), MenuItem("Logout")),
  Popover.triggerId(
    "t-popover",
    anchorOrigin = list(vertical = "bottom", horizontal = "left"),
    Typography(sx = list(p = 2), "Popover content")
  )
)
```

## Options

All the other arguments are passed to the MUI component as props, so the
options of the MUI documentation apply: `anchor`, `maxWidth`,
`anchorOrigin`, `slotProps`, `sx`, … A few arguments are specific to the
wrappers:

- [`Drawer.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Drawer.triggerId.md)
  and
  [`SwipeableDrawer.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/SwipeableDrawer.triggerId.md):
  - `width` sizes the drawer paper (280 by default). Use
    `width = "auto"` for top and bottom drawers.
  - `closeOnLinkClick = FALSE` keeps the drawer open when a link (`<a>`)
    inside it is clicked. By default, the drawer closes, which suits
    navigation drawers.
  - `sx` styles the drawer **root**, like on any other component. Style
    the paper with `slotProps = list(paper = list(sx = ...))`.
- [`Menu.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Menu.triggerId.md):
  `closeOnItemClick = FALSE` keeps the menu open after a click, for
  example for a menu of checkboxes.

``` r

muiMaterialPage(
  CssBaseline(),
  Button(id = "filters-menu", variant = "outlined", "Filters"),
  Menu.triggerId(
    triggerId = "filters-menu",
    closeOnItemClick = FALSE,
    lapply(c("Open", "In progress", "Closed"), function(status) {
      MenuItem(FormControlLabel(control = Checkbox(defaultChecked = TRUE), label = status))
    })
  )
)
```

## Callbacks

The open state belongs to the wrapper: passing `open` (or `anchorEl`)
has no effect. Callbacks you pass are **composed** with the wrapper’s
own handlers: the wrapper updates its state first, then calls yours. For
example, send the closing of a dialog to the server with
[`triggerEvent()`](https://appsilon.github.io/shiny.react/reference/triggerEvent.html):

``` r

Dialog.triggerId(
  triggerId = "open-dialog",
  onClose = triggerEvent("dialog_closed"),
  DialogTitle("Hello")
)
```

The same applies to `onClick` and `onClose` of
[`Menu.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Menu.triggerId.md),
and to `onOpen`/`onClose` of
[`SwipeableDrawer.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/SwipeableDrawer.triggerId.md).

## Limitations

- A `.triggerId()` overlay closes on its built-in events only (see the
  tables above). A button inside a dialog does not close it. For dialogs
  with “Cancel”/“Confirm” buttons, keep the open state in the URL with
  [reactRouter](https://felixluginbuhl.com/muiMaterial/articles/dialog.md)
  or on the server with
  [`Dialog.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Dialog.md).
- The server cannot open or close a `.triggerId()` overlay. Use the
  `.shinyInput()` variant when the server must decide.

## In a Shiny app

The trigger can be a Shiny widget, and it can be rendered by the server:

``` r

library(shiny)
library(muiMaterial)

ui <- muiMaterialPage(
  CssBaseline(),
  Box(sx = list(p = 2), uiOutput("toolbar")),
  Drawer.triggerId(
    triggerId = "open-settings",
    anchor = "right",
    Box(sx = list(p = 2), Typography(variant = "h6", "Settings"), Switch.shinyInput("compact", value = FALSE))
  )
)

server <- function(input, output, session) {
  # The trigger is rendered (and re-rendered) by the server
  output$toolbar <- renderUI({
    IconButton(id = "open-settings", `aria-label` = "settings", shiny::icon("gear"))
  })
}

shinyApp(ui, server)
```

Run complete examples with `muiMaterialExample("DrawerTriggerId")` and
`muiMaterialExample("Menu")`.
