# Get the geodata catalog of the Swiss Confederation

List the geodata collections of the STAC API of the Swiss geo-portal
(<https://data.geo.admin.ch/>), from the BFS and other federal offices.
Download a collection with
[`bfs_download_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_download_geodata.md).

## Usage

``` r
bfs_get_catalog_geodata(include_metadata = TRUE)
```

## Arguments

- include_metadata:

  If `TRUE` (default), add the metadata of each collection (title,
  description, dates, license, ...). This sends one request per
  collection (several hundred), so it takes a few minutes: save the
  result rather than calling it often. If `FALSE`, return only the
  collection ids and URLs.

## Value

A tibble with one row per collection: `collection_id`, `type` and
`href`, and with `include_metadata = TRUE`, `title`, `description`,
`created`, `updated`, `crs`, `license`, `provider_name`, `bbox` and
`inverval`. Returns `NULL` if there is no internet connection.

## See also

[`bfs_download_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_download_geodata.md)

## Examples

``` r
if (FALSE) { # interactive()
catalog_geodata <- bfs_get_catalog_geodata()

# the collections of the BFS
catalog_geodata[grepl("^ch.bfs", catalog_geodata$collection_id), ]
}
```
