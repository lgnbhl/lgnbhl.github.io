# Get Switzerland base maps data

This functions helps to get base maps data from the ThemaKart project as
an sf object. The geom names and the general structure of the files can
be found in the offical BFS documentation, see
<https://www.bfs.admin.ch/bfs/en/home/statistics/regional-statistics/base-maps/cartographic-bases.html>.
When using this data, please read the condition of use and copyright
mentions.

## Usage

``` r
bfs_get_base_maps(
  geom = NULL,
  category = "gf",
  type = "Poly",
  date = NULL,
  most_recent = TRUE,
  format = "shp",
  asset_number = "30566934",
  return_sf = TRUE
)
```

## Arguments

- geom:

  Geometry such as "suis", "kant", "bezk", "polg", "voge", etc.

- category:

  Category such as 'total_area' ("gf" for "Gesamtflaeche") or
  'vegetation_area' ("vf" for "Vegetationsflaeche").

- type:

  The type of data, i.e. "Poly" or "Pnts".

- date:

  Date (yyyymmdd) of reference / validity. If not specified, the
  \`most_recent\` argument is used.

- most_recent:

  Get the most recent by sorting the files in decreasing order, if FALSE
  then read the first file available.

- format:

  Format of the file, by default SHP format.

- asset_number:

  Asset number of the base maps zip file.

- return_sf:

  if TRUE, read file path and return sf object. If FALSE, return file
  path

## Value

sf object with geometries. Returns NULL if no connection.

## Details

If you want to get ThemaKart data from previous years, you can change
the \`asset_number\` for the related zip file. For example, for the map
set of year 2020, the asset number is "11927607".

This function is caching the base map data using
\`tools::R_user_dir(package = "BFS")\`.
