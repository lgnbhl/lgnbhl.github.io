# Moving to the new Swiss Stats Explorer functions

BFS 0.8.0 has three new functions for the [Swiss Stats
Explorer](https://stats.swiss/) (SSE):
[`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md),
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md)
and
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md).
They replace the old functions
[`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md)
and
[`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md).

**Your code keeps working.** The old functions get only bug fixes. For
example, some labels were wrong when a code has no name in your
language: they are now correct (see the NEWS of BFS 0.8.0). But the old
functions are now **deprecated**: when your code uses them, you get a
warning (at most once every 8 hours) that tells you to use the new
functions. Please move your code to the new functions, with the help of
this article.

If a package that you use calls the old functions, you get no warning.
Only the authors of this package see the warning, when they test their
package.

To hide the warning, for example in a pipeline that you can’t change
now:

``` r

options(lifecycle_verbosity = "quiet")
```

In the examples, we use the same data as in the article [Swiss Stats
Explorer](https://felixluginbuhl.com/BFS/articles/swiss-stats-explorer.md):
the vacancy rate (the share of empty homes, in %) of the cantons of
Geneva, Zurich and Bern.

``` r

library(BFS)
library(dplyr)
```

## Why new functions?

Marius Hodel wrote
[`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md)
and
[`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md)
for BFS 0.7. With them, you could use the Swiss Stats Explorer in R for
the first time. With time, data pipelines showed some limits. We can’t
fix them without changing the results of the old functions:

- **Speed.** The old functions download the data as XML (SDMX-ML), the
  biggest format of the API, and read it in R. For the same query, the
  CSV format (SDMX-CSV) is about 10 times smaller and much faster to
  read.
- **Data that is not filtered.** If a name in `query` is not a dimension
  of the dataset (for example, a typo), the old functions ignore it. The
  data is not filtered on this dimension, and nothing tells you.
- **Versions.** A dataset can have several versions, and a new version
  can change the dimensions. The old functions always use the latest
  version. So your pipeline can break when the BFS publishes a new
  version.
- **Labels.** The names of the dimensions come from the codelists. They
  are sometimes technical (for example “Code list for the ‘Statistical
  operation’ concept”) or not translated.
- **Missing information.** The old functions remove the attributes of
  each value, for example its status (provisional or not).

If we changed the old functions, the results of your pipelines would
change. So the old functions stay the same, and the improvements are in
new functions with new names.

The Swiss Stats Explorer uses a standard SDMX server, the [.Stat
Suite](https://sis-cc.gitlab.io/dotstatsuite-documentation/). The new
functions are a thin layer over its API. They only use what the SDMX
standard defines, and let the server do as much work as possible: it
creates the CSV, gives the labels in your language, finds the latest
version and checks the codes. This means less code in R, and less code
that can break when the API changes.

## The functions side by side

| Old | New | What changes |
|----|----|----|
| (none) | [`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md) | New: lists the datasets, with all their versions and their descriptions. |
| `bfs_get_sse_metadata(number_bfs)` | `bfs_sse_dimensions(dataset)` | New column names, better dimension names. |
| `bfs_get_sse_data(number_bfs, query)` | `bfs_sse_data(dataset, filters)` | Faster, checks the filters, same column names in all languages, attributes. |

The arguments:

| [`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md) | [`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md) |
|----|----|
| `number_bfs` | `dataset` |
| `query` | `filters` (checked, see below) |
| `start_period`, `end_period` | `start_period`, `end_period` |
| (none) | `first_n`, `last_n`, e.g. `last_n = 1` for the latest value |
| `language` | `language` |
| `variable_value_type = "text"` / `"code"` | `labels = "label"` / `"code"`, or `"both"` (default) |
| `column_name_type = "code"` / `"text"` | (always the dimension ids) |
| `clean_names` | (use [`janitor::clean_names()`](https://sfirke.github.io/janitor/reference/clean_names.html) if you need it) |
| (always the latest version) | `version` |
| (no attributes) | `attributes = TRUE` |

The columns of
[`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md)
and
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md):

| [`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md) | [`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md) |
|----|----|
| `code` | `dimension` |
| `text` | `dimension_label` |
| `value` | `value` |
| `valueText` | `value_label` |
| `position_dimension` | `position` |
| (none) | `parent`: the value above, e.g. the canton of a district |

The first five columns are in the same order, so code that selects them
by position keeps working.

## The same query, before and after

Our filters: the vacancy rate of the cantons of Geneva, Zurich and Bern.

``` r

filters <- list(
  GR_KT_GDE = c("GE", "ZH", "BE"), # the three cantons
  WOHN_ANZAHL = "_T",              # all numbers of rooms
  LEERWOHN_TYP = "_T",             # all types of vacant dwellings
  MEASURE_DIMENSION = "RATE"       # the vacancy rate, in %
)
```

Before, with the old function. You get the deprecation warning:

``` r

old <- bfs_get_sse_data(
  number_bfs = "DF_LWZ_1",
  query = filters,
  start_period = "2020",
  language = "en"
)
#> Warning: `bfs_get_sse_data()` was deprecated in BFS 0.8.0.
#> ℹ Please use `bfs_sse_data()` instead.
#> ℹ `bfs_sse_data()` is faster and stops on filters that don't filter the data.
#> ℹ Arguments: `number_bfs` is now `dataset`, `query` is now `filters`,
#>   `variable_value_type` is now `labels`.
#> ℹ How to move your code:
#>   <https://felixluginbuhl.com/BFS/articles/sse-migration.html>
#> This warning is displayed once per session.
#> Call `lifecycle::last_lifecycle_warnings()` to see where this warning was
#> generated.
old
#> # A tibble: 21 × 7
#>    TIME_PERIOD GR_KT_GDE WOHN_ANZAHL LEERWOHN_TYP  MEASURE_DIMENSION FREQ  value
#>    <chr>       <chr>     <chr>       <chr>         <chr>             <chr> <dbl>
#>  1 2020        Zurich    Total       Vacant dwell… Rate              Annu…  0.91
#>  2 2021        Zurich    Total       Vacant dwell… Rate              Annu…  0.72
#>  3 2022        Zurich    Total       Vacant dwell… Rate              Annu…  0.6 
#>  4 2023        Zurich    Total       Vacant dwell… Rate              Annu…  0.53
#>  5 2024        Zurich    Total       Vacant dwell… Rate              Annu…  0.56
#>  6 2025        Zurich    Total       Vacant dwell… Rate              Annu…  0.48
#>  7 2026        Zurich    Total       Vacant dwell… Rate              Annu…  0.52
#>  8 2020        Bern      Total       Vacant dwell… Rate              Annu…  1.83
#>  9 2021        Bern      Total       Vacant dwell… Rate              Annu…  1.58
#> 10 2022        Bern      Total       Vacant dwell… Rate              Annu…  1.44
#> # ℹ 11 more rows
```

After, with the new function. `labels = "label"` gives the names only,
as
[`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md)
does by default:

``` r

new <- bfs_sse_data(
  "DF_LWZ_1",
  filters = filters,
  start_period = "2020",
  labels = "label",
  language = "en"
)
new
#> # A tibble: 21 × 7
#>    GR_KT_GDE WOHN_ANZAHL LEERWOHN_TYP  MEASURE_DIMENSION FREQ  TIME_PERIOD value
#>    <chr>     <chr>       <chr>         <chr>             <chr> <chr>       <dbl>
#>  1 Zurich    Total       Vacant dwell… Rate              Annu… 2020         0.91
#>  2 Zurich    Total       Vacant dwell… Rate              Annu… 2021         0.72
#>  3 Zurich    Total       Vacant dwell… Rate              Annu… 2022         0.6 
#>  4 Zurich    Total       Vacant dwell… Rate              Annu… 2023         0.53
#>  5 Zurich    Total       Vacant dwell… Rate              Annu… 2024         0.56
#>  6 Zurich    Total       Vacant dwell… Rate              Annu… 2025         0.48
#>  7 Zurich    Total       Vacant dwell… Rate              Annu… 2026         0.52
#>  8 Bern      Total       Vacant dwell… Rate              Annu… 2020         1.83
#>  9 Bern      Total       Vacant dwell… Rate              Annu… 2021         1.58
#> 10 Bern      Total       Vacant dwell… Rate              Annu… 2022         1.44
#> # ℹ 11 more rows
```

The values are the same. Only the order of the columns is different:
`TIME_PERIOD` now comes after the dimensions.

``` r

all.equal(
  arrange(old, across(everything())),
  arrange(select(new, all_of(names(old))), across(everything()))
)
#> [1] TRUE
```

## What is different

### A typo in the filters is an error

With
[`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md),
a dimension with a typo is ignored. This query has a typo in
`MEASURE_DIMENSION`. So it returns both measures (the number of vacant
dwellings and the rate), not only the rate:

``` r

typo <- list(GR_KT_GDE = "GE", WOHN_ANZAHL = "_T", LEERWOHN_TYP = "_T",
             MEASURE_DIMENSON = "RATE")

old_typo <- bfs_get_sse_data("DF_LWZ_1", query = typo, start_period = "2020")
n_distinct(old_typo$MEASURE_DIMENSION)
#> [1] 2
```

[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md)
stops with an error:

``` r

bfs_sse_data("DF_LWZ_1", filters = typo, start_period = "2020")
#> Error:
#> ! Unknown dimension in `filters`: MEASURE_DIMENSON.
#> ℹ The dimensions of the dataset are: GR_KT_GDE, WOHN_ANZAHL, LEERWOHN_TYP, MEASURE_DIMENSION, FREQ.
#> ℹ See the column `dimension` of `bfs_sse_dimensions()`.
```

You also get an error for `TIME_PERIOD` in `filters`, for filters
without a name, for a dimension given twice, and for an empty vector of
codes or `NA`. The API checks the codes: a code that is not in the
dataset gives no data.

### You can choose the version

[`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md)
lists all the versions of each dataset:

``` r

bfs_sse_datasets() |>
  filter(dataset == "DF_LWZ_1")
#> # A tibble: 2 × 5
#>   dataset  name                                       version agency description
#>   <chr>    <chr>                                      <chr>   <chr>  <chr>      
#> 1 DF_LWZ_1 Leer stehende Wohnungen nach Grossregion,… 1.1.0   CH1.L… Dieses Dat…
#> 2 DF_LWZ_1 Leer stehende Wohnungen nach Grossregion,… 1.0.0   CH1.L… Dieses Dat…
```

By default, the API uses the latest version. In a pipeline, set
`version` to keep the same structure until you update your code:

``` r

bfs_sse_data("DF_LWZ_1", filters = filters, version = "1.1.0")
```

### The column names are the same in all languages

[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md)
always uses the dimension ids as column names, for example `GR_KT_GDE`,
in all languages. So your code does not break if you change the
language, or if a label changes. By default (`labels = "both"`), you get
the codes, and the labels in a new `<dimension>_label` column:

``` r

bfs_sse_data(
  "DF_LWZ_1",
  filters = filters,
  start_period = "2026",
  language = "fr"
)
#> # A tibble: 3 × 12
#>   GR_KT_GDE GR_KT_GDE_label WOHN_ANZAHL WOHN_ANZAHL_label LEERWOHN_TYP
#>   <chr>     <chr>           <chr>       <chr>             <chr>       
#> 1 ZH        Zurich          _T          Total             _T          
#> 2 BE        Berne           _T          Total             _T          
#> 3 GE        Genève          _T          Total             _T          
#> # ℹ 7 more variables: LEERWOHN_TYP_label <chr>, MEASURE_DIMENSION <chr>,
#> #   MEASURE_DIMENSION_label <chr>, FREQ <chr>, FREQ_label <chr>,
#> #   TIME_PERIOD <chr>, value <dbl>
```

Why both by default? Two codes can have the same label. For example, in
`DF_LWZ_1`, the canton of Zurich (`ZH`) and the city of Zurich (`261`)
are both “Zürich”. With the labels only, you can’t tell their rows
apart.

If you used `column_name_type = "text"`, rename the columns with the
labels of
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md):

``` r

dims <- bfs_sse_dimensions("DF_LWZ_1", language = "en") |>
  distinct(dimension, dimension_label)

new |>
  rename_with(~ dims$dimension_label[match(.x, dims$dimension)], all_of(dims$dimension))
#> # A tibble: 21 × 7
#>    `Cantons, districts and communes` `Number of rooms` `Type of vacant dwelling`
#>    <chr>                             <chr>             <chr>                    
#>  1 Zurich                            Total             Vacant dwellings (all ty…
#>  2 Zurich                            Total             Vacant dwellings (all ty…
#>  3 Zurich                            Total             Vacant dwellings (all ty…
#>  4 Zurich                            Total             Vacant dwellings (all ty…
#>  5 Zurich                            Total             Vacant dwellings (all ty…
#>  6 Zurich                            Total             Vacant dwellings (all ty…
#>  7 Zurich                            Total             Vacant dwellings (all ty…
#>  8 Bern                              Total             Vacant dwellings (all ty…
#>  9 Bern                              Total             Vacant dwellings (all ty…
#> 10 Bern                              Total             Vacant dwellings (all ty…
#> # ℹ 11 more rows
#> # ℹ 4 more variables: `Measure type` <chr>, `Frequency of observation` <chr>,
#> #   TIME_PERIOD <chr>, value <dbl>
```

### Better names for the dimensions

[`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md)
uses the name of the codelist of each dimension.
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md)
uses the name of its concept. This is the name you see on stats.swiss:

``` r

old_labels <- bfs_get_sse_metadata("DF_LWZ_1", language = "en") |>
  distinct(code, old_label = text)
new_labels <- bfs_sse_dimensions("DF_LWZ_1", language = "en") |>
  distinct(dimension, new_label = dimension_label)

left_join(old_labels, new_labels, by = c("code" = "dimension"))
#> # A tibble: 5 × 3
#>   code              old_label                                          new_label
#>   <chr>             <chr>                                              <chr>    
#> 1 GR_KT_GDE         Cantons, districts and communes                    Cantons,…
#> 2 MEASURE_DIMENSION Code list for the ‘Statistical operation’ concept… Measure …
#> 3 WOHN_ANZAHL       Codeliste für die Anzahl Zimmer                    Number o…
#> 4 LEERWOHN_TYP      Codelist for the type of vacant dwelling           Type of …
#> 5 FREQ              Frequency of observation                           Frequenc…
```

The names of the values do not change.

### You can keep the attributes

With `attributes = TRUE`,
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md)
adds the attributes of each value after `value`, with their labels as
for the dimensions. For example, `OBS_STATUS` is the status of the value
(provisional, estimated, …). The attributes can change from one version
of a dataset to another:

``` r

bfs_sse_data(
  "DF_LWZ_1",
  filters = filters,
  start_period = "2026",
  attributes = TRUE,
  language = "en"
)
#> # A tibble: 3 × 16
#>   GR_KT_GDE GR_KT_GDE_label WOHN_ANZAHL WOHN_ANZAHL_label LEERWOHN_TYP
#>   <chr>     <chr>           <chr>       <chr>             <chr>       
#> 1 ZH        Zurich          _T          Total             _T          
#> 2 BE        Bern            _T          Total             _T          
#> 3 GE        Geneva          _T          Total             _T          
#> # ℹ 11 more variables: LEERWOHN_TYP_label <chr>, MEASURE_DIMENSION <chr>,
#> #   MEASURE_DIMENSION_label <chr>, FREQ <chr>, FREQ_label <chr>,
#> #   TIME_PERIOD <chr>, value <dbl>, DECIMALS <chr>, DECIMALS_label <chr>,
#> #   OBS_STATUS <chr>, OBS_STATUS_label <chr>
```

### Each error has a class

| Situation | [`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md) | [`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md) |
|----|----|----|
| No data for the query | error without a class: “No records found” for most datasets, “HTTP error: 404” for some | error `bfs_no_records` |
| Unknown dimension in the filters | ignored | error `bfs_sse_filter_error` |
| Old argument name, e.g. `query` | (not possible) | error `bfs_sse_argument_error` |
| Unknown dataset or version | error | error `bfs_sse_dataset_error` |
| Query refused by the API, e.g. a wrong period | error without a class: “HTTP error”, with the message of the API | error `bfs_sse_query_error`, with the message of the API |
| API not available | error `bfs_http_error` | error `bfs_http_error` |

Handle them in a pipeline with
[`tryCatch()`](https://rdrr.io/r/base/conditions.html):

``` r

tryCatch(
  bfs_sse_data("DF_LWZ_1", filters = filters),
  bfs_no_records = function(e) NULL
)
```

### It is faster

For small queries, both functions take about one second. The new
function first gets the dimensions of the dataset (a few kilobytes),
then the data. The bigger the data, the bigger the difference: in our
tests, for a dataset of 344,000 values,
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md)
took 6 seconds and
[`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md)
28 seconds, with 6 times more memory.

## How to change your code

If you only change the name of the function, and keep the old arguments,
you get an error. It tells you the new name of each argument:

``` r

bfs_sse_data(number_bfs = "DF_LWZ_1", query = filters)
#> Error:
#> ! `bfs_sse_data()` has new argument names.
#> ✖ `number_bfs` is now `dataset`.
#> ✖ `query` is now `filters`.
#> ℹ See <https://felixluginbuhl.com/BFS/articles/sse-migration.html>
```

After `dataset`, you must write the name of each argument. For example,
`bfs_sse_data("DF_LWZ_1", "en")` is an error: write
`bfs_sse_data("DF_LWZ_1", language = "en")`.

The steps:

1.  Replace
    [`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md)
    with
    [`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md).
    Rename the columns you use (see the table above).
2.  Replace `bfs_get_sse_data(number_bfs = ..., query = ...)` with
    `bfs_sse_data(dataset = ..., filters = ...)`. Replace
    `variable_value_type` with `labels`. If you used the default
    (`variable_value_type = "text"`), use `labels = "label"`.
3.  Remove `column_name_type` and `clean_names`. If your code uses the
    labels as column names, rename the columns as shown above.
4.  If your code selects columns by their position: `TIME_PERIOD` now
    comes after the dimensions. It is safer to select columns by their
    name.
5.  Set `version` to the version you use today (see
    [`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md)).
6.  Compare the old and the new results once, as in [the same query,
    before and after](#the-same-query-before-and-after). Then switch.
