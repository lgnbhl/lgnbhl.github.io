# Get a BFS dataset

Download a dataset from the PXWeb API of the BFS with its BFS number.
Find the BFS number with
[`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)
or on the BFS website.

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

- column_name_type:

  Column names as `"text"` (label, default) or `"code"`.

- variable_value_type:

  Values as `"text"` (label, default) or `"code"`.

- clean_names:

  If `TRUE`, clean the column names with
  [`janitor::clean_names()`](https://sfirke.github.io/janitor/reference/clean_names.html).

- delay:

  Optional number of seconds to wait before downloading the data, to
  avoid "Too Many Requests" errors when calling the API in a loop.

## Value

A tibble. Returns `NULL` if there is no internet connection.

## Details

Large datasets can exceed the limits of the API: select only the data
you need with `query`, or download the whole file with
[`bfs_download_asset()`](https://felixluginbuhl.com/BFS/reference/bfs_download_asset.md).

The PXWeb API is the API of STAT-TAB, which the BFS is replacing with
the Swiss Stats Explorer: check first if the statistic is on
<https://stats.swiss/> and use
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md).

## See also

[`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md),
[`bfs_get_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_metadata.md),
[`bfs_get_data_comments()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data_comments.md)

## Examples

``` r
if (FALSE) { # interactive()
# whole dataset
bfs_get_data(number_bfs = "px-x-1502040100_131", language = "en")

# only some years and levels of study
bfs_get_data(
  number_bfs = "px-x-1502040100_131",
  language = "en",
  query = list(Jahr = c("40", "41"), Studienstufe = c("2", "3"))
)
}
```
