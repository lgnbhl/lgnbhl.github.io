# Menu.triggerId

Custom Menu bound to a DOM element by id. See
'js/src/MuiMenuTriggerId.jsx'.

## Usage

``` r
Menu.triggerId(triggerId, ...)
```

## Arguments

- triggerId:

  HTML id of an existing DOM element that acts as the trigger (button,
  link, etc.) to open the Menu.

- ...:

  args to pass to element

## Value

Object with \`shiny.tag\` class suitable for use in the UI of a Shiny
app.

## Details

Pass \`closeOnItemClick = FALSE\` to disable auto-close on click (useful
when the menu contains interactive children like checkboxes).
