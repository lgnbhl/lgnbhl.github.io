# Tables and files

Many statistics are not in an API. The BFS publishes them as files:
Excel or CSV tables, PX files, PDFs, zip files, and more. You find them
in the [BFS
catalog](https://www.bfs.admin.ch/bfs/en/home/statistics/catalogue.html)
with the article type “Tables”. Each file has an asset number. You also
see this number at the end of the “assetdetail” URLs of the BFS website.

In this article, we search a table about students and download it.

``` r

library(BFS)
library(dplyr)
```

## Search the tables

[`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)
works like
[`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md),
with the same arguments (see [Data catalog and PXWeb
datasets](https://felixluginbuhl.com/BFS/articles/pxweb.md)).

``` r

tables <- bfs_get_catalog_tables(language = "en", extended_search = "students")
tables
#> # A tibble: 6 × 5
#>   title                          language number_asset publication_date order_nr
#>   <chr>                          <chr>    <chr>        <date>           <chr>   
#> 1 Students at universities and … en       36460671     2026-03-24       ts-x-15…
#> 2 Students at universities and … en       36460677     2026-03-24       su-e-15…
#> 3 Students at universities of a… en       36460666     2026-03-24       ts-x-15…
#> 4 Students at universities of a… en       36460675     2026-03-24       su-e-15…
#> 5 Students at universities of t… en       36460673     2026-03-24       su-e-15…
#> 6 Students at universities of a… en       7746958      2019-03-27       su-e-15…
```

## Download a file

``` r

asset <- tables |>
  filter(title == "Students at universities and institutes of technology: Basistables") |>
  pull(number_asset)

bfs_download_asset(number_asset = asset, destfile = "students.xlsx")

readxl::read_excel("students.xlsx")
```

[`bfs_download_asset()`](https://felixluginbuhl.com/BFS/reference/bfs_download_asset.md)
also accepts a BFS number. If a PXWeb dataset is too big for the API,
download its PX file and read it with the pxR package:

``` r

bfs_download_asset(number_bfs = "px-x-1502040100_131", destfile = "students.px")

students <- pxR::read.px("students.px") |>
  as.data.frame()
```

The PX file is in German only.

## Metadata of a file

[`bfs_get_asset_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_asset_metadata.md)
gives the metadata of a file as a nested list: the title, the
description, the publication date, the contact, the links, and more.

``` r

metadata <- bfs_get_asset_metadata(number_bfs = "px-x-1502040100_131", language = "en")
names(metadata)
#> [1] "ids"         "bfs"         "description" "shop"        "seo"        
#> [6] "links"       "_embedded"
metadata$description$titles$main
#> [1] "University students by year, ISCED field, sex and level of study"
```
