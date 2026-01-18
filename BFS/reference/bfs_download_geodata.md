# Download a geographic file from the Swiss geo-portal

Download assets from the STAC API on the geodata catalog of the Swiss
Confederation (<https://data.geo.admin.ch/api/stac/v0.9/>).

## Usage

``` r
bfs_download_geodata(
  collection_id = collection_id,
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

  collection_id

- output_dir:

  output_dir

- overwrite:

  overwrite

- create_json:

  create_json

- bbox:

  bbox

- asset_names:

  asset_names

- datetime:

  datetime

- feature_id:

  feature_id

## Value

Returns the file path where the file has been downloaded. Returns NULL
if no connection.

## Details

The use of the data and services is free but subject to the provisions
on fair use (see <https://www.geo.admin.ch/terms-of-use>).
