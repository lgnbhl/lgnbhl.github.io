# Get the codelists of a Swiss Stats Explorer dataset (deprecated)

**\[deprecated\]**

Deprecated since BFS 0.8.0: use
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md)
instead. This function still works and gets only bug fixes, e.g. the
labels of codes with no name in `language` (see NEWS). To move your
code, see the article [Moving to the new Swiss Stats Explorer
functions](https://felixluginbuhl.com/BFS/articles/sse-migration.html).

Get the dimensions of a dataset of the Swiss Stats Explorer (SSE) API
(<https://stats.swiss/>) and the values each dimension can take. Use
them to build the `query` of
[`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md).

## Usage

``` r
bfs_get_sse_metadata(number_bfs, language = "de")
```

## Arguments

- number_bfs:

  The id of an SSE dataset (dataflow), e.g. `"DF_LWZ_1"`. It is shown in
  the URL of the dataset on <https://stats.swiss/>.

- language:

  Language of the labels: `"de"` (default), `"fr"`, `"it"` or `"en"`. A
  label missing in this language falls back to another language.

## Value

A tibble with one row per value of each dimension:

- code:

  The dimension code, to use as a name in `query`.

- text:

  The dimension label.

- value:

  The value code, to use as a value in `query`.

- valueText:

  The value label.

- position_dimension:

  The position of the dimension in the dataset.

Returns `NULL` if there is no internet connection.

## Details

The list of the SSE datasets is cached for the R session. A long-running
R session, e.g. a Shiny app, keeps using the version of a dataset it saw
first: call
[`bfs_clear_cache()`](https://felixluginbuhl.com/BFS/reference/bfs_clear_cache.md)
to use a new version, or use
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md),
which caches nothing.

## See also

[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md),
[`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md)

## Author

Marius Hodel

## Examples

``` r
if (FALSE) { # interactive()
codelist <- bfs_get_sse_metadata("DF_LWZ_1", language = "en")
codelist

# the dimensions and their codes
unique(codelist[c("code", "text")])
}
```
