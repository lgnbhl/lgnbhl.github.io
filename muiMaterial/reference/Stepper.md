# Stepper

<https://mui.com/material-ui/api/stepper/>

## Usage

``` r
Stepper(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- activeStep `integer`  
  Default is 0 Set the active step (zero based index). Set to -1 to
  disable all the steps.

- alternativeLabel `bool`  
  Default is FALSE If set to 'true' and orientation is horizontal, then
  the step label will be positioned under the icon.

- children `node`  
  Default is - Two or more Step / components.

- classes `object`  
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- component `elementType`  
  Default is - The component used for the root node. Either a string to
  use a HTML element or a component.

- connector `element`  
  Default is StepConnector / An element to be placed between each step.

- nonLinear `bool`  
  Default is FALSE If set the Stepper will not assist in controlling
  steps for linear flow.

- orientation `'horizontal'| 'vertical'`  
  Default is 'horizontal' The component orientation (layout flow
  direction).

- sx `Array func| object| bool | func| object`  
  Default is - The system prop that allows defining system overrides as
  well as additional CSS styles.See the `sx` page for more details.

## Examples

``` r
Stepper(
  activeStep = 1,
  Step(StepLabel("Select settings")),
  Step(StepLabel("Create a group")),
  Step(StepLabel("Create an ad"))
)
#> <div class="react-container" data-react-id="xufqzttongqknhpszcef">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Stepper","props":{"type":"object","value":{"activeStep":{"type":"raw","value":1},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Step","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"StepLabel","props":{"type":"raw","value":{"children":"Select settings"}}}}}},{"type":"element","module":"@mui/material","name":"Step","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"StepLabel","props":{"type":"raw","value":{"children":"Create a group"}}}}}},{"type":"element","module":"@mui/material","name":"Step","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"StepLabel","props":{"type":"raw","value":{"children":"Create an ad"}}}}}}]}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('xufqzttongqknhpszcef')</script>
#> </div>
```
