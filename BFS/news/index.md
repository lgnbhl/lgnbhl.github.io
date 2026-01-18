# Changelog

## BFS 0.7.0

CRAN release: 2025-11-03

- Add new functions to access the data and metadata of the new Swiss
  Stats Explorer API.

## BFS 0.5.2

CRAN release: 2023-08-11

- remove “rstac” and “sf” R package dependencies to make the package
  lighter and easier to install. When using the functions
  [`bfs_download_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_download_geodata.md)
  and
  [`bfs_get_base_maps()`](https://felixluginbuhl.com/BFS/reference/bfs_get_base_maps.md),
  the user will be asked to install “rstac” and “sf” if they are not
  installed locally. Tests using these dependencies are skipped in CRAN
  and CI.
- removing
  [`bfs_download_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_download_geodata.md)
  automated tests will reduce API calls on “data.geo.admin.ch” server.

## BFS 0.5.13

CRAN release: 2025-04-29

- fix CRAN NOTE: remove native pipes for older R version compatibility.

## BFS 0.5.12

CRAN release: 2024-12-09

- improve
  [`bfs_get_base_maps()`](https://felixluginbuhl.com/BFS/reference/bfs_get_base_maps.md)
  with new `return_sf` argument, which allows to return all file path
  available (see README).
- improve README related to
  [`bfs_get_base_maps()`](https://felixluginbuhl.com/BFS/reference/bfs_get_base_maps.md)

## BFS 0.5.11

CRAN release: 2024-11-27

- BREAKING CHANGE: column `orderNr` returned by
  [`bfs_get_catalog()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog.md)
  renamed as `number_bfs` for more clarity. Unnecessary new variables
  also removed in profit of the `return_raw` argument.
- add `return_raw` in
  [`bfs_get_catalog()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog.md)
  and `bfs_get_tables()`, which returns all metadata in an raw /
  unstructured tibble.
- update to last available BFS geodata asset imported using
  [`bfs_get_base_maps()`](https://felixluginbuhl.com/BFS/reference/bfs_get_base_maps.md)
  - <https://www.bfs.admin.ch/bfs/en/home/statistics/catalogues-databases.assetdetail.30606132.html>
- Use new **swissMunicipalities** R package to ease geodata analysis

## BFS 0.5.10

CRAN release: 2024-09-27

- fix bug in metadata extraction in
  [`bfs_get_catalog()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog.md),
  [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)
  and
  [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)

## BFS 0.5.9

CRAN release: 2024-09-26

- fix
  [`bfs_get_catalog()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog.md),
  [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)
  and
  [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)

## BFS 0.5.8

CRAN release: 2024-02-23

- All functions return NULL if no internet connection.
- Tests skipped if no internet connection.

## BFS 0.5.6

CRAN release: 2024-01-08

- add “delay” argument in
  [`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)
  and
  [`bfs_get_data_comments()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data_comments.md)
  - using [`Sys.sleep()`](https://rdrr.io/r/base/Sys.sleep.html) of 10
    seconds to avoid reaching API limits
  - the “delay” arg allows to loop on large datasets, for example see
    [\#7](https://github.com/lgnbhl/BFS/issues/7)
- BREAKING CHANGE: remove “bfs_url” argument in
  [`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)
  and
  [`bfs_get_data_comments()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data_comments.md)
  - “bfs_url” argument unstable and slow. See README for recommended
    workflow using
    [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)
    and
    [`bfs_get_asset_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_asset_metadata.md)
- add deprecation warning for
  [`bfs_get_catalog()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog.md)
- add more tests
- add test coverage

## BFS 0.5.5

CRAN release: 2023-09-20

- fix encoding bug in
  [`bfs_get_base_maps()`](https://felixluginbuhl.com/BFS/reference/bfs_get_base_maps.md)
  [\#12](https://github.com/lgnbhl/BFS/issues/12)
- add fs R package dependency
- add unit tests
- remove unnecessary messages when calling `bfs_get_catalog_*()`
- use tools instead of rappdirs
- improve docs related to query dimensions

## BFS 0.5.4

CRAN release: 2023-09-13

- using only magrittr pipe to allow older R versions, fix
  [\#11](https://github.com/lgnbhl/BFS/issues/11)

## BFS 0.5.3

CRAN release: 2023-08-18

- add
  [`bfs_get_base_maps()`](https://felixluginbuhl.com/BFS/reference/bfs_get_base_maps.md).
- add data from the Swiss official commune register.
- update README.

## BFS 0.5.2

CRAN release: 2023-08-11

- BREAKING CHANGE:
  [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)
  and
  [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)
  return now in the dataframe “number_asset” instead of “guid” as
  variables.
- add
  [`bfs_download_asset()`](https://felixluginbuhl.com/BFS/reference/bfs_download_asset.md)
- add
  [`bfs_get_asset_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_asset_metadata.md)
- “number_bfs” as first argument in
  [`bfs_get_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_metadata.md)
- improve docs

## BFS 0.5.1

CRAN release: 2023-06-08

- BREAKING CHANGE: fix BFS version 0.5 broke
  [`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md).
  Fix now [\#10](https://github.com/lgnbhl/BFS/issues/10) by removing
  “all” default argument to `query`.

## BFS 0.5

CRAN release: 2023-06-08

- fix bug [\#10](https://github.com/lgnbhl/BFS/issues/10)
- add
  [`bfs_get_catalog_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_geodata.md)
- add
  [`bfs_download_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_download_geodata.md)
- improve docs

## BFS 0.4.8

CRAN release: 2023-05-31

- BREAKING CHANGE: reorder arguments in functions for consistency
- [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)
  now gets full catalog, fixing
  [\#5](https://github.com/lgnbhl/BFS/issues/5)
- [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)
  has new functions to filter datasets directly
- use “httr2” instead of “jsonlite” for better console messages
- improve README, docs and sticker.

## BFS 0.4.7

CRAN release: 2023-05-19

- add new function
  [`bfs_get_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_metadata.md)
- fix bug duplicated column names with
  `as_tibble(. .name_repair = "minimal")`

## BFS 0.4.5

CRAN release: 2023-02-27

- Fix bug in
  [`bfs_get_data_comments()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data_comments.md)
  [\#8](https://github.com/lgnbhl/BFS/issues/8).
- improve README by adding info about dependencies.

## BFS 0.4.4

CRAN release: 2022-12-14

- Fix bug using `query` argument in
  [`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)
- remove depreciated function
  [`bfs_get_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_metadata.md)
  and `bfs_get_dataset()`

## BFS 0.4.3

CRAN release: 2022-09-07

- Fixed
  [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)
  and
  [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)
  bug [\#6](https://github.com/lgnbhl/BFS/issues/6).
- tidyRSS GitHub dependency version is 2.0.5.
- Add tests for `bfs_get_catalog_*` functions.

## BFS 0.4.2

- Fixed
  [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md)
  and
  [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md)
  bug [\#6](https://github.com/lgnbhl/BFS/issues/6).
- tidyRSS dependency version is 2.0.4.
- Improved README.

## BFS 0.4.1

CRAN release: 2021-10-09

- BREAKING CHANGE: `clean_names` of
  [`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)
  is now FALSE by default.
- [`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)
  uses BFS API v1.
- [`bfs_get_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_metadata.md)
  deprecated. Please use only
  [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md).
- add
  [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md).
- add
  [`bfs_get_catalog()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog.md).
- pxweb and jsonlite dependency added. dplyr dependency removed.

## BFS 0.3.1

CRAN release: 2021-05-10

- fix issue [\#3](https://github.com/lgnbhl/BFS/issues/3) with pull
  request [\#1](https://github.com/lgnbhl/BFS/issues/1)

## BFS 0.3.0

CRAN release: 2021-03-23

- fix critical bug in `bfs_get_dataset()`
- add new function
  [`bfs_get_catalog()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog.md)

## BFS 0.2.6

- Added a `NEWS.md` file to track changes to the package.
- Added
  [`bfs_get_catalog()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog.md)
  function, that scraps the RSS feed
