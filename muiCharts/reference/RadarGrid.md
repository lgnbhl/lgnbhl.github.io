# RadarGrid

<https://mui.com/x/api/charts/radar-grid/>

## Usage

``` r
RadarGrid(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- classes `object`\
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- divisions `number`\
  Default is 5 The number of divisions in the radar grid.

- shape `'circular', 'sharp'`\
  Default is 'sharp' The grid shape.

- stripeColor `func`\
  Default is (index) =\> index % 2 === 1 ? (theme.vars \|\|
  theme).palette.text.secondary : 'none' Get stripe fill color. Set it
  to null to remove stripesSignature:function(index: number) =\>
  stringindex The index of the stripe band.
