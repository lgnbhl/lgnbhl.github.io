# Changelog

## muiMaterial 0.1.3

CRAN release: 2026-03-15

- BREAKING CHANGE in
  [`muiMaterialPage()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialPage.md):
  - remove `materialSymbols` argument.
  - add new arguments to access Google Material Icons for use with
    [`Icon()`](https://felixluginbuhl.com/muiMaterial/reference/Icon.md).
  - rename `addFontRoboto` to `useFontRoboto`.
- add `triggerId` functions for managing React internal states:
  [`Drawer.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Drawer.triggerId.md),
  [`Menu.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/Menu.triggerId.md),
  [`SwipeableDrawer.triggerId()`](https://felixluginbuhl.com/muiMaterial/reference/SwipeableDrawer.triggerId.md).
- add `muiMaterial` S3 class to all components with a
  [`print()`](https://rdrr.io/r/base/print.html) method for browsable
  preview.
- fix Timeline components sourced from `@mui/lab`.
- fix Tab components (`TabContext`, `TabList`, `TabPanel`) sourced from
  `@mui/lab`.
- move `@mui/lab` component code from `lab.R` into `components.R` and
  `inputs.R`.
- update `mui-template-dashboard` example to use new R functions.
- add live Shiny app examples deployed on Posit Connect.
- refactor tests to use
  [`inherits()`](https://rdrr.io/r/base/class.html) instead of
  [`class()`](https://rdrr.io/r/base/class.html) for shiny.tag checks.
- Update [@mui](https://github.com/mui)/material and
  [@mui](https://github.com/mui)/lab dependencies to their latest
  version
- improve documentation

## muiMaterial 0.1.2

CRAN release: 2026-01-26

- improve examples
- [`muiMaterialPage()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialPage.md)
  gives access to Google icons (symbols) and Roboto font.
- export
  [`muiMaterialDependency()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialDependency.md)
- improve internal file structure for ThemeProvider and
  muiMaterialDependency.

## muiMaterial 0.1.0

- initial commit
