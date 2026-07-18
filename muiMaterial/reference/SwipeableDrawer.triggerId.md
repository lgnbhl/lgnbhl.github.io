# SwipeableDrawer.triggerId

Custom SwipeableDrawer bound to a DOM element by id. See
'js/src/MuiSwipeableDrawerTriggerId.jsx'.

## Usage

``` r
SwipeableDrawer.triggerId(triggerId, ...)
```

## Arguments

- triggerId:

  HTML id of an existing DOM element that acts as the trigger (button,
  link, etc.) to open the Drawer.

- ...:

  Named arguments forwarded as React props, plus children to render
  inside the component. Pass `closeOnLinkClick = FALSE` to keep the
  Drawer open when any link inside it is clicked. The default (`TRUE`)
  closes the Drawer on any `<a>` click, including external links with
  `target = "_blank"`.

  `sx` styles the SwipeableDrawer root, as on any other component. Size
  the drawer paper with `width` (280 by default) or style it via
  `slotProps = list(paper = list(sx = list(...)))`. The `open` prop is
  owned by the wrapper; caller-supplied `onClose`/`onOpen` are called
  after the wrapper updates its own state.

## Value

Object with \`shiny.tag\` class suitable for use in the UI of a Shiny
app.
