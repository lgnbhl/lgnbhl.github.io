# Get metadata of a BFS data in a given language

Get the metadata of a BFS dataset using the PXWEB API v1. You should
choose either the bfs number of the bfs offical url of a given dataset.

## Usage

``` r
bfs_get_metadata(number_bfs, language = "de")
```

## Arguments

- number_bfs:

  The BFS number of a dataset.

- language:

  Language of the dataset to be translated if exists.

## Value

A tbl_df (a type of data frame; see tibble or dplyr packages). Returns
NULL if no connection.
