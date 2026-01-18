# Get BFS data in a given language

Get a dataset using the PXWEB API v1. You should choose either the BFS
number (FSO number) of the BFS offical url of a given dataset. You can
query particulary variables using the \`query\` argument.

## Usage

``` r
bfs_get_data(
  number_bfs,
  language = "de",
  query = NULL,
  column_name_type = "text",
  variable_value_type = "text",
  clean_names = FALSE,
  delay = NULL
)
```

## Arguments

- number_bfs:

  The BFS number (FSO number) of a dataset.

- language:

  Language of the dataset to be translated if exists, i.e. "de", "fr",
  "it" or "en".

- query:

  A list with named values, a json query file or json query string using
  [`pxweb::pxweb_query()`](https://ropengov.github.io/pxweb/reference/pxweb_query.html).

- column_name_type:

  Column name type as "text" or as "code".

- variable_value_type:

  Variable value type as "text" or as "code".

- clean_names:

  Clean column names using
  [`janitor::clean_names()`](https://sfirke.github.io/janitor/reference/clean_names.html).

- delay:

  Integer Number of seconds to wait before query using
  [`Sys.sleep()`](https://rdrr.io/r/base/Sys.sleep.html).

## Value

A tbl_df (a type of data frame; see tibble or dplyr packages). Returns
NULL if no connection.

## See also

[`bfs_get_data_comments`](https://felixluginbuhl.com/BFS/reference/bfs_get_data_comments.md)
