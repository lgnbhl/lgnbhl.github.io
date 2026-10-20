# Package index

## Swiss Stats Explorer

The Swiss Stats Explorer (<https://stats.swiss/>) is the newer data API
of the BFS, based on the SDMX standard.

- [`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md)
  : List the datasets of the Swiss Stats Explorer
- [`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md)
  : Get the dimensions of a Swiss Stats Explorer dataset
- [`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md)
  : Get data from the Swiss Stats Explorer

## Swiss Stats Explorer (deprecated)

Deprecated since BFS 0.8.0, and kept unchanged for the code using them.
Use the functions above, see the article “Moving to the new Swiss Stats
Explorer functions”.

- [`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md)
  **\[deprecated\]** : Get the codelists of a Swiss Stats Explorer
  dataset (deprecated)
- [`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md)
  **\[deprecated\]** : Get data from the Swiss Stats Explorer
  (deprecated)

## Data catalog and PXWeb datasets

Search the BFS data catalog, then download a dataset from the PXWeb API
with its BFS number.

- [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)
  : Search the BFS data catalog
- [`bfs_get_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_metadata.md)
  : Get the variables of a BFS dataset
- [`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)
  : Get a BFS dataset
- [`bfs_get_data_comments()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data_comments.md)
  : Get the comments of a BFS dataset

## Tables and files

Search the BFS tables catalog and download any BFS file (Excel, CSV, PX,
…) from the DAM API.

- [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)
  : Search the BFS tables catalog
- [`bfs_get_asset_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_asset_metadata.md)
  : Get the metadata of a BFS file
- [`bfs_download_asset()`](https://felixluginbuhl.com/BFS/reference/bfs_download_asset.md)
  : Download a BFS file

## Geodata and base maps

Geodata of the Swiss geo-portal (STAC API) and the cartographic base
maps of the BFS ThemaKart project.

- [`bfs_get_catalog_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_geodata.md)
  : Get the geodata catalog of the Swiss Confederation
- [`bfs_download_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_download_geodata.md)
  : Download geodata from the Swiss geo-portal
- [`bfs_get_base_maps()`](https://felixluginbuhl.com/BFS/reference/bfs_get_base_maps.md)
  : Get the Swiss base maps
- [`bfs_clear_cache()`](https://felixluginbuhl.com/BFS/reference/bfs_clear_cache.md)
  : Clear the BFS cache

## Swiss official commune register

The register of the Swiss communes, districts and cantons on 1 January
2023, included in the package.

- [`register_bzn`](https://felixluginbuhl.com/BFS/reference/register_bzn.md)
  : Swiss official commune register: districts
- [`register_dic`](https://felixluginbuhl.com/BFS/reference/register_dic.md)
  : Swiss official commune register: dictionary
- [`register_gde`](https://felixluginbuhl.com/BFS/reference/register_gde.md)
  : Swiss official commune register: communes
- [`register_gde_other`](https://felixluginbuhl.com/BFS/reference/register_gde_other.md)
  : Swiss official commune register: areas without a commune
- [`register_kt`](https://felixluginbuhl.com/BFS/reference/register_kt.md)
  : Swiss official commune register: cantons
- [`register_kt_seeanteile`](https://felixluginbuhl.com/BFS/reference/register_kt_seeanteile.md)
  : Swiss official commune register: cantonal shares of lakes

## Deprecated

- [`bfs_get_catalog()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog.md)
  : Get the BFS data or tables catalog (deprecated)
