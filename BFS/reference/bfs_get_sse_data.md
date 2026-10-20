# Get data from the Swiss Stats Explorer (deprecated)

**\[deprecated\]**

Deprecated since BFS 0.8.0: use
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md)
instead. It downloads the data faster and stops on a query that wouldn't
filter the data. This function still works and gets only bug fixes, e.g.
the labels of codes with no name in `language` (see NEWS). To move your
code, see the article [Moving to the new Swiss Stats Explorer
functions](https://felixluginbuhl.com/BFS/articles/sse-migration.html).

Download a dataset of the Swiss Stats Explorer (SSE) API
(<https://stats.swiss/>). Select the data you need with `query`, built
from the codelists of
[`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md).

## Usage

``` r
bfs_get_sse_data(
  number_bfs,
  language = "de",
  start_period = NULL,
  end_period = NULL,
  query = NULL,
  column_name_type = "code",
  variable_value_type = "text",
  clean_names = FALSE
)
```

## Arguments

- number_bfs:

  The id of an SSE dataset (dataflow), e.g. `"DF_LWZ_1"`. It is shown in
  the URL of the dataset on <https://stats.swiss/>.

- language:

  Language of the labels: `"de"` (default), `"fr"`, `"it"` or `"en"`.

- start_period, end_period:

  Optional first and last period of the data, e.g. `"2020"`.

- query:

  A named list: the names are dimension codes (column `code` of
  [`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md))
  and the values are value codes (column `value`), e.g.
  `list(FREQ = "M", COUNTRY_ORIGIN = c("CH", "AUSL"))`. A dimension not
  in `query` keeps all its values. If `NULL` (default), the whole
  dataset is downloaded, which can be large and slow.

- column_name_type:

  Column names as dimension `"code"` (default) or `"text"` (label).

- variable_value_type:

  Values as `"text"` (label, default) or `"code"`.

- clean_names:

  If `TRUE`, clean the column names with
  [`janitor::clean_names()`](https://sfirke.github.io/janitor/reference/clean_names.html).

## Value

A tibble with one column per dimension and the observations in the
`value` column. Returns `NULL` if there is no internet connection.

## Details

The list of the SSE datasets is cached for the R session. A long-running
R session, e.g. a Shiny app, keeps using the version of a dataset it saw
first: call
[`bfs_clear_cache()`](https://felixluginbuhl.com/BFS/reference/bfs_clear_cache.md)
to use a new version, or use
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md),
which caches nothing.

## See also

[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md),
[`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md)

## Author

Marius Hodel

## Examples

``` r
if (FALSE) { # interactive()
bfs_get_sse_data(
  number_bfs = "DF_PASTA_552_MONTHLY",
  language = "en",
  query = list(
    FREQ = "M",
    ACCOMMODATION_TYPE = "552001",
    COUNTRY_ORIGIN = c("CH", "AUSL")
  ),
  start_period = "2020",
  end_period = "2023"
)
}
```
