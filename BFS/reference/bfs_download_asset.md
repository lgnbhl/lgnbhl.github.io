# Download a BFS asset file

This function uses the DAM API
<https://dam-api.bfs.admin.ch/hub/swagger-ui/index.html> to download a
BFS file by asset number or BFS number. The file is downloaded using
\`curl::curl_download()\` under the hood.

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

  The asset number of a dataset

- number_bfs:

  The BFS number of a dataset.

- destfile:

  A character string with the name where the downloaded file is saved.
  Tilde-expansion is performed.

- quiet:

  If TRUE, suppress status messages (if any), and the progress bar.

- mode:

  A character string specifying the mode with which to write the file.
  Useful values are "w", "wb" (binary), "a" (append) and "ab".

- handle:

  a curl handle object

## Value

Returns the file path where the file has been downloaded. Returns NULL
if no connection.
