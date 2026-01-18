# Get the BFS tables catalog

Get the list of the tables available in the official DAM-API of the
Swiss Federal Statistical Office asset catalog.

## Usage

``` r
bfs_get_catalog_tables(
  language = "de",
  title = NULL,
  extended_search = NULL,
  spatial_division = NULL,
  prodima = NULL,
  inquiry = NULL,
  institution = NULL,
  publishing_year_start = NULL,
  publishing_year_end = NULL,
  order_nr = NULL,
  limit = 1000,
  article_model = 900030,
  article_model_group = 900029,
  return_raw = FALSE
)
```

## Arguments

- language:

  character The language of a BFS catalog, i.e. "de", "fr", "it" or
  "en".

- title:

  character String to search in (sub/super)title

- extended_search:

  character String for an extended search in (sub/super)title, orderNr,
  summary, shortSummary, shortTextGNP

- spatial_division:

  BFS datasets by spatial division, choose between "Switzerland",
  "Cantons", "Districts", "Communes", "Other spatial divisions" or
  "International"

- prodima:

  numeric Get only specific BFS themes using one or multiple prodima
  numbers

- inquiry:

  character BFS datasets for an inquiry

- institution:

  character BFS datasets for an institution

- publishing_year_start:

  character BFS datasets for a publishing year start

- publishing_year_end:

  character BFS datasets for a publishing year end

- order_nr:

  character Filter by BFS Number (FSO number)

- limit:

  integer limit of query results (1000 by default)

- article_model:

  integer articleModel parameter query

- article_model_group:

  integer articleModel parameter query

- return_raw:

  boolean Return raw data from json structure as a tibble data.frame

## Value

A data frame. Returns NULL if no connection.

A tbl_df (a type of data frame; see tibble or dplyr packages). Returns
NULL if no connection.

## See also

[`bfs_get_data`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)

- title:

  A character column with the title of the BFS dataset

- language:

  A character column with the language of the BFS dataset

- publication_date:

  The published date of the BFS dataset in the data catalog

- number_asset:

  The BFS asset number

## Examples

``` r
# \donttest{
bfs_get_catalog_data(language = "en", title = "students", prodima = c(900212))
#> # A tibble: 4 × 6
#>   title                 language number_bfs number_asset publication_date url_px
#>   <chr>                 <chr>    <chr>      <chr>        <date>           <chr> 
#> 1 University of applie… en       px-x-1502… 34248852     2025-03-27       https…
#> 2 University of applie… en       px-x-1502… 34248849     2025-03-27       https…
#> 3 University students … en       px-x-1502… 34248664     2025-03-27       https…
#> 4 University students … en       px-x-1502… 34248666     2025-03-27       https…
# }
```
