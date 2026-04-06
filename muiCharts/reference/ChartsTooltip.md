# ChartsTooltip

<https://mui.com/x/api/charts/charts-tooltip/>

## Usage

``` r
ChartsTooltip(...)
```

## Arguments

- ...:

  Props to pass to the component.

## Value

Object with `shiny.tag` class suitable for use in the UI of a Shiny app.

## Details

- anchor `'node', 'pointer'`\
  Default is 'pointer' Determine if the tooltip should be placed on the
  pointer location or on the node.

- anchorEl `HTML element, object, func`\
  Default is - An HTML element, virtualElement, or a function that
  returns either. It's used to set the position of the popper. The
  return value will passed as the reference object of the Popper
  instance.

- classes `object`\
  Default is - Override or extend the styles applied to the
  component.See CSS classes API below for more details.

- component `elementType`\
  Default is - The component used for the root node. Either a string to
  use a HTML element or a component.

- components `Root?: elementType`\
  Default is The components used for each slot inside the Popper. Either
  a string to use a HTML element or a component.Deprecated－use the
  slots prop instead. This prop will be removed in a future major
  release. How to migrate.

- componentsProps `root?: func, object`\
  Default is The props used for each slot inside the
  Popper.Deprecated－use the slotProps prop instead. This prop will be
  removed in a future major release. How to migrate.

- container
  `(props, propName) => \item disablePortal `bool`\cr Default is FALSE The children will be under the DOM hierarchy of the parent component. \item keepMounted`bool`\cr Default is FALSE Always keep the children in the DOM. This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Popper. \item modifiers`Array\<
  data?: object, effect?: func, enabled?: bool, fn?: func, name?: any,
  options?: object, phase?: 'afterMain', 'afterRead', 'afterWrite',
  'beforeMain', 'beforeRead', 'beforeWrite', 'main', 'read', 'write',
  requires?: Array, requiresIfExists?: Array
  \>`\cr Default is - Popper.js is based on a "plugin-like" architecture, most of its features are fully encapsulated "modifiers".A modifier is a function that is called each time Popper.js needs to compute the position of the popper. For this reason, modifiers should be very performant to avoid bottlenecks. To learn how to create a modifier, read the modifiers documentation. \item open`bool`\cr Default is - If true, the component is shown. \item placement`'auto-end',
  'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom',
  'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right',
  'top-end', 'top-start',
  'top'`\cr Default is 'bottom' Popper placement. \item popperOptions`
  modifiers?: array, onFirstUpdate?: func, placement?: 'auto-end',
  'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom',
  'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right',
  'top-end', 'top-start', 'top', strategy?: 'absolute', 'fixed'
  `\cr Default is Options provided to the Popper.js instance. \item popperRef`func,
  current?: destroy: func, forceUpdate: func, setOptions: func, state:
  attributes: object, elements: object, modifiersData: object, options:
  object, orderedModifiers: Array, placement: 'auto-end', 'auto-start',
  'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end',
  'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end',
  'top-start', 'top', rects: object, reset: bool, scrollParents: object,
  strategy: 'absolute', 'fixed', styles: object , update: func
  `\cr Default is - A ref that points to the used popper instance. \item position`'bottom',
  'left', 'right',
  'top'`\cr Default is - Determines the tooltip position relatively to the anchor. \item slotProps`object`\cr Default is The props used for each slot inside the Popper. \item slots`object`\cr Default is The components used for each slot inside the Popper. Either a string to use a HTML element or a component.See Slots API below for more details. \item sx`Array\<func,
  object, bool\>, func,
  object`\cr Default is - The system prop that allows defining system overrides as well as additional CSS styles.See the`sx`page for more details. \item transition`bool`\cr Default is FALSE Help supporting a react-transition-group/Transition component. \item trigger`'axis',
  'item', 'none'\`\
  Default is 'axis' Select the kind of tooltip to display - 'item':
  Shows data about the item below the mouse; - 'axis': Shows values
  associated with the hovered x value; - 'none': Does not display
  tooltip.
