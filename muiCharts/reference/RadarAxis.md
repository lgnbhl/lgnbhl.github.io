# RadarAxis

<https://mui.com/x/api/charts/radar-axis/>

## Usage

``` r
RadarAxis(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- angle `number`\
  Default is - The absolute rotation angle of the metrics (in degree) If
  not defined the metric angle will be used.

- classes `object`\
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- divisions `number`\
  Default is 1 The number of divisions with label.

- dominantBaseline
  `'alphabetic', 'auto', 'central', 'hanging', 'ideographic', 'inherit', 'mathematical', 'middle', 'no-change', 'reset-size', 'text-after-edge', 'text-before-edge', 'use-script', func`\
  Default is - The labels dominant baseline or a function returning the
  dominant baseline for a given axis angle (in degree).

- labelOrientation `'horizontal', 'rotated'`\
  Default is 'horizontal' Defines how label align with the axis. -
  'horizontal': labels stay horizontal and their placement change with
  the axis angle. - 'rotated': labels are rotated 90deg relatively to
  their axis.

- metric `string`\
  Default is - The metric to get. If undefined, the hook returns null

- textAnchor `'end', 'inherit', 'middle', 'start', func`\
  Default is - The labels text anchor or a function returning the text
  anchor for a given axis angle (in degree).
