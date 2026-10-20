# Get the metadata of a BFS file

Get the metadata of a BFS file from the DAM API
(<https://dam-api.bfs.admin.ch/hub/swagger-ui/index.html>) with its
asset number or its BFS number: title, description, publication date,
contact, links, ...

## Usage

``` r
bfs_get_asset_metadata(
  number_asset = NULL,
  number_bfs = NULL,
  language = c("de", "fr", "it", "en")
)
```

## Arguments

- number_asset:

  The asset number of the file, e.g. `"24025646"`. It is the
  `number_asset` column of
  [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)
  and
  [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md),
  and the number at the end of the "assetdetail" URLs of the BFS
  website.

- number_bfs:

  The BFS number of the file, e.g. `"px-x-1502040100_131"`. Use either
  `number_asset` or `number_bfs`.

- language:

  Language of the metadata: `"de"` (default), `"fr"`, `"it"` or `"en"`.

## Value

A nested list with the metadata. Returns `NULL` if there is no internet
connection.

## See also

[`bfs_download_asset()`](https://felixluginbuhl.com/BFS/reference/bfs_download_asset.md)

## Examples

``` r
if (FALSE) { # interactive()
metadata <- bfs_get_asset_metadata(number_bfs = "px-x-1502040100_131", language = "en")
metadata$description$titles$main
}
```
