# Download a BFS file

Download any file of the BFS (Excel, CSV, PX, PDF, zip, ...) from the
DAM API (<https://dam-api.bfs.admin.ch/hub/swagger-ui/index.html>) with
its asset number or its BFS number. Use it for the tables of
[`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md),
or for datasets too large for
[`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md).

## Usage

``` r
bfs_download_asset(
  number_asset = NULL,
  number_bfs = NULL,
  destfile,
  quiet = TRUE,
  mode = "wb",
  handle = curl::new_handle()
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

- destfile:

  Path of the downloaded file.

- quiet:

  If `FALSE`, show the download progress.

- mode, handle:

  Passed to
  [`curl::curl_download()`](https://jeroen.r-universe.dev/curl/reference/curl_download.html).

## Value

The path of the downloaded file. Returns `NULL` if there is no internet
connection.

## See also

[`bfs_get_asset_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_asset_metadata.md),
[`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)

## Examples

``` r
if (FALSE) { # interactive()
# a PX file, read it with pxR::read.px()
bfs_download_asset(
  number_bfs = "px-x-1502040100_131",
  destfile = file.path(tempdir(), "px-x-1502040100_131.px")
)
}
```
