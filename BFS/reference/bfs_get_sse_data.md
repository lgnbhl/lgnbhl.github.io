# Get Data from Swiss Stats Explorer (SSE) API

Get Data from Swiss Stats Explorer (SSE) API

## Usage

``` r
bfs_get_sse_data(
  number_bfs,
  language = "de",
  start_period = NULL,
  end_period = NULL,
  query = NULL,
  column_name_type = "code",
  variable_value_type = "text",
  clean_names = FALSE
)
```

## Arguments

- number_bfs:

  The BFS number (FSO number) of a dataset.

- language:

  Language of the dataset to be translated if exists, i.e. "de", "fr",
  "it" or "en".

- start_period:

  Start year of the requested data

- end_period:

  End year of the requested data

- query:

  A named list with dimension codes as names and desired values as
  values.

- column_name_type:

  Column name type as "text" or as "code".

- variable_value_type:

  Variable value type as "text" or as "code".

- clean_names:

  Logical, if TRUE, the column names are cleaned using
  janitor::clean_names().

## Value

A tibble with the requested data.

## Examples

``` r
bfs_get_sse_data(
  number_bfs = "DF_PASTA_552_MONTHLY", 
  language = "en", 
  query =  list("FREQ" = "M", "ACCOMMODATION_TYPE" = c("552001"), 
                "COUNTRY_ORIGIN" = c("CH", "AUSL")),
  start_period = "2020",
  end_period = "2023"
  )
#> # A tibble: 480 × 7
#>    TIME_PERIOD FREQ    ACCOMMODATION_TYPE               INDICATOR COUNTRY_ORIGIN
#>    <chr>       <chr>   <chr>                            <chr>     <chr>         
#>  1 2020-01     Monthly Holiday apartments, holiday hom… Arrivals  Switzerland   
#>  2 2020-02     Monthly Holiday apartments, holiday hom… Arrivals  Switzerland   
#>  3 2020-03     Monthly Holiday apartments, holiday hom… Arrivals  Switzerland   
#>  4 2020-04     Monthly Holiday apartments, holiday hom… Arrivals  Switzerland   
#>  5 2020-05     Monthly Holiday apartments, holiday hom… Arrivals  Switzerland   
#>  6 2020-06     Monthly Holiday apartments, holiday hom… Arrivals  Switzerland   
#>  7 2020-07     Monthly Holiday apartments, holiday hom… Arrivals  Switzerland   
#>  8 2020-08     Monthly Holiday apartments, holiday hom… Arrivals  Switzerland   
#>  9 2020-09     Monthly Holiday apartments, holiday hom… Arrivals  Switzerland   
#> 10 2020-10     Monthly Holiday apartments, holiday hom… Arrivals  Switzerland   
#> # ℹ 470 more rows
#> # ℹ 2 more variables: STATISTICAL_OPERATION <chr>, value <dbl>
```
