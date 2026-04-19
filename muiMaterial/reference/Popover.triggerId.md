# Popover.triggerId

Custom Popover bound to a DOM element by id. See
'js/src/MuiPopoverTriggerId.jsx'. The trigger element acts as the
anchor; the Popover opens on click and closes on clickaway.

## Usage

``` r
Popover.triggerId(triggerId, ...)
```

## Arguments

- triggerId:

  HTML id of an existing DOM element that acts as the anchor/trigger for
  the Popover.

- ...:

  args to pass to element

## Value

Object with \`shiny.tag\` class suitable for use in the UI of a Shiny
app.
