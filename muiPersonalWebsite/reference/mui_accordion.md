# The talks band

A tour-dates list rather than a grid of cards: a talk carries an event,
a location and a date, and a card shows almost none of it. Each row is
an uncontrolled Accordion, so React owns which row is open - the same
way the mobile drawer does, with no server and no script of our own.

## Usage

``` r
mui_accordion(talks)
```

## Arguments

- talks:

  Talk items: `title`, `event`, `date`, `location`, `abstract`,
  `description` and `links`.

## Value

A `muiMaterial` component.

## See also

Other home:
[`mui_card()`](https://felixluginbuhl.com/muiPersonalWebsite/reference/mui_card.md),
[`mui_hero()`](https://felixluginbuhl.com/muiPersonalWebsite/reference/mui_hero.md),
[`mui_hex_grid()`](https://felixluginbuhl.com/muiPersonalWebsite/reference/mui_hex_grid.md),
[`mui_hex_layout()`](https://felixluginbuhl.com/muiPersonalWebsite/reference/mui_hex_layout.md),
[`mui_home_page()`](https://felixluginbuhl.com/muiPersonalWebsite/reference/mui_home_page.md),
[`mui_list()`](https://felixluginbuhl.com/muiPersonalWebsite/reference/mui_list.md),
[`mui_prose()`](https://felixluginbuhl.com/muiPersonalWebsite/reference/mui_prose.md),
[`mui_showcase()`](https://felixluginbuhl.com/muiPersonalWebsite/reference/mui_showcase.md)

## Examples

``` r
mui_accordion(list(list(title = "A talk", event = "A meetup", date = "2025-03-01",
                        location = "Zurich", abstract = "What it was about.")))
#> <div class="react-container" data-react-id="jyfadwffbyguhwhzptvt">
#>   <script class="react-data" type="application/json">{"type":"element","module":"@mui/material","name":"Box","props":{"type":"object","value":{"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Accordion","props":{"type":"object","value":{"key":{"type":"raw","value":"A talk"},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"AccordionSummary","props":{"type":"object","value":{"expandIcon":{"type":"element","name":"svg","props":{"type":"object","value":{"viewBox":{"type":"raw","value":"0 0 24 24"},"width":{"type":"raw","value":20},"height":{"type":"raw","value":20},"fill":{"type":"raw","value":"none"},"stroke":{"type":"raw","value":"currentColor"},"stroke-width":{"type":"raw","value":"2"},"stroke-linecap":{"type":"raw","value":"round"},"stroke-linejoin":{"type":"raw","value":"round"},"aria-hidden":{"type":"raw","value":"true"},"children":{"type":"element","name":"path","props":{"type":"raw","value":{"d":"M6 9l6 6 6-6"}}}}}},"sx":{"type":"raw","value":{"& .MuiAccordionSummary-content":{"gap":2.5,"alignItems":"flex-start","margin":0,"marginRight":1}}},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"variant":"mono","sx":{"color":"kicker","pt":0.25,"flexShrink":0},"children":"2025"}}},{"type":"element","module":"@mui/material","name":"Box","props":{"type":"object","value":{"sx":{"type":"raw","value":{"minWidth":0,"flexGrow":1}},"children":{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"variant":"body1","sx":{"fontWeight":600},"children":"A meetup"}}},{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"variant":"body2","color":"text.secondary","sx":{"display":"-webkit-box","WebkitLineClamp":2,"WebkitBoxOrient":"vertical","overflow":"hidden","mt":0.25},"children":"A talk"}}}]}}}},{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"variant":"body2","color":"text.secondary","sx":{"flexShrink":0,"pt":0.25,"display":{"xs":"none","sm":"block"}},"children":"Zurich"}}}]}}}},{"type":"element","module":"@mui/material","name":"AccordionDetails","props":{"type":"object","value":{"sx":{"type":"raw","value":{"pl":{"xs":0,"sm":7},"pr":{"xs":0,"sm":7},"pt":1,"maxWidth":780}},"children":{"type":"array","value":[{"type":"raw","value":null},{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"variant":"body2","color":"text.secondary","sx":{"opacity":0.75,"mt":0.5,"mb":2.5},"children":"01 March 2025 · Zurich"}}},{"type":"array","value":[{"type":"element","module":"@mui/material","name":"Typography","props":{"type":"raw","value":{"key":1,"variant":"body1","sx":{"maxWidth":620,"mb":1.5},"children":"What it was about."}}}]},{"type":"raw","value":null}]}}}}]}}}}]}}}}</script>
#>   <script>jsmodule['@/shiny.react'].findAndRenderReactData('jyfadwffbyguhwhzptvt')</script>
#> </div>
```
