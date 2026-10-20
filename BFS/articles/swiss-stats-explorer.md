# Swiss Stats Explorer

The [Swiss Stats Explorer](https://stats.swiss/) (SSE) is the new data
platform of the BFS. It uses the SDMX standard. It replaces STAT-TAB and
its PXWeb API (see [Get
started](https://felixluginbuhl.com/BFS/articles/introduction.html#from-stat-tab-to-the-swiss-stats-explorer)).

## Our example: the vacancy rate

In this article, we look at the **vacancy rate**: the share of homes
that are empty and available, in percent. A low vacancy rate means that
it is hard to find a home. We compare three cantons: **Geneva**,
**Zurich** and **Bern**.

The BFS publishes the vacant dwellings every year since 1995, for each
canton, district and commune.

## How it works

A dataset has **dimensions**, for example the canton or the number of
rooms. Each dimension has a list of **values**, for example `GE` for
Geneva. You get data in three steps:

1.  Find the dataset with
    [`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md).
2.  See its dimensions and values with
    [`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md).
3.  Choose the values you need (the `filters`) and download the data
    with
    [`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md).

The functions are a thin layer over the API: they send your query, and
the API does the work (for example, it finds the latest version and
gives the labels in your language). So they keep working when the API
changes.

``` r

library(BFS)
library(dplyr)
```

## Step 1: find the dataset

[`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md)
lists all the datasets. There is one row for each version of a dataset.
Search for “vacant” in the names and the descriptions:

``` r

datasets <- bfs_sse_datasets(language = "en")
datasets |>
  filter(grepl("vacant", paste(name, description), ignore.case = TRUE))
#> # A tibble: 3 × 5
#>   dataset  name                                       version agency description
#>   <chr>    <chr>                                      <chr>   <chr>  <chr>      
#> 1 DF_LWZ_1 Vacant dwellings by region, canton, distr… 1.1.0   CH1.L… This datas…
#> 2 DF_LWZ_1 Vacant dwellings by region, canton, distr… 1.0.0   CH1.L… This datas…
#> 3 DF_LWZ_2 Vacant dwellings by agglomeration, number… 1.0.0   CH1.L… This datas…
```

The description tells you more about a dataset. The first row of a
dataset is its latest version:

``` r

datasets |>
  filter(dataset == "DF_LWZ_1") |>
  slice(1) |>
  pull(description)
#> [1] "This dataset presents annual figures on the number of vacant dwellings by great region, canton, district, commune, number of rooms, and type of vacant dwelling since 1995.<br><br><b><i>Data source: </i></b>Cantons and communes"
```

The descriptions come as the API gives them, so some have HTML tags,
such as `<br>` for a new line.

The dataset we need is `DF_LWZ_1`. This id is the `dataset` argument of
the other functions.

You can also search on [stats.swiss](https://stats.swiss/). The id of a
dataset is in the URL of its page, after `df[id]=`.

## Step 2: see the dimensions

``` r

dimensions <- bfs_sse_dimensions("DF_LWZ_1", language = "en")
dimensions
#> # A tibble: 2,317 × 6
#>    dimension dimension_label                 value value_label   position parent
#>    <chr>     <chr>                           <chr> <chr>            <int> <chr> 
#>  1 GR_KT_GDE Cantons, districts and communes 1     Aeugst am Al…        1 B_101 
#>  2 GR_KT_GDE Cantons, districts and communes 10    Obfelden             1 B_101 
#>  3 GR_KT_GDE Cantons, districts and communes 100   Stadel               1 B_104 
#>  4 GR_KT_GDE Cantons, districts and communes 1001  Doppleschwand        1 B_316 
#>  5 GR_KT_GDE Cantons, districts and communes 1002  Entlebuch            1 B_316 
#>  6 GR_KT_GDE Cantons, districts and communes 1004  Flühli               1 B_316 
#>  7 GR_KT_GDE Cantons, districts and communes 1005  Hasle (LU)           1 B_316 
#>  8 GR_KT_GDE Cantons, districts and communes 1007  Romoos               1 B_316 
#>  9 GR_KT_GDE Cantons, districts and communes 1008  Schüpfheim           1 B_316 
#> 10 GR_KT_GDE Cantons, districts and communes 1009  Werthenstein         1 B_316 
#> # ℹ 2,307 more rows
```

There is one row for each value of each dimension:

- `dimension` and `dimension_label`: the id and the name of the
  dimension.
- `value` and `value_label`: the code and the name of the value.

The dimensions of the dataset:

``` r

distinct(dimensions, dimension, dimension_label)
#> # A tibble: 5 × 2
#>   dimension         dimension_label                
#>   <chr>             <chr>                          
#> 1 GR_KT_GDE         Cantons, districts and communes
#> 2 WOHN_ANZAHL       Number of rooms                
#> 3 LEERWOHN_TYP      Type of vacant dwelling        
#> 4 MEASURE_DIMENSION Measure type                   
#> 5 FREQ              Frequency of observation
```

### Find the codes you need

We need the codes of our three cantons. Search them by their name:

``` r

filter(dimensions, value_label %in% c("Geneva", "Zurich", "Bern"))
#> # A tibble: 6 × 6
#>   dimension dimension_label                 value value_label position parent
#>   <chr>     <chr>                           <chr> <chr>          <int> <chr> 
#> 1 GR_KT_GDE Cantons, districts and communes 261   Zurich             1 B_112 
#> 2 GR_KT_GDE Cantons, districts and communes 351   Bern               1 B_246 
#> 3 GR_KT_GDE Cantons, districts and communes 6621  Geneva             1 B_2500
#> 4 GR_KT_GDE Cantons, districts and communes BE    Bern               1 8100  
#> 5 GR_KT_GDE Cantons, districts and communes GE    Geneva             1 8100  
#> 6 GR_KT_GDE Cantons, districts and communes ZH    Zurich             1 8100
```

Be careful: one name can have several codes. Here, a canton and its main
city have the same name. For example, `ZH` is the canton of Zurich and
`261` is the city of Zurich. We need the cantons: `GE`, `ZH` and `BE`.

### Find all the communes of a canton

The column `parent` gives the value above each value. For the regions,
the parent of a commune is its district, and the parent of a district is
its canton. For example, the city of Zurich (`261`) is in the district
`B_112`, which is in the canton `ZH`:

``` r

filter(dimensions, value %in% c("261", "B_112", "ZH"))
#> # A tibble: 3 × 6
#>   dimension dimension_label                 value value_label   position parent
#>   <chr>     <chr>                           <chr> <chr>            <int> <chr> 
#> 1 GR_KT_GDE Cantons, districts and communes 261   Zurich               1 B_112 
#> 2 GR_KT_GDE Cantons, districts and communes B_112 Bezirk Zürich        1 ZH    
#> 3 GR_KT_GDE Cantons, districts and communes ZH    Zurich               1 8100
```

So you can find all the communes of a canton in two steps: first its
districts, then the communes of these districts. The communes of Geneva:

``` r

districts_ge <- filter(dimensions, dimension == "GR_KT_GDE", parent == "GE")
communes_ge <- filter(dimensions, dimension == "GR_KT_GDE", parent %in% districts_ge$value)
communes_ge
#> # A tibble: 45 × 6
#>    dimension dimension_label                 value value_label   position parent
#>    <chr>     <chr>                           <chr> <chr>            <int> <chr> 
#>  1 GR_KT_GDE Cantons, districts and communes 6601  Aire-la-Ville        1 B_2500
#>  2 GR_KT_GDE Cantons, districts and communes 6602  Anières              1 B_2500
#>  3 GR_KT_GDE Cantons, districts and communes 6603  Avully               1 B_2500
#>  4 GR_KT_GDE Cantons, districts and communes 6604  Avusy                1 B_2500
#>  5 GR_KT_GDE Cantons, districts and communes 6605  Bardonnex            1 B_2500
#>  6 GR_KT_GDE Cantons, districts and communes 6606  Bellevue             1 B_2500
#>  7 GR_KT_GDE Cantons, districts and communes 6607  Bernex               1 B_2500
#>  8 GR_KT_GDE Cantons, districts and communes 6608  Carouge (GE)         1 B_2500
#>  9 GR_KT_GDE Cantons, districts and communes 6609  Cartigny             1 B_2500
#> 10 GR_KT_GDE Cantons, districts and communes 6610  Céligny              1 B_2500
#> # ℹ 35 more rows
```

You can use `communes_ge$value` in the filters. In the same way,
`parent` gives the total of a dimension, e.g. `_T` for all numbers of
rooms.

The levels are not the same in all datasets: in some datasets, a commune
has no district. Check the parents of a few values first, as above.

The codes of the other dimensions:

``` r

filter(dimensions, dimension != "GR_KT_GDE")
#> # A tibble: 17 × 6
#>    dimension         dimension_label          value value_label  position parent
#>    <chr>             <chr>                    <chr> <chr>           <int> <chr> 
#>  1 WOHN_ANZAHL       Number of rooms          _T    Total               2 NA    
#>  2 WOHN_ANZAHL       Number of rooms          1     1 room              2 _T    
#>  3 WOHN_ANZAHL       Number of rooms          2     2 rooms             2 _T    
#>  4 WOHN_ANZAHL       Number of rooms          3     3 rooms             2 _T    
#>  5 WOHN_ANZAHL       Number of rooms          4     4 rooms             2 _T    
#>  6 WOHN_ANZAHL       Number of rooms          5     5 rooms             2 _T    
#>  7 WOHN_ANZAHL       Number of rooms          6     6 rooms or …        2 _T    
#>  8 LEERWOHN_TYP      Type of vacant dwelling  _T    Vacant dwel…        3 NA    
#>  9 LEERWOHN_TYP      Type of vacant dwelling  1     Vacant dwel…        3 _T    
#> 10 LEERWOHN_TYP      Type of vacant dwelling  2     Vacant dwel…        3 _T    
#> 11 LEERWOHN_TYP      Type of vacant dwelling  3     Vacant dwel…        3 _T    
#> 12 LEERWOHN_TYP      Type of vacant dwelling  4     Vacant dwel…        3 _T    
#> 13 LEERWOHN_TYP      Type of vacant dwelling  5     Recently co…        3 _T    
#> 14 LEERWOHN_TYP      Type of vacant dwelling  6     Ancient vac…        3 _T    
#> 15 MEASURE_DIMENSION Measure type             OBS   Observed Va…        4 NA    
#> 16 MEASURE_DIMENSION Measure type             RATE  Rate                4 NA    
#> 17 FREQ              Frequency of observation A     Annual              5 NA
```

### Write the filters

The filters are a named list. The names are the dimensions, and the
values are the codes you want:

``` r

filters <- list(
  GR_KT_GDE = c("GE", "ZH", "BE"), # the three cantons
  WOHN_ANZAHL = "_T",              # all numbers of rooms
  LEERWOHN_TYP = "_T",             # all types of vacant dwellings
  MEASURE_DIMENSION = "RATE"       # the vacancy rate, in %
)
```

A dimension that is not in the filters keeps all its values. If you make
a typo in the name of a dimension, you get an error. An empty vector of
codes, or `NA`, is also an error. So you never download all the data by
mistake.

The API checks the codes. A code that does not exist gives no data. Some
values have no data, too. If no value of your query has data, you get
the error “No records found for the specified query.”.

## Step 3: download the data

Download the vacancy rate since 2020 with the filters:

``` r

rates <- bfs_sse_data(
  "DF_LWZ_1",
  filters = filters,
  start_period = "2020",
  language = "en"
)
rates
#> # A tibble: 21 × 12
#>    GR_KT_GDE GR_KT_GDE_label WOHN_ANZAHL WOHN_ANZAHL_label LEERWOHN_TYP
#>    <chr>     <chr>           <chr>       <chr>             <chr>       
#>  1 ZH        Zurich          _T          Total             _T          
#>  2 ZH        Zurich          _T          Total             _T          
#>  3 ZH        Zurich          _T          Total             _T          
#>  4 ZH        Zurich          _T          Total             _T          
#>  5 ZH        Zurich          _T          Total             _T          
#>  6 ZH        Zurich          _T          Total             _T          
#>  7 ZH        Zurich          _T          Total             _T          
#>  8 BE        Bern            _T          Total             _T          
#>  9 BE        Bern            _T          Total             _T          
#> 10 BE        Bern            _T          Total             _T          
#> # ℹ 11 more rows
#> # ℹ 7 more variables: LEERWOHN_TYP_label <chr>, MEASURE_DIMENSION <chr>,
#> #   MEASURE_DIMENSION_label <chr>, FREQ <chr>, FREQ_label <chr>,
#> #   TIME_PERIOD <chr>, value <dbl>
```

Put the three cantons side by side. Geneva has the lowest vacancy rate:

``` r

rates |>
  select(GR_KT_GDE, TIME_PERIOD, value) |>
  tidyr::pivot_wider(names_from = GR_KT_GDE, values_from = value)
#> # A tibble: 7 × 4
#>   TIME_PERIOD    ZH    BE    GE
#>   <chr>       <dbl> <dbl> <dbl>
#> 1 2020         0.91  1.83  0.49
#> 2 2021         0.72  1.58  0.51
#> 3 2022         0.6   1.44  0.38
#> 4 2023         0.53  1.29  0.42
#> 5 2024         0.56  1.17  0.46
#> 6 2025         0.48  1.08  0.34
#> 7 2026         0.52  1.04  0.31
```

### The latest value

With `last_n = 1`, you get the last period of each series, without
knowing the year. The latest vacancy rate of the three cantons:

``` r

bfs_sse_data(
  "DF_LWZ_1",
  filters = filters,
  last_n = 1,
  language = "en"
) |>
  select(GR_KT_GDE, TIME_PERIOD, value)
#> # A tibble: 3 × 3
#>   GR_KT_GDE TIME_PERIOD value
#>   <chr>     <chr>       <dbl>
#> 1 GE        2026         0.31
#> 2 ZH        2026         0.52
#> 3 BE        2026         1.04
```

`last_n = 3` gives the last three periods, and `first_n` the first
periods. You can use them with `start_period` and `end_period`.

### The columns

- Two columns for each dimension: the codes (e.g. `GR_KT_GDE`) and the
  names (e.g. `GR_KT_GDE_label`). The column names are the dimension
  ids, in all languages.
- `TIME_PERIOD`: the period, e.g. the year.
- `value`: the number.

Other options:

- `labels = "code"` gives only the codes, and `labels = "label"` only
  the names. Be careful with `"label"`: two codes can have the same name
  (the canton and the city of Zurich), so use it only to show the data.
- `attributes = TRUE` adds information about each value, e.g.
  `OBS_STATUS` (for example, if the value is provisional). You get the
  codes and the names, as for the dimensions.

Without `filters`,
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md)
downloads all the data of the dataset. This can be large and slow: some
datasets have millions of values.

### Dates

`TIME_PERIOD` is text, as the API gives it, for example `"2024"`,
`"2024-Q1"` or `"2024-01"`. For a plot, make a date from it. Download
the whole series since 1997 and make a date for each year:

``` r

rates_all <- bfs_sse_data(
  "DF_LWZ_1",
  filters = filters,
  start_period = "1997",
  language = "en"
) |>
  mutate(date = as.Date(paste0(TIME_PERIOD, "-01-01")))
rates_all
#> # A tibble: 90 × 13
#>    GR_KT_GDE GR_KT_GDE_label WOHN_ANZAHL WOHN_ANZAHL_label LEERWOHN_TYP
#>    <chr>     <chr>           <chr>       <chr>             <chr>       
#>  1 ZH        Zurich          _T          Total             _T          
#>  2 ZH        Zurich          _T          Total             _T          
#>  3 ZH        Zurich          _T          Total             _T          
#>  4 ZH        Zurich          _T          Total             _T          
#>  5 ZH        Zurich          _T          Total             _T          
#>  6 ZH        Zurich          _T          Total             _T          
#>  7 ZH        Zurich          _T          Total             _T          
#>  8 ZH        Zurich          _T          Total             _T          
#>  9 ZH        Zurich          _T          Total             _T          
#> 10 ZH        Zurich          _T          Total             _T          
#> # ℹ 80 more rows
#> # ℹ 8 more variables: LEERWOHN_TYP_label <chr>, MEASURE_DIMENSION <chr>,
#> #   MEASURE_DIMENSION_label <chr>, FREQ <chr>, FREQ_label <chr>,
#> #   TIME_PERIOD <chr>, value <dbl>, date <date>
```

Plot the vacancy rate of the three cantons:

``` r

library(ggplot2)

ggplot(rates_all, aes(date, value, color = GR_KT_GDE_label)) +
  geom_line() +
  labs(x = NULL, y = "Vacancy rate (%)", color = NULL)
```

The year with the lowest vacancy rate in each canton:

``` r

rates_all |>
  group_by(GR_KT_GDE) |>
  slice_min(value, n = 1) |>
  select(GR_KT_GDE, TIME_PERIOD, value)
#> # A tibble: 3 × 3
#> # Groups:   GR_KT_GDE [3]
#>   GR_KT_GDE TIME_PERIOD value
#>   <chr>     <chr>       <dbl>
#> 1 BE        2004         0.99
#> 2 GE        2004         0.15
#> 3 ZH        2003         0.35
```

## In a data pipeline

A dataset can have several versions. A new version can change the
dimensions, and your code can stop working. By default, the API uses the
latest version. To always get the same structure, set `version`:

``` r

bfs_sse_data("DF_LWZ_1", filters = filters, version = "1.1.0")
```

[`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md)
lists the versions of each dataset. On stats.swiss, the version is in
the URL of the query, e.g. `1.1.0` in `CH1.LWZ,DF_LWZ_1,1.1.0`.

Each type of error has its own class, so you can handle it in your code:

- `bfs_no_records`: there is no data for your query.
- `bfs_sse_filter_error`: there is a problem with the filters.
- `bfs_sse_argument_error`: there is a problem with another argument.
- `bfs_sse_dataset_error`: the dataset or the version does not exist.
- `bfs_sse_query_error`: the API does not accept your query, e.g. a
  period in a wrong format or too many codes in the filters. The error
  gives the message of the API.
- `bfs_http_error`: the API is not available (see [API errors and rate
  limits](https://felixluginbuhl.com/BFS/articles/troubleshooting.md)).

## Moving from `bfs_get_sse_data()`

[`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md)
and
[`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md)
are the old functions. They are deprecated: they still work the same
way, so your code does not break, but they give a warning. To learn why
there are new functions and how to change your code, see [Moving to the
new Swiss Stats Explorer
functions](https://felixluginbuhl.com/BFS/articles/sse-migration.md).
