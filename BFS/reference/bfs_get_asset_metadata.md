# Get asset metadata in a given language

This function uses the DAM API
<https://dam-api.bfs.admin.ch/hub/swagger-ui/index.html> to get the
metadata of a BFS file by asset number or BFS number in a given
language.

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

  The asset number of a dataset

- number_bfs:

  The BFS number of a dataset.

- language:

  character The language of a BFS catalog, i.e. "de", "fr", "it" or
  "en".

## Value

list Returns a list containing asset metadata information. Returns NULL
if no connection.

## See also

\[bfs_download_asset()\]
