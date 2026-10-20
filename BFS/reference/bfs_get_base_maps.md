# Get the Swiss base maps

Get the cartographic base maps of the BFS ThemaKart project: the borders
of Switzerland, cantons, districts and communes, lakes, rivers, ... The
names of the geometries and files are in the BFS documentation
(<https://www.bfs.admin.ch/bfs/en/home/statistics/regional-statistics/base-maps/cartographic-bases.html>).
Please read its terms of use and copyright notices.

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

  Geometry, e.g. `"suis"` (Switzerland), `"kant"` (cantons), `"bezk"`
  (districts), `"polg"` (communes), `"seen"` (lakes) or `"flus"`
  (rivers).

- category:

  Category: `"gf"` or `"total_area"` (total area, default), `"vf"` or
  `"vegetation_area"` (vegetation area), or another part of the file
  name, e.g. `"11"` for the lakes.

- type:

  `"Poly"` (polygons, default) or `"Pnts"` (points). Use `""` for files
  without type, e.g. the rivers.

- date:

  Optional date of validity, as `"yyyymmdd"`, e.g. `"20230101"`.

- most_recent:

  If `TRUE` (default) and `date` is `NULL`, get the most recent file. If
  `FALSE`, get the first file found.

- format:

  File format, `"shp"` (shapefile) by default.

- asset_number:

  Asset number of the ThemaKart zip file. The default is the 2024
  edition; e.g. `"11927607"` is the 2020 edition.

- return_sf:

  If `TRUE` (default), return an sf object (requires the sf package). If
  `FALSE`, return the path of the file. With `date = ""`, return the
  paths of all the matching files: use it, with `""` for the other
  arguments, to list the available files.

## Value

An sf object, or with `return_sf = FALSE` the file path(s). Returns
`NULL` if there is no internet connection and the base maps are not
cached yet.

## Details

The base maps are a zip file of several hundred files, downloaded once
and cached in `tools::R_user_dir("BFS")`. Use
[`bfs_clear_cache()`](https://felixluginbuhl.com/BFS/reference/bfs_clear_cache.md)
to delete it. Each file name combines the arguments, e.g.
`K4kant20220101gf_ch2007Poly.shp`: geometry `kant`, date `20220101`,
category `gf`, type `Poly`, format `shp`.

## See also

[`bfs_clear_cache()`](https://felixluginbuhl.com/BFS/reference/bfs_clear_cache.md)

## Examples

``` r
if (FALSE) { # interactive()
cantons <- bfs_get_base_maps(geom = "kant")
plot(sf::st_geometry(cantons))

lakes <- bfs_get_base_maps(geom = "seen", category = "11")
rivers <- bfs_get_base_maps(geom = "flus", category = "22", type = "")

# list all river files
bfs_get_base_maps(geom = "flus", category = "", type = "", date = "", return_sf = FALSE)
}
```
