# BFS: Get Data from the Swiss Federal Statistical Office

Search and download data from the Swiss Federal Statistical Office (BFS)
APIs <https://www.bfs.admin.ch/>.

## Details

The BFS package downloads the open data of the Swiss Federal Statistical
Office (BFS, *Bundesamt für Statistik*) from its APIs:

- **Swiss Stats Explorer**:
  [`bfs_sse_datasets()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_datasets.md),
  [`bfs_sse_dimensions()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_dimensions.md)
  and
  [`bfs_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_sse_data.md).
  They replace the deprecated
  [`bfs_get_sse_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_metadata.md)
  and
  [`bfs_get_sse_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_sse_data.md).

- **Data catalog and PXWeb datasets**:
  [`bfs_get_catalog_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_data.md),
  [`bfs_get_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_metadata.md),
  [`bfs_get_data()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data.md)
  and
  [`bfs_get_data_comments()`](https://felixluginbuhl.com/BFS/reference/bfs_get_data_comments.md).

- **Tables and files**:
  [`bfs_get_catalog_tables()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_tables.md),
  [`bfs_get_asset_metadata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_asset_metadata.md)
  and
  [`bfs_download_asset()`](https://felixluginbuhl.com/BFS/reference/bfs_download_asset.md).

- **Geodata and base maps**:
  [`bfs_get_catalog_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_get_catalog_geodata.md),
  [`bfs_download_geodata()`](https://felixluginbuhl.com/BFS/reference/bfs_download_geodata.md)
  and
  [`bfs_get_base_maps()`](https://felixluginbuhl.com/BFS/reference/bfs_get_base_maps.md).

The BFS is replacing STAT-TAB, and its PXWeb API, with the Swiss Stats
Explorer.

If an API is not available (e.g. too many requests, timeout or server
error), the functions give an error of class `bfs_http_error`. Without
internet connection, they give a message and return `NULL`.

The package is not affiliated with the BFS.

## See also

Useful links:

- <https://felixluginbuhl.com/BFS/>

- <https://github.com/lgnbhl/BFS/>

- Report bugs at <https://github.com/lgnbhl/BFS/issues>

## Author

**Maintainer**: Felix Luginbuhl <felix.luginbuhl@protonmail.ch>
([ORCID](https://orcid.org/0009-0008-6625-2899)) \[copyright holder\]

Other contributors:

- Marius Hodel ([ORCID](https://orcid.org/0000-0001-8789-506X))
  \[contributor\]

- Janosch Brenzel-Weiss \[contributor\]

- Joao Martins \[contributor\]

- Philipp Baumann <baumann-philipp@protonmail.com>
  ([ORCID](https://orcid.org/0000-0002-3194-8975)) \[contributor\]
