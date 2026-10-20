# Get the BFS data or tables catalog (deprecated)

Deprecated since BFS 0.5.6: use
[`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)
or
[`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)
instead.

## Usage

``` r
bfs_get_catalog(language = "de", type = "data")
```

## Arguments

- language:

  Language of the catalog: `"de"` (default), `"fr"`, `"it"` or `"en"`.

- type:

  `"data"` (default) or `"tables"`.

## Value

The result of
[`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)
or
[`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md).
