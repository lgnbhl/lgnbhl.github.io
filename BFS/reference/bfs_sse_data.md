# Get data from the Swiss Stats Explorer

Download the data of a dataset of the Swiss Stats Explorer (SSE) API
(<https://stats.swiss/>). Select the data you need with `filters`, built
from
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md).

## Usage

``` r
bfs_sse_data(
  dataset,
  ...,
  filters = NULL,
  start_period = NULL,
  end_period = NULL,
  first_n = NULL,
  last_n = NULL,
  language = "de",
  labels = c("both", "code", "label"),
  attributes = FALSE,
  version = NULL
)
```

## Arguments

- dataset:

  The id of a dataset, e.g. `"DF_LWZ_1"`: the column `dataset` of
  [`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md),
  also shown in the URL of the dataset on <https://stats.swiss/>.

- ...:

  These dots are for future extensions and must be empty: the arguments
  after `dataset` must be named. The arguments of
  [`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md),
  such as `number_bfs` or `query`, give an error that names their new
  name.

- filters:

  A named list: the names are dimensions (column `dimension` of
  [`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md))
  and the values are value codes (column `value`), e.g.
  `list(FREQ = "M", COUNTRY_ORIGIN = c("CH", "AUSL"))`. A dimension not
  in `filters` keeps all its values. If `NULL` (default), the whole
  dataset is downloaded, which can be large and slow. An unknown
  dimension is an error, as the data wouldn't be filtered on it.

- start_period, end_period:

  Optional first and last period of the data, e.g. `"2020"` or
  `"2020-01"`.

- first_n, last_n:

  Optional number of first or last periods of each series (each
  combination of the dimensions), e.g. `last_n = 1` for the latest
  value. Sent to the API as the SDMX parameters `firstNObservations` and
  `lastNObservations`. They can be combined with `start_period` and
  `end_period`.

- language:

  Language of the labels: `"de"` (default), `"fr"`, `"it"` or `"en"`. A
  label missing in this language falls back to another language.

- labels:

  The values of the dimensions and attributes: `"both"` (default) to
  keep the codes and add a column `<dimension>_label` after each
  dimension, `"code"` for the codes only, or `"label"` for the labels
  only. Different codes can have the same label (e.g. the canton and the
  commune of Bern), so use `"label"` only to display the data.

- attributes:

  If `TRUE`, add the attributes of the observations after `value`, e.g.
  `OBS_STATUS` (status of the value, e.g. provisional). They can change
  from one version of a dataset to another.

- version:

  Version of the dataset, e.g. `"1.1.0"`: the column `version` of
  [`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md).
  If `NULL` (default), the API uses the latest version. Set it in a data
  pipeline to keep the same structure when a new version is published.

## Value

A tibble with one column per dimension, named with the dimension id
whatever the `language`, then `TIME_PERIOD` as text (e.g. `"2024"`,
`"2024-Q1"`, `"2024-01"`), as given by the API, and the observations in
the numeric `value` column. Returns `NULL` if there is no internet
connection. The errors have a class, to handle them with
[`tryCatch()`](https://rdrr.io/r/base/conditions.html):

- `bfs_no_records`:

  No data matches the query.

- `bfs_sse_filter_error`:

  `filters` wouldn't filter the data, e.g. an unknown dimension.

- `bfs_sse_argument_error`:

  Another argument is not valid.

- `bfs_sse_dataset_error`:

  The dataset or the version doesn't exist.

- `bfs_sse_query_error`:

  The API rejects the query, e.g. a period in a wrong format or a URL
  too long. The error gives the message of the API.

- `bfs_http_error`:

  The API is not available.

## Details

The data is downloaded in the SDMX-CSV format, with the labels in
`language` given by the API. It is smaller and faster to read than the
SDMX-ML format used by
[`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md).

The function sends two requests: one for the dimensions of the dataset,
to build the query from `filters`, and one for the data. The values in
`filters` are checked by the API: a value not in the dataset gives no
data.

## See also

[`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md),
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md)

## Author

Felix Luginbuhl

## Examples

``` r
if (FALSE) { # interactive()
bfs_sse_data(
  "DF_PASTA_552_MONTHLY",
  filters = list(
    FREQ = "M",
    ACCOMMODATION_TYPE = "552001",
    COUNTRY_ORIGIN = c("CH", "AUSL")
  ),
  start_period = "2020",
  end_period = "2023",
  language = "en"
)

# the latest vacancy rate of each canton
bfs_sse_data(
  "DF_LWZ_1",
  filters = list(
    GR_KT_GDE = c("GE", "ZH", "BE"),
    WOHN_ANZAHL = "_T",
    LEERWOHN_TYP = "_T",
    MEASURE_DIMENSION = "RATE"
  ),
  last_n = 1,
  language = "en"
)
}
```
