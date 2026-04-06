# ChartsLegend

<https://mui.com/x/api/charts/charts-legend/>

## Usage

``` r
ChartsLegend(...)
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

- direction `'horizontal', 'vertical'`\
  Default is - The direction of the legend layout. The default depends
  on the chart.

- onItemClick `func`\
  Default is - Callback fired when a legend item is
  clicked.Signature:function(event: React.MouseEvent\<HTMLButtonElement,
  MouseEvent\>, legendItem: SeriesLegendItemContext, index: number) =\>
  voidevent The click event.legendItem The legend item data.index The
  index of the clicked legend item.

- slotProps `object`\
  Default is The props used for each component slot.

- slots `object`\
  Default is Overridable component slots.See Slots API below for more
  details.
