# Star Wars Starships

A dataset containing information about starships in the Star Wars
universe, fetched from the Star Wars API (SWAPI).

## Usage

``` r
starwars_starships
```

## Format

A data frame with 36 rows and 15 variables:

- name:

  `character`. The name of the starship.

- model:

  `character`. The model or official name of the starship.

- manufacturer:

  `character`. The manufacturer of the starship.

- cost_in_credits:

  `double`. The cost of the starship new, in galactic credits.

- length:

  `double`. The length of the starship in meters.

- max_atmosphering_speed:

  `double`. The maximum speed of the starship in atmosphere. `NA` if the
  starship is incapable of atmospheric flight.

- crew:

  `double`. The number of personnel needed to run or pilot the starship.

- passengers:

  `double`. The number of non-essential people this starship can
  transport.

- cargo_capacity:

  `double`. The maximum cargo load in kilograms.

- consumables:

  `character`. The maximum length of time the starship can provide
  consumables for its entire crew without resupplying.

- hyperdrive_rating:

  `double`. The class of the starship's hyperdrive.

- MGLT:

  `double`. The maximum number of Megalights this starship can travel in
  a standard hour.

- starship_class:

  `character`. The class of the starship.

- pilots:

  `list` of `character` vectors. A list of character names who have
  piloted this starship.

- films:

  `list` of `character` vectors. A list of film titles in which this
  starship appears.

## Source

<https://swapi.info/api/starships>
