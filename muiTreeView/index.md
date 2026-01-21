# muiTreeView

**muiTreeView** gives access to [MUI X Tree
View](https://mui.com/x/react-tree-view/) React components, which lets
users navigate hierarchical lists of data with nested levels that can be
expanded and collapsed.

## Install

You can install the development version of muiTreeView like so:

``` r
remotes::install_github("lgnbhl/muiTreeView")
```

**Read the full documentation with examples
[here](https://felixluginbuhl.com/muiTreeView/).**

## Basic example

``` r
library(muiTreeView)

df <- data.frame(
  pkg = c("muiTreeView", "muiTreeView", "muiTreeView"),
  functions = c("SimpleTreeView", "RichTreeView", "RichTreeView"),
  args = c("items", "items", "onItemSelectionToggle")
)

treeItems <- muiTreeView::asMuiTree(df)

RichTreeView(
  items = treeItems,
  checkboxSelection = TRUE,
  multiSelect = TRUE # FALSE for single select
)
```

![RichTreeView](https://raw.githubusercontent.com/lgnbhl/muiTreeView/refs/heads/main/man/figures/checkboxMultiSelect.png)

## Full documentation

**All the docs with examples are
[here](https://felixluginbuhl.com/muiTreeView/).**

## Contribute

If you have any issue, question or want to contribute with a pull
request, don’t hesitate to write me on
<https://github.com/lgnbhl/muiTreeView>.

For updates follow [Felix
Luginbuhl](https://linkedin.com/in/FelixLuginbuhl) on LinkedIn.
