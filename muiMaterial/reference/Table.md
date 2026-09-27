# Table

<https://mui.com/material-ui/api/table/>

## Usage

``` r
Table(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- children `node`  
  Default is - The content of the table, normally TableHead and
  TableBody.

- classes `object`  
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- component `elementType`  
  Default is - The component used for the root node. Either a string to
  use a HTML element or a component.

- padding `'checkbox'| 'none'| 'normal'`  
  Default is 'normal' Allows TableCells to inherit padding of the Table.

- size `'medium'| 'small'| string`  
  Default is 'medium' Allows TableCells to inherit size of the Table.

- stickyHeader `bool`  
  Default is FALSE Set the header sticky.

- sx `Array func| object| bool | func| object`  
  Default is - The system prop that allows defining system overrides as
  well as additional CSS styles.See the `sx` page for more details.

## Examples

``` r
data <- head(mtcars[, 1:3])
TableContainer(
  Table(
    size = "small",
    TableHead(TableRow(
      TableCell("Car"),
      lapply(names(data), function(col) TableCell(align = "right", col))
    )),
    TableBody(lapply(seq_len(nrow(data)), function(i) {
      TableRow(
        TableCell(component = "th", scope = "row", rownames(data)[i]),
        lapply(names(data), function(col) TableCell(align = "right", data[[col]][i]))
      )
    }))
  )
)
#> <div class="react-container" data-react-id="rzjnomwsqxuvrneslhbj">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"TableContainer","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"Table","props":{"type":"object","value":{"size":{"type":"raw","value":"small"},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableHead","props":{"type":"object","value":{"children":{"type":"element","module":"@mui/material","name":"TableRow","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"children":"Car"}}},{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":"mpg"}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":"cyl"}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":"disp"}}}]}]}}}}}}},{"type":"element","module":"@mui/material","name":"TableBody","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableRow","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"component":"th","scope":"row","children":"Mazda RX4"}}},{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":21}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":6}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":160}}}]}]}}}},{"type":"element","module":"@mui/material","name":"TableRow","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"component":"th","scope":"row","children":"Mazda RX4 Wag"}}},{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":21}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":6}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":160}}}]}]}}}},{"type":"element","module":"@mui/material","name":"TableRow","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"component":"th","scope":"row","children":"Datsun 710"}}},{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":22.8}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":4}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":108}}}]}]}}}},{"type":"element","module":"@mui/material","name":"TableRow","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"component":"th","scope":"row","children":"Hornet 4 Drive"}}},{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":21.4}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":6}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":258}}}]}]}}}},{"type":"element","module":"@mui/material","name":"TableRow","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"component":"th","scope":"row","children":"Hornet Sportabout"}}},{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":18.7}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":8}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":360}}}]}]}}}},{"type":"element","module":"@mui/material","name":"TableRow","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"component":"th","scope":"row","children":"Valiant"}}},{"type":"array","value":[{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":18.1}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":6}}},{"type":"element","module":"@mui/material","name":"TableCell","props":{"type":"raw","value":{"align":"right","children":225}}}]}]}}}}]}}}}]}}}}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('rzjnomwsqxuvrneslhbj')</script>
#> </div>
```
