# Examples gallery

muiMaterial ships complete Shiny apps. List them with
[`muiMaterialExample()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialExample.md),
and run one by name:

``` r

library(muiMaterial)

muiMaterialExample()           # the names of all the examples
muiMaterialExample("showcase") # run one of them
```

To read or copy the code of an example, open its file:

``` r

file.edit(system.file("examples", "Dialog.R", package = "muiMaterial"))
```

## Apps and dashboards

| Example | What it shows |
|----|----|
| `showcase` | All the `.shinyInput()` components and their values, in one app ([live version](https://lgnbhl-muimaterial-showcase.share.connect.posit.cloud/)). |
| `dashboard-simple` | A simple dashboard: app bar, drawer and content. See [Basic dashboarding](https://felixluginbuhl.com/muiMaterial/articles/dashboard-basic.md). |
| `dashboard-inset` | A dashboard with an inset drawer. |
| `dashboard-icons` | A dashboard with a drawer of icons. |
| `mui-template-dashboard` | A port of the MUI dashboard template, with Shiny modules. |
| `bookmarking` | Restoring `.shinyInput()` values from a bookmarked URL. See [Shiny inputs and server updates](https://felixluginbuhl.com/muiMaterial/articles/shiny-inputs.html#bookmarking). |
| `muiMaterialPage` | [`muiMaterialPage()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialPage.md) with the Roboto font and the Material icons. |

## Inputs

| Example | What it shows | Article |
|----|----|----|
| `Autocomplete` | [`Autocomplete.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Autocomplete.md) | [Autocomplete](https://felixluginbuhl.com/muiMaterial/articles/autocomplete.md) |
| `Button` | [`Button.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Button.md) click counter | [Button](https://felixluginbuhl.com/muiMaterial/articles/button.md) |
| `ButtonGroup` | Buttons grouped in a [`ButtonGroup()`](https://felixluginbuhl.com/muiMaterial/reference/ButtonGroup.md) | [Button Group](https://felixluginbuhl.com/muiMaterial/articles/button-group.md) |
| `Checkbox` | [`Checkbox.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Checkbox.md) | [Checkbox](https://felixluginbuhl.com/muiMaterial/articles/checkbox.md) |
| `Fab` | [`Fab.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Fab.md) | [Floating Action Button](https://felixluginbuhl.com/muiMaterial/articles/floating-action-button.md) |
| `FilledInput` | [`FilledInput.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/FilledInput.md) | [Text Field](https://felixluginbuhl.com/muiMaterial/articles/textfield.md) |
| `LoadingButton` | A button with a loading state | [Button](https://felixluginbuhl.com/muiMaterial/articles/button.html#loading) |
| `NativeSelect` | [`NativeSelect.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/NativeSelect.md) | [Select](https://felixluginbuhl.com/muiMaterial/articles/select.html#native-select) |
| `RadioGroup` | [`RadioGroup.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/RadioGroup.md) | [Radio Group](https://felixluginbuhl.com/muiMaterial/articles/radio.md) |
| `Rating` | [`Rating.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Rating.md) | [Rating](https://felixluginbuhl.com/muiMaterial/articles/rating.md) |
| `Slider` | [`Slider.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Slider.md) with custom marks | [Slider](https://felixluginbuhl.com/muiMaterial/articles/slider.md) |
| `Switch` | [`Switch.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Switch.md) | [Switch](https://felixluginbuhl.com/muiMaterial/articles/switch.md) |
| `TextField` | [`TextField.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/TextField.md) | [Text Field](https://felixluginbuhl.com/muiMaterial/articles/textfield.md) |
| `ToggleButtonGroup` | [`ToggleButtonGroup.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/ToggleButtonGroup.md) | [Toggle Button Group](https://felixluginbuhl.com/muiMaterial/articles/toggle-button-group.md) |
| `TransferList` | A transfer list with server-side state | [Transfer List](https://felixluginbuhl.com/muiMaterial/articles/transfer-list.md) |

## Navigation and overlays

| Example | What it shows | Article |
|----|----|----|
| `BottomNavigation` | [`BottomNavigation.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/BottomNavigation.md) switching pages | [Bottom Navigation](https://felixluginbuhl.com/muiMaterial/articles/bottom-navigation.md) |
| `Dialog` | [`Dialog.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Dialog.md) opened and closed by the server | [Dialog](https://felixluginbuhl.com/muiMaterial/articles/dialog.md) |
| `Drawer` | [`Drawer.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Drawer.md) opened and closed by the server | [Drawer](https://felixluginbuhl.com/muiMaterial/articles/drawer.md) |
| `DrawerTriggerId` | [`Drawer.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Drawer.triggerId.md): a navigation drawer without server code | [Overlays with `.triggerId`](https://felixluginbuhl.com/muiMaterial/articles/triggerid.md) |
| `Menu` | [`Menu.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Menu.triggerId.md): an options menu | [Menu](https://felixluginbuhl.com/muiMaterial/articles/menu.md) |
| `MenuItem` | [`MenuItem.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/MenuItem.md) | [Menu](https://felixluginbuhl.com/muiMaterial/articles/menu.html#menus-in-shiny-apps) |
| `Modal` | [`Modal.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Modal.md) | [Modal](https://felixluginbuhl.com/muiMaterial/articles/modal.md) |
| `Pagination` | [`Pagination.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Pagination.md) | [Pagination](https://felixluginbuhl.com/muiMaterial/articles/pagination.md) |
| `Snackbar` | [`Snackbar.shinyInput()`](https://felixluginbuhl.com/muiMaterial/reference/Snackbar.md) opened by the server | [Snackbar](https://felixluginbuhl.com/muiMaterial/articles/snackbar.md) |
| `Stepper` | A stepper driven by the server | [Stepper](https://felixluginbuhl.com/muiMaterial/articles/stepper.md) |
| `Tabs` | Client-side tabs with [`TabContext.static()`](https://felixluginbuhl.com/muiMaterial/reference/TabContext.md) | [Tabs](https://felixluginbuhl.com/muiMaterial/articles/tabs.md) |

## Layout, display and customization

| Example | What it shows | Article |
|----|----|----|
| `Card` | A media card | [Card](https://felixluginbuhl.com/muiMaterial/articles/card.md) |
| `Grid` | A responsive grid | [Grid](https://felixluginbuhl.com/muiMaterial/articles/grid.md) |
| `Timeline` | A customized timeline | [Timeline](https://felixluginbuhl.com/muiMaterial/articles/timeline.md) |
| `ThemeProvider` | A custom theme: palette, typography and component overrides | [Theming](https://felixluginbuhl.com/muiMaterial/articles/theming.md) |
| `CustomComponentShinyInput` | A custom Shiny input built with `InputAdapter` | [Custom components](https://felixluginbuhl.com/muiMaterial/articles/custom-components.md) |
| `CustomComponentShinyInputStyled` | A custom `styled()` slider input | [Custom components](https://felixluginbuhl.com/muiMaterial/articles/custom-components.md) |
