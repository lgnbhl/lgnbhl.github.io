# Get Metadata (Codelists) from Swiss Stats Explorer (SSE) API

Retrieve metadata codelists for a specified BFS dataset from the Swiss
Stats Explorer (SSE) API. This function is required to built queries for
[bfs_get_sse_data](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md).

## Usage

``` r
bfs_get_sse_metadata(number_bfs, language = "de")
```

## Arguments

- number_bfs:

  The BFS number (FSO number) of a dataset.

- language:

  Language of the codelists ("de", "fr", "it", "en").

## Value

A tibble containing the codelists of the specified BFS dataset.

## Examples

``` r
bfs_get_sse_metadata("DF_SSV_POL_LEG", language = "de")
#> # A tibble: 226 × 5
#>    code           text              value valueText           position_dimension
#>    <chr>          <chr>             <chr> <chr>                            <int>
#>  1 SSV_SWISS_CITY CL_SSV_SWISS_CITY _ST   Gesamtwert für Sch…                  1
#>  2 SSV_SWISS_CITY CL_SSV_SWISS_CITY 1024  Gesamtwert für Sch…                  1
#>  3 SSV_SWISS_CITY CL_SSV_SWISS_CITY 1031  Gesamtwert für Sch…                  1
#>  4 SSV_SWISS_CITY CL_SSV_SWISS_CITY 1054  Gesamtwert für Sch…                  1
#>  5 SSV_SWISS_CITY CL_SSV_SWISS_CITY 1058  Gesamtwert für Sch…                  1
#>  6 SSV_SWISS_CITY CL_SSV_SWISS_CITY 1059  Gesamtwert für Sch…                  1
#>  7 SSV_SWISS_CITY CL_SSV_SWISS_CITY 1061  Gesamtwert für Sch…                  1
#>  8 SSV_SWISS_CITY CL_SSV_SWISS_CITY 1103  Gesamtwert für Sch…                  1
#>  9 SSV_SWISS_CITY CL_SSV_SWISS_CITY 1151  Gesamtwert für Sch…                  1
#> 10 SSV_SWISS_CITY CL_SSV_SWISS_CITY 117   Gesamtwert für Sch…                  1
#> # ℹ 216 more rows
```
