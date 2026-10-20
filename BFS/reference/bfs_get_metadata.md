# Get the variables of a BFS dataset

Get the variables of a dataset of the PXWeb API and the values each
variable can take. Use them to build the `query` of
[`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md).

## Usage

``` r
bfs_get_metadata(number_bfs, language = "de")
```

## Arguments

- number_bfs:

  The BFS number of a dataset, e.g. `"px-x-1502040100_131"`.

- language:

  Language of the dataset: `"de"` (default), `"fr"`, `"it"` or `"en"`.

## Value

A tibble with one row per variable and the columns `code` and `text`
(variable code and label), `values` and `valueTexts` (list columns with
the value codes and labels) and `title` (title of the dataset). Use
`tidyr::unnest_longer(metadata, c(values, valueTexts))` to get one row
per value. Returns `NULL` if there is no internet connection.

## Details

The PXWeb API is the API of STAT-TAB, which the BFS is replacing with
the Swiss Stats Explorer (see
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md)).

## See also

[`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)

## Examples

``` r
if (FALSE) { # interactive()
metadata <- bfs_get_metadata(number_bfs = "px-x-1502040100_131", language = "en")
metadata

# one row per value
tidyr::unnest_longer(metadata, c(values, valueTexts))
}
```
