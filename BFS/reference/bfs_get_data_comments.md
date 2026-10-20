# Get the comments of a BFS dataset

Get the comments (footnotes) of a dataset of the PXWeb API, e.g. on
provisional values or changes of definition.

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

  The BFS number of a dataset, e.g. `"px-x-1502040100_131"`.

- language:

  Language of the dataset: `"de"` (default), `"fr"`, `"it"` or `"en"`.

- query:

  Optional selection of the data: a named list with the variable codes
  as names and the value codes as values (columns `code` and `values` of
  [`bfs_get_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_metadata.md)),
  e.g. `list(Jahr = c("40", "41"), Geschlecht = "*")`. `"*"` selects all
  values. A variable not in `query` is left out of the result (totals
  over it), if the dataset allows it. If `NULL` (default), the whole
  dataset is downloaded.

- clean_names:

  If `TRUE`, clean the column names with
  [`janitor::clean_names()`](https://sfirke.github.io/janitor/reference/clean_names.html).

- delay:

  Optional number of seconds to wait before downloading the data, to
  avoid "Too Many Requests" errors when calling the API in a loop.

## Value

A tibble with one row per comment. Returns `NULL` if there is no
internet connection.

## Details

The PXWeb API is the API of STAT-TAB, which the BFS is replacing with
the Swiss Stats Explorer.

## See also

[`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)

## Examples

``` r
if (FALSE) { # interactive()
bfs_get_data_comments(number_bfs = "px-x-1502040100_131", language = "en")
}
```
