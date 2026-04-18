# Star Wars Planets

A dataset containing information about planets in the Star Wars
universe, fetched from the Star Wars API (SWAPI).

## Usage

``` r
starwars_planets
```

## Format

A data frame with 60 rows and 11 variables:

- name:

  `character`. The name of the planet.

- rotation_period:

  `integer`. The number of standard hours it takes for the planet to
  complete a single rotation on its axis.

- orbital_period:

  `integer`. The number of standard days it takes for the planet to
  orbit once around the local star.

- diameter:

  `integer`. The diameter of the planet in kilometers.

- climate:

  `character`. The climate(s) of the planet.

- gravity:

  `character`. The gravity of the planet relative to standard gravity.

- terrain:

  `character`. The terrain type(s) found on the planet.

- surface_water:

  `double`. The percentage of the planet surface covered by water or
  other bodies of water.

- population:

  `double`. The average population of sentient beings inhabiting the
  planet.

- residents:

  `list` of `character` vectors. A list of character names who are
  residents of the planet.

- films:

  `list` of `character` vectors. A list of film titles in which this
  planet appears.

## Source

<https://swapi.info/api/planets>
