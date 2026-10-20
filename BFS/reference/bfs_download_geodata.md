# Download geodata from the Swiss geo-portal

Download the files of a geodata collection from the STAC API of the
Swiss geo-portal (<https://data.geo.admin.ch/api/stac/v0.9/>). Requires
the rstac package.

## Usage

``` r
bfs_download_geodata(
  collection_id,
  output_dir = tempdir(),
  overwrite = FALSE,
  create_json = FALSE,
  bbox = NULL,
  asset_names = NULL,
  datetime = NULL,
  feature_id = NULL
)
```

## Arguments

- collection_id:

  The collection id, i.e. the `collection_id` column of
  [`bfs_get_catalog_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_geodata.md),
  e.g. `"ch.bfs.generalisierte-grenzen_agglomerationen_g1"`.

- output_dir:

  Folder of the downloaded files, a temporary folder by default.

- overwrite:

  If `TRUE`, overwrite existing files.

- create_json:

  If `TRUE`, also save the STAC items as a JSON file.

- bbox, datetime, feature_id:

  Optional filters of the items: bounding box, date-time or interval,
  and item id. See
  [`rstac::items()`](https://brazil-data-cube.github.io/rstac/reference/items.html).

- asset_names:

  Optional names of the assets to download. See
  [`rstac::assets_download()`](https://brazil-data-cube.github.io/rstac/reference/assets_functions.html).

## Value

The paths of the downloaded files. Zip files are not extracted. Returns
`NULL` if there is no internet connection.

## Details

The use of the data is free but subject to the terms of use of the Swiss
geo-portal (<https://www.geo.admin.ch/terms-of-use>).

## See also

[`bfs_get_catalog_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_geodata.md)

## Examples

``` r
if (FALSE) { # interactive()
files <- bfs_download_geodata(
  collection_id = "ch.bfs.generalisierte-grenzen_agglomerationen_g1"
)
files
}
```
