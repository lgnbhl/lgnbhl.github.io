# Stack

This page is an adaptation of the related [MUI Material UI documentation
page](https://mui.com/material-ui/react-stack/).

``` r

library(muiMaterial)
```

## Stack

Stack is a container component for arranging elements vertically or
horizontally.

### Introduction

The Stack component manages the layout of its immediate children along
the vertical or horizontal axis, with optional spacing and dividers
between each child.

Stack is ideal for one-dimensional layouts, while Grid is preferable
when you need both vertical *and* horizontal arrangement.

### Basics

The Stack component acts as a generic container, wrapping around the
elements to be arranged.

Use the `spacing` prop to control the space between children. The
spacing value can be any number, including decimals, or a string. (The
prop is converted into a CSS property using the
[`theme.spacing()`](https://mui.com/material-ui/customization/spacing/)
helper.)

The demos use this `Item()` helper, the R version of the `styled(Paper)`
of the original demos:

``` r

Item <- function(..., sx = list()) {
  Paper(
    sx = modifyList(
      list(backgroundColor = "#fff", typography = "body2", p = 1, textAlign = "center", color = "text.secondary"),
      sx
    ),
    ...
  )
}

muiMaterialPage(
  CssBaseline(),
  Box(sx = list(width = "100%"), Stack(spacing = 2, Item("Item 1"), Item("Item 2"), Item("Item 3")))
)
```

JS code

``` jsx
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function BasicStack() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </Box>
  );
}
```

#### Stack vs. Grid

`Stack` is concerned with one-dimensional layouts, while
[Grid](https://felixluginbuhl.com/muiMaterial/articles/grid.md) handles
two-dimensional layouts. The default direction is `column` which stacks
children vertically.

### Direction

By default, Stack arranges items vertically in a column. Use the
`direction` prop to position items horizontally in a row:

``` r

muiMaterialPage(
  CssBaseline(),
  Stack(direction = "row", spacing = 2, Item("Item 1"), Item("Item 2"), Item("Item 3"))
)
```

JS code

``` jsx
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function DirectionStack() {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </div>
  );
}
```

### Dividers

Use the `divider` prop to insert an element between each child. This
works particularly well with the
[Divider](https://felixluginbuhl.com/muiMaterial/articles/divider.md)
component, as shown below:

``` r

muiMaterialPage(
  CssBaseline(),
  Stack(
    direction = "row",
    divider = Divider(orientation = "vertical", flexItem = TRUE),
    spacing = 2,
    Item("Item 1"), Item("Item 2"), Item("Item 3")
  )
)
```

JS code

``` jsx
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function DividerStack() {
  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </div>
  );
}
```

### Responsive values

You can switch the `direction` or `spacing` values based on the active
breakpoint.

``` r

muiMaterialPage(
  CssBaseline(),
  Stack(
    direction = list(xs = "column", sm = "row"),
    spacing = list(xs = 1, sm = 2, md = 4),
    Item("Item 1"), Item("Item 2"), Item("Item 3")
  )
)
```

JS code

``` jsx
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ResponsiveStack() {
  return (
    <div>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </div>
  );
}
```

### Flexbox gap

To use [flexbox
`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap)
for the spacing implementation, set the `useFlexGap` prop to true.

It removes the [known limitations](#limitations) of the default
implementation that uses CSS nested selector. However, CSS flexbox gap
is not fully supported in some browsers.

We recommend checking the [support
percentage](https://caniuse.com/?search=flex%20gap) before using it.

``` r

muiMaterialPage(
  CssBaseline(),
  Box(
    sx = list(width = 200),
    Stack(
      spacing = list(xs = 1, sm = 2),
      direction = "row",
      useFlexGap = TRUE,
      sx = list(flexWrap = "wrap"),
      Item(sx = list(flexGrow = 1), "Item 1"),
      Item(sx = list(flexGrow = 1), "Item 2"),
      Item(sx = list(flexGrow = 1), "Long content")
    )
  )
)
```

JS code

``` jsx
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  flexGrow: 1,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function FlexboxGapStack() {
  return (
    <Box sx={{ width: 200 }}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: 'wrap' }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Long content</Item>
      </Stack>
    </Box>
  );
}
```

To set the prop to all stack instances, create a theme with default
props (see
[Theming](https://felixluginbuhl.com/muiMaterial/articles/theming.md)):

``` r

ThemeProvider(
  theme = list(components = list(MuiStack = list(defaultProps = list(useFlexGap = TRUE)))),
  Stack("uses flexbox gap by default")
)
```

### Interactive demo

The MUI documentation has an interactive demo to explore the
`direction`, `justifyContent`, `alignItems` and `spacing` settings. They
are set like this:

``` r

muiMaterialPage(
  CssBaseline(),
  Stack(
    direction = "row",
    spacing = 2,
    sx = list(justifyContent = "space-between", alignItems = "flex-end", height = 120, bgcolor = "grey.100", p = 1),
    lapply(1:3, function(value) Item(sx = list(py = paste0(value * 10, "px")), paste("Item", value)))
  )
)
```

### Customization

Use the [`sx`
prop](https://felixluginbuhl.com/muiMaterial/articles/box.html#the-sx-prop-in-r)
to quickly customize any Stack instance using a superset of CSS that has
access to all the style functions and theme-aware properties exposed in
the MUI System package. Below is an example of how to apply center align
items using this prop:

``` r

Stack(sx = list(alignItems = "center"))
```

### Limitations

#### Margin on the children

Customizing the margin on the children is not supported by default.

For instance, the top-margin on the `Button` component below will be
ignored.

``` r

Stack(Button(sx = list(marginTop = "30px"), "..."))
```

To overcome this limitation, set [`useFlexGap`](#flexbox-gap) prop to
`TRUE` to switch to CSS flexbox gap implementation.

You can learn more about this limitation by visiting this
[RFC](https://github.com/mui/material-ui/issues/33754).

#### white-space: nowrap

The initial setting on flex items is `min-width: auto`. This causes a
positioning conflict when children use `white-space: nowrap;`. You can
reproduce the issue with:

``` r

Stack(direction = "row", Typography(noWrap = TRUE, "..."))
```

In order for the item to stay within the container you need to set
`min-width: 0`.

``` r

Stack(direction = "row", sx = list(minWidth = 0), Typography(noWrap = TRUE, "..."))
```

``` r

message <- "Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support."

muiMaterialPage(
  CssBaseline(),
  Box(
    sx = list(flexGrow = 1, overflow = "hidden", px = 3),
    Item(
      sx = list(my = 1, mx = "auto", p = 2, maxWidth = 400),
      Stack(spacing = 2, direction = "row", sx = list(alignItems = "center"), Avatar("W"), Typography(noWrap = TRUE, message))
    ),
    Item(
      sx = list(my = 1, mx = "auto", p = 2, maxWidth = 400),
      Stack(
        spacing = 2,
        direction = "row",
        sx = list(alignItems = "center"),
        Stack(Avatar("W")),
        Stack(sx = list(minWidth = 0), Typography(noWrap = TRUE, message))
      )
    )
  )
)
```

JS code

``` jsx
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  maxWidth: 400,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;

export default function ZeroWidthStack() {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
          <Avatar>W</Avatar>
          <Typography noWrap>{message}</Typography>
        </Stack>
      </Item>
      <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
          <Stack>
            <Avatar>W</Avatar>
          </Stack>
          <Stack sx={{ minWidth: 0 }}>
            <Typography noWrap>{message}</Typography>
          </Stack>
        </Stack>
      </Item>
    </Box>
  );
}
```

### Anatomy

The Stack component is composed of a single root `<div>` element:

``` html
<div class="MuiStack-root">
  <!-- Stack contents -->
</div>
```
