# Get the dimensions of a Swiss Stats Explorer dataset

Get the dimensions of a dataset of the Swiss Stats Explorer (SSE) API
(<https://stats.swiss/>) and the values allowed in each dimension. Use
them to build the `filters` of
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md).

## Usage

``` r
bfs_sse_dimensions(dataset, ..., language = "de", version = NULL)
```

## Arguments

- dataset:

  The id of a dataset, e.g. `"DF_LWZ_1"`: the column `dataset` of
  [`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md),
  also shown in the URL of the dataset on <https://stats.swiss/>.

- ...:

  These dots are for future extensions and must be empty: the arguments
  after `dataset` must be named. The arguments of
  [`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md),
  such as `number_bfs`, give an error that names their new name.

- language:

  Language of the labels: `"de"` (default), `"fr"`, `"it"` or `"en"`. A
  label missing in this language falls back to another language.

- version:

  Version of the dataset, e.g. `"1.1.0"`: the column `version` of
  [`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md).
  If `NULL` (default), the API uses the latest version. Set it in a data
  pipeline to keep the same structure when a new version is published.

## Value

A tibble with one row per value allowed in each dimension (some values
may have no data):

- dimension:

  The dimension id, to use as a name in `filters`.

- dimension_label:

  The dimension label.

- value:

  The value code, to use as a value in `filters`.

- value_label:

  The value label.

- position:

  The position of the dimension in the dataset.

- parent:

  The code of the parent value in the codelist, e.g. the district of a
  commune and the canton of a district, or `NA`. Use it to select all
  the values under a value.

Returns `NULL` if there is no internet connection.

## See also

[`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md),
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md)

## Author

Felix Luginbuhl

## Examples

``` r
if (FALSE) { # interactive()
dimensions <- bfs_sse_dimensions("DF_PASTA_552_MONTHLY", language = "en")
dimensions

# the dimensions only
unique(dimensions[c("dimension", "dimension_label")])

# the communes of the canton of Geneva: the values whose parent is a
# district of Geneva
regions <- bfs_sse_dimensions("DF_LWZ_1", language = "en")
districts <- regions$value[regions$parent %in% "GE"]
regions[regions$parent %in% districts, ]
}
```
