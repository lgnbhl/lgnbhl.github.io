# Get the geodata catalog of the Swiss Confederation

Display geo-information catalog of the Swiss Confederation
(<https://data.geo.admin.ch/>), including some geographic datasets
provided by the Swiss Federal Statistical Office. Note that this geodata
catalog is not hosted by the Swiss Federal Statistical Office.

## Usage

``` r
bfs_get_catalog_geodata(include_metadata = TRUE)
```

## Arguments

- include_metadata:

  boolean TRUE to loop on each geodata to add metadata.

## Value

A tbl_df (a type of data frame; see tibble or dplyr packages). Returns
NULL if no connection.

## Details

For now only Stac API datasets are accessible.
