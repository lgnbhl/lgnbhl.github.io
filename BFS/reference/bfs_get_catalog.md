# Get the BFS data or table catalog

This function scraps a given RSS Feed of the Swiss Federal Statistical
Office.

## Usage

``` r
bfs_get_catalog(language = "de", type = "data")
```

## Arguments

- language:

  character The language of a BFS catalog.

- type:

  character A BFS catalog

## Value

A data frame. Returns NULL if no connection.

## See also

[`bfs_get_data`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)
