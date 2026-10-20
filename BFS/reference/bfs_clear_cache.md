# Clear the BFS cache

Delete the base maps cached by
[`bfs_get_base_maps()`](https://felixluginbuhl.com/BFS/reference/bfs_get_base_maps.md)
in `tools::R_user_dir(package = "BFS")` and the list of Swiss Stats
Explorer datasets cached for the R session by
[`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md)
and
[`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md).
The cached data is downloaded again when needed. In a long-running R
session, e.g. a Shiny app, call it so that these two functions use the
new version of a dataset.
[`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md),
[`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md)
and
[`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md)
don't cache anything.

## Usage

``` r
bfs_clear_cache()
```

## Value

Invisibly, the path of the deleted cache folder.

## Examples

``` r
if (FALSE) { # interactive()
bfs_clear_cache()
}
```
