# Textarea Autosize

This page is an adaptation of the related [MUI Material UI documentation
page](https://mui.com/material-ui/react-textarea-autosize/).

``` r

library(muiMaterial)
library(shiny)
```

## Textarea Autosize

The Textarea Autosize component automatically adjusts its height to
match the length of the content within.

### Introduction

Textarea Autosize is a utility component that replaces the native
`<textarea>` HTML. Its height automatically adjusts as a response to
keyboard inputs and window resizing events.

By default, an empty Textarea Autosize component renders as a single
row, as shown in the following demo:

``` r

muiMaterialPage(
  CssBaseline(),
  TextareaAutosize(`aria-label` = "empty textarea", placeholder = "Empty", style = list(width = 200))
)
```

JS code

``` jsx
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function EmptyTextarea() {
  return (
    <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Empty"
      style={{ width: 200 }}
    />
  );
}
```

### Basics

#### Minimum height

Use the `minRows` prop to define the minimum height of the component:

``` r

muiMaterialPage(
  CssBaseline(),
  TextareaAutosize(`aria-label` = "minimum height", minRows = 3, placeholder = "Minimum 3 rows", style = list(width = 200))
)
```

JS code

``` jsx
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MinHeightTextarea() {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 3 rows"
      style={{ width: 200 }}
    />
  );
}
```

#### Maximum height

Use the `maxRows` prop to define the maximum height of the component:

``` r

muiMaterialPage(
  CssBaseline(),
  TextareaAutosize(
    maxRows = 4,
    `aria-label` = "maximum height",
    placeholder = "Maximum 4 rows",
    defaultValue = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua.",
    style = list(width = 200)
  )
)
```

JS code

``` jsx
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MaxHeightTextarea() {
  return (
    <TextareaAutosize
      maxRows={4}
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua."
      style={{ width: 200 }}
    />
  );
}
```

### Textarea in Shiny apps

There is no `TextareaAutosize.shinyInput()`. For a multiline input that
reports its value to the server, use
`TextField.shinyInput(multiline = TRUE)`, which uses `TextareaAutosize`
internally (see [Text
Field](https://felixluginbuhl.com/muiMaterial/articles/textfield.html#multiline)):

``` r

library(shiny)
library(muiMaterial)

ui <- muiMaterialPage(
  CssBaseline(),
  Box(
    sx = list(p = 2, width = 400),
    TextField.shinyInput("notes", label = "Notes", multiline = TRUE, minRows = 3, maxRows = 6, value = "", fullWidth = TRUE),
    verbatimTextOutput("value")
  )
)

server <- function(input, output, session) {
  output$value <- renderText(input$notes)
}

shinyApp(ui, server)
```
