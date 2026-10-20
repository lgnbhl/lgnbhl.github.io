# Search the BFS tables catalog

Search the tables of the BFS catalog
(<https://www.bfs.admin.ch/bfs/en/home/statistics/catalogue.html>,
article type "Tables"). Tables are mostly Excel or CSV files, not
available in the PXWeb API: download them with
[`bfs_download_asset()`](https://felixluginbuhl.com/BFS/reference/bfs_download_asset.md).

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

  Language of the catalog: `"de"` (default), `"fr"`, `"it"` or `"en"`.

- title:

  Text to search in the titles.

- extended_search:

  Text to search in the titles, BFS number and summaries.

- spatial_division:

  Spatial division of the datasets: `"Switzerland"`, `"Cantons"`,
  `"Districts"`, `"Communes"`, `"Other spatial divisions"` or
  `"International"`.

- prodima:

  Theme number(s) of the BFS, e.g. `900212` for "Education and science".
  See the "Data catalog and PXWeb datasets" article for the list.

- inquiry:

  Inquiry (survey) id.

- institution:

  Institution id.

- publishing_year_start, publishing_year_end:

  First and last publishing year.

- order_nr:

  BFS number, e.g. `"px-x-1502040100_131"`.

- limit:

  Maximum number of results (1000 by default). A message tells you when
  the catalog has as many results as `limit`.

- article_model, article_model_group:

  Article type ids of the DAM API. The defaults select the "Data" (or
  "Tables") article type; you don't need to change them.

- return_raw:

  If `TRUE`, return the catalog as returned by the API, with all its
  metadata in nested data frames.

## Value

A tibble with the columns:

- title:

  Title of the table.

- language:

  Language of the catalog.

- number_asset:

  Asset number, to use in
  [`bfs_download_asset()`](https://felixluginbuhl.com/BFS/reference/bfs_download_asset.md).

- publication_date:

  Publication date.

- order_nr:

  BFS number.

Returns `NULL` if there is no internet connection.

## Details

The English and Italian catalogs have fewer tables than the German and
French ones. Arguments accept several values, e.g.
`prodima = c(900210, 900212)`.

## See also

[`bfs_download_asset()`](https://felixluginbuhl.com/BFS/reference/bfs_download_asset.md),
[`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)

## Examples

``` r
if (FALSE) { # interactive()
tables <- bfs_get_catalog_tables(language = "en", extended_search = "students")
tables

# download the first table
bfs_download_asset(
  number_asset = tables$number_asset[1],
  destfile = file.path(tempdir(), "table.xlsx")
)
}
```
