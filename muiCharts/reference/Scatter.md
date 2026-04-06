# Scatter

<https://mui.com/x/api/charts/scatter/>

## Usage

``` r
Scatter(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- colorGetter `func`\
  Default is NA Function to get the color of a scatter item given its
  data index. The data index argument is optional. If not provided, the
  color for the entire series is returned. If provided, the color for
  the specific scatter item is returned.

- onItemClick `func`\
  Default is NA Callback fired when clicking on a scatter
  item.Signature:function(event: MouseEvent, scatterItemIdentifier:
  ScatterItemIdentifier) =\> voidevent Mouse event recorded on the
  ![](data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=)
  element.scatterItemIdentifier The scatter item identifier.
