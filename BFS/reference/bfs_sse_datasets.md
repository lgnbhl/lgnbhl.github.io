# List the datasets of the Swiss Stats Explorer

List the datasets (dataflows) of the Swiss Stats Explorer (SSE) API
(<https://stats.swiss/>), to find the id of a dataset for
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md)
and
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md).

## Usage

``` r
bfs_sse_datasets(language = "de")
```

## Arguments

- language:

  Language of the names: `"de"` (default), `"fr"`, `"it"` or `"en"`.

## Value

A tibble with one row per version of each dataset, the latest version
first:

- dataset:

  The id of the dataset, e.g. `"DF_LWZ_1"`.

- name:

  The name of the dataset.

- version:

  The version of the dataset.

- agency:

  The agency publishing the dataset.

- description:

  The description of the dataset version, or `NA`, as given by the API:
  it can contain HTML tags such as `<br>`.

Returns `NULL` if there is no internet connection.

## See also

[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md),
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md)

## Author

Felix Luginbuhl

## Examples

``` r
if (FALSE) { # interactive()
datasets <- bfs_sse_datasets(language = "en")
datasets

# datasets about tourism, in their name or description
datasets[grepl("touris", paste(datasets$name, datasets$description), ignore.case = TRUE), ]
}
```
