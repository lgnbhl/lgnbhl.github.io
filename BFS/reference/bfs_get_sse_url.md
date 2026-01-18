# Get the URL for the Swiss Stats Explorer (SSE) API based on the BFS number

Get the URL for the Swiss Stats Explorer (SSE) API based on the BFS
number

## Usage

``` r
bfs_get_sse_url(number_bfs, metadata = FALSE)
```

## Arguments

- number_bfs:

  The BFS number (FSO number) of a dataset.

- metadata:

  Logical; if TRUE, returns the URL for metadata instead of data.

## Value

A character string containing the URL for the API of the specified BFS
number.
