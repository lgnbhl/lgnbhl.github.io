# Get started

BFS gives you the open data of the [Swiss Federal Statistical
Office](https://www.bfs.admin.ch/bfs/en/home/statistics/catalogue.html)
(BFS, *Bundesamt für Statistik*) in R. You get tidy data frames, in
German, French, Italian or English.

On this page, you learn:

- which API to use for which data,
- why the BFS is moving its data to a new platform,
- how to make a first download.

## Which API for which data

The BFS publishes its data with four APIs. The package has functions for
each of them:

| You want | Use | API |
|----|----|----|
| Statistics of the Swiss Stats Explorer | [`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md), [`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md), [`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md) | [Swiss Stats Explorer](https://stats.swiss/) (SDMX) |
| Datasets of the BFS data catalog | [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md), [`bfs_get_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_metadata.md), [`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md) | [STAT-TAB](https://www.pxweb.bfs.admin.ch/pxweb/en/) (PXWeb) |
| Tables and files (Excel, CSV, PX, …) | [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md), [`bfs_download_asset()`](https://felixluginbuhl.com/BFS/reference/bfs_download_asset.md) | DAM |
| Maps and geodata | [`bfs_get_base_maps()`](https://felixluginbuhl.com/BFS/reference/bfs_get_base_maps.md), [`bfs_get_catalog_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_geodata.md), [`bfs_download_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_download_geodata.md) | ThemaKart, STAC |

- The **Swiss Stats Explorer** (SSE) is the new data platform of the
  BFS. Each dataset has an id, for example `DF_LWZ_1`.
- **STAT-TAB** is the old platform. Each dataset (data cube) has a BFS
  number, for example `px-x-1502040100_131`.
- The **DAM** API gives you all the files of the BFS, for example the
  Excel tables of the website.
- The **geodata** come from the Swiss geo-portal and from the base maps
  of the BFS.

## From STAT-TAB to the Swiss Stats Explorer

The BFS is replacing STAT-TAB with the Swiss Stats Explorer. It moves
its data cubes to the new platform, one statistic at a time. Then it
will switch off STAT-TAB. The [BFS
announcement](https://www.bfs.admin.ch/bfs/en/home/services/research/stat-tab-online-data-search.html)
gives the dates.

What this means for your code:

- [`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md),
  [`bfs_get_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_metadata.md)
  and
  [`bfs_get_data_comments()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data_comments.md)
  use STAT-TAB. They will stop working when STAT-TAB is switched off.
- During the move, a statistic can be on STAT-TAB only, on both
  platforms, or on the Swiss Stats Explorer only.
- If a BFS number does not work anymore, search the statistic by its
  name on [stats.swiss](https://stats.swiss/).
- The functions for tables, files and geodata do not change.

For new code, use the Swiss Stats Explorer if the statistic is there.
Use STAT-TAB only for the data that is not there yet.

## A first download

``` r

library(BFS)
```

### Swiss Stats Explorer

Let’s get the vacancy rate (the share of empty homes, in %) of the
cantons of Geneva, Zurich and Bern. The dataset is `DF_LWZ_1`, the
vacant dwellings. You find this id with
[`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md),
or in the URL of the dataset on [stats.swiss](https://stats.swiss/).

First, see the dimensions of the dataset and the codes of their values:

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

Then download the data. In `filters`, give the codes you want for each
dimension:

``` r

bfs_sse_data(
  "DF_LWZ_1",
  filters = list(
    GR_KT_GDE = c("GE", "ZH", "BE"), # the cantons of Geneva, Zurich and Bern
    WOHN_ANZAHL = "_T",              # all numbers of rooms
    LEERWOHN_TYP = "_T",             # all types of vacant dwellings
    MEASURE_DIMENSION = "RATE"       # the vacancy rate, in %
  ),
  start_period = "2020",
  language = "en"
)
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

The article [Swiss Stats
Explorer](https://felixluginbuhl.com/BFS/articles/swiss-stats-explorer.html)
explains each step of this example.

### STAT-TAB

Search the BFS data catalog. Then download a dataset with its BFS
number:

``` r

bfs_get_catalog_data(language = "en", extended_search = "university students")
#> # A tibble: 4 × 6
#>   title                 language number_bfs number_asset publication_date url_px
#>   <chr>                 <chr>    <chr>      <chr>        <date>           <chr> 
#> 1 University of applie… en       px-x-1502… 36454608     2026-03-24       https…
#> 2 University of applie… en       px-x-1502… 36454606     2026-03-24       https…
#> 3 University students … en       px-x-1502… 36454426     2026-03-24       https…
#> 4 University students … en       px-x-1502… 36454424     2026-03-24       https…

bfs_get_data(number_bfs = "px-x-1502040100_131", language = "en")
#> # A tibble: 19,320 × 5
#>    Year    `ISCED Field`     Sex    `Level of study`       `University students`
#>    <chr>   <chr>             <chr>  <chr>                                  <dbl>
#>  1 1980/81 Education science Male   First university degr…                   545
#>  2 1980/81 Education science Male   Bachelor                                   0
#>  3 1980/81 Education science Male   Master                                     0
#>  4 1980/81 Education science Male   Doctorate                                 93
#>  5 1980/81 Education science Male   Further education, ad…                    13
#>  6 1980/81 Education science Female First university degr…                   946
#>  7 1980/81 Education science Female Bachelor                                   0
#>  8 1980/81 Education science Female Master                                     0
#>  9 1980/81 Education science Female Doctorate                                 70
#> 10 1980/81 Education science Female Further education, ad…                    52
#> # ℹ 19,310 more rows
```

The article [Data catalog and PXWeb
datasets](https://felixluginbuhl.com/BFS/articles/pxweb.html) shows how
to search the catalog and download only a part of a dataset.

## Next steps

- [Swiss Stats
  Explorer](https://felixluginbuhl.com/BFS/articles/swiss-stats-explorer.html):
  find a dataset, choose the data and download it, step by step.
- [Data catalog and PXWeb
  datasets](https://felixluginbuhl.com/BFS/articles/pxweb.html): search
  the catalog and download all or part of a dataset.
- [Tables and
  files](https://felixluginbuhl.com/BFS/articles/tables-and-files.html):
  download any BFS file.
- [Geodata and base
  maps](https://felixluginbuhl.com/BFS/articles/geodata.html): maps of
  Switzerland and geodata of the Swiss geo-portal.
- [API errors and rate
  limits](https://felixluginbuhl.com/BFS/articles/troubleshooting.html):
  what to do when an API is not available.
