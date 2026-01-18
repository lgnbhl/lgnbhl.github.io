# Create choice structure for \[RichTreeView()\]

This function is adapted from \`shinyWidgets::create_tree()\`. A big
thank you to the authors of the shinyWidgets for creating the
\`create_tree()\` function.

## Usage

``` r
asMuiTree(data, levels = names(data), levels_id = NULL, ...)
```

## Arguments

- data:

  A \`data.frame\`.

- levels:

  Variables identifying hierarchical levels, values of those variables
  will be used as text displayed.

- levels_id:

  Variable to use as ID for nodes. Careful! Spaces are not allowed in
  IDs.

- ...:

  Addtional arguments.

## Value

a \`list\` that can be used in \[RichTreeView()\].

## See also

\`shinyWidgets::create_tree()\`
