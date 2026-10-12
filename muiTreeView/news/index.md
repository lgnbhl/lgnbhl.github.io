# Changelog

## muiTreeView 0.2.0

- Upgrade to MUI X Tree View v9 (`@mui/x-tree-view` 9.0.2), matching the
  MUI v9 runtime shipped by muiMaterial.
- The tree view now shares muiMaterial’s MUI Material, system and
  emotion runtime instead of bundling its own copy, so
  [`muiMaterial::ThemeProvider()`](https://felixluginbuhl.com/muiMaterial/reference/ThemeProvider.html)
  and theme-aware `sx` values now apply to tree view components.
- [`muiTreeViewDependency()`](https://felixluginbuhl.com/muiTreeView/reference/muiTreeViewDependency.md)
  now also attaches
  [`muiMaterial::muiMaterialDependency()`](https://felixluginbuhl.com/muiMaterial/reference/muiMaterialDependency.html),
  so tree views render on pages without other muiMaterial components.
- Require muiMaterial \>= 0.2.1 and warn at attach time if an older
  version is installed.
- Wrap the remaining free-tier components:
  [`RichTreeViewRoot()`](https://felixluginbuhl.com/muiTreeView/reference/RichTreeViewRoot.md),
  [`SimpleTreeViewRoot()`](https://felixluginbuhl.com/muiTreeView/reference/SimpleTreeViewRoot.md),
  [`TreeItemCheckbox()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItemCheckbox.md),
  [`TreeItemContent()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItemContent.md),
  [`TreeItemGroupTransition()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItemGroupTransition.md),
  [`TreeItemIconContainer()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItemIconContainer.md),
  [`TreeItemLabel()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItemLabel.md),
  [`TreeItemLabelInput()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItemLabelInput.md),
  [`TreeItemProvider()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItemProvider.md),
  [`TreeItemRoot()`](https://felixluginbuhl.com/muiTreeView/reference/TreeItemRoot.md),
  [`TreeViewCollapseIcon()`](https://felixluginbuhl.com/muiTreeView/reference/TreeViewCollapseIcon.md)
  and
  [`TreeViewExpandIcon()`](https://felixluginbuhl.com/muiTreeView/reference/TreeViewExpandIcon.md).
- Add a test that every wrapped component exists in the bundled
  JavaScript.
- Add runnable usage examples for every exported function in
  `inst/examples/`,
  e.g. `source(system.file("examples/RichTreeView.R", package = "muiTreeView"))`.
- Reorganize the documentation to mirror the official MUI X Tree View
  docs, with links to the original pages: one article per Simple and
  Rich Tree View topic (items, selection, expansion, customization,
  label editing), Tree Item customization, accessibility, data frames
  with
  [`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md),
  Shiny, navigation with reactRouter and theming. The “introduction”
  article is replaced by “Overview”.

## muiTreeView 0.1.1

CRAN release: 2026-01-26

- rename function `createTree()` as
  [`asMuiTree()`](https://felixluginbuhl.com/muiTreeView/reference/asMuiTree.md).

## muiTreeView 0.1.0

- initial commit
