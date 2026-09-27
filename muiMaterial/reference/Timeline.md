# Timeline

<https://mui.com/material-ui/api/timeline/>

## Usage

``` r
Timeline(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- children `node`  
  Default is - The content of the component.

- classes `object`  
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- className `string`  
  Default is - className applied to the root element.

- position `'alternate-reverse'| 'alternate'| 'left'| 'right'`  
  Default is 'right' The position where the TimelineContent should
  appear relative to the time axis.

- sx `Array func| object| bool | func| object`  
  Default is - The system prop that allows defining system overrides as
  well as additional CSS styles.See the `sx` page for more details.

## Note

`Timeline` and its sub-components (`TimelineItem`, `TimelineDot`, etc.)
are part of [`@mui/lab`](https://mui.com/material-ui/about-the-lab/),
which is published on the MUI beta channel. Lab APIs may change in
future minor releases.

## Examples

``` r
Timeline(
  TimelineItem(TimelineSeparator(TimelineDot(), TimelineConnector()), TimelineContent("Eat")),
  TimelineItem(TimelineSeparator(TimelineDot()), TimelineContent("Sleep"))
)
#> <div class="react-container" data-react-id="rtebwxkgyyolybkwdyqr">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/lab","name":"Timeline","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/lab","name":"TimelineItem","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/lab","name":"TimelineSeparator","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/lab","name":"TimelineDot","props":{"type":"raw","value":[]}},{"type":"element","module":"@mui/lab","name":"TimelineConnector","props":{"type":"raw","value":[]}}]}}}},{"type":"element","module":"@mui/lab","name":"TimelineContent","props":{"type":"raw","value":{"children":"Eat"}}}]}}}},{"type":"element","module":"@mui/lab","name":"TimelineItem","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/lab","name":"TimelineSeparator","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/lab","name":"TimelineDot","props":{"type":"raw","value":[]}}}}},{"type":"element","module":"@mui/lab","name":"TimelineContent","props":{"type":"raw","value":{"children":"Sleep"}}}]}}}}]}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('rtebwxkgyyolybkwdyqr')</script>
#> </div>
```
