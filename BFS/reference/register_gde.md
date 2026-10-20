# Swiss official commune register: communes

The communes of Switzerland on 1 January 2023, with their district and
canton. The BFS assigns a number to each commune and publishes the Swiss
official commune register, used by the federal, cantonal and communal
administrations to identify communes. See
[register_dic](https://felixluginbuhl.com/BFS/reference/register_dic.md)
for the variables in German, French and Italian.

## Usage

``` r
register_gde
```

## Format

A data frame with 2,136 rows and 8 columns:

- GDEKT:

  Canton abbreviation, e.g. "ZH".

- GDEBZNR:

  District number.

- GDENR:

  BFS commune number.

- GDENAME:

  Official commune name.

- GDENAMK:

  Short commune name.

- GDEBZNA:

  District name.

- GDEKTNA:

  Canton name.

- GDEMUTDAT:

  Date of the last change, as "dd.mm.yyyy".

## Source

<https://www.bfs.admin.ch/bfs/en/home/basics/swiss-official-commune-register.html>

## See also

Other commune register:
[`register_bzn`](https://felixluginbuhl.com/BFS/reference/register_bzn.md),
[`register_dic`](https://felixluginbuhl.com/BFS/reference/register_dic.md),
[`register_gde_other`](https://felixluginbuhl.com/BFS/reference/register_gde_other.md),
[`register_kt`](https://felixluginbuhl.com/BFS/reference/register_kt.md),
[`register_kt_seeanteile`](https://felixluginbuhl.com/BFS/reference/register_kt_seeanteile.md)
