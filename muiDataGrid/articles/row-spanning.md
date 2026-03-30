# Row Spanning

``` r

library(muiDataGrid)
library(dplyr)
#> 
#> Attaching package: 'dplyr'
#> The following objects are masked from 'package:stats':
#> 
#>     filter, lag
#> The following objects are masked from 'package:base':
#> 
#>     intersect, setdiff, setequal, union
```

## Row Spanning

Row spanning allows cells to merge vertically across multiple rows when
they contain identical consecutive values. This feature is useful for
creating hierarchical or grouped displays.

### Basic Row Spanning

#### Enabling Row Spanning

Enable row spanning with the `rowSpanning` prop

``` r

# Group characters by species
sw_grouped <- starwars |>
  select(name, species, homeworld, height) |>
  filter(!is.na(species), species %in% c("Human", "Droid")) |>
  arrange(species, homeworld) |>
  head(12) |>
  mutate(id = row_number())

DataGrid(
  rows = sw_grouped,
  rowSpanning = TRUE
)
```

#### With custom grouping display

``` r

# Add group summary
sw_with_summary <- sw_grouped |>
  group_by(species) |>
  mutate(
    species_count = n(),
    species_label = paste0(species, " (", species_count, ")")
  ) |>
  ungroup()

columns_summary <- list(
  list(
    field = "species_label",
    headerName = "Species",
    width = 150
  ),
  list(field = "name", headerName = "Name", width = 150),
  list(field = "homeworld", headerName = "Homeworld", width = 120),
  list(field = "height", headerName = "Height", width = 100)
)

DataGrid(
  rows = sw_with_summary,
  columns = columns_summary,
  rowSpanning = TRUE
)
```
