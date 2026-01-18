# Get the comments/footnotes of a BFS dataset in a given language

Get the comments/footnotes of a BFS dataset using PXWEB BFS API v1.

## Usage

``` r
bfs_get_data_comments(
  number_bfs,
  language = "de",
  query = NULL,
  clean_names = FALSE,
  delay = NULL
)
```

## Arguments

- number_bfs:

  The BFS number of a dataset.

- language:

  Language of the dataset to be translated if exists, i.e. "de", "fr",
  "it" or "en".

- query:

  a list with named values, a json query file or json query string using
  [`pxweb::pxweb_query()`](https://ropengov.github.io/pxweb/reference/pxweb_query.html).

- clean_names:

  Clean column names using
  [`janitor::clean_names()`](https://sfirke.github.io/janitor/reference/clean_names.html)

- delay:

  Integer Number of seconds to wait before query using
  [`Sys.sleep()`](https://rdrr.io/r/base/Sys.sleep.html).

## Value

A tbl_df (a type of data frame; see tibble or dplyr packages). Returns
NULL if no connection.

## See also

[`bfs_get_data`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)
