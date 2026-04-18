# Star Wars Species

A dataset containing information about species in the Star Wars
universe, fetched from the Star Wars API (SWAPI).

## Usage

``` r
starwars_species
```

## Format

A data frame with 37 rows and 12 variables:

- name:

  `character`. The name of the species.

- classification:

  `character`. The classification of the species (e.g. mammal, reptile).

- designation:

  `character`. The designation of the species (e.g. sentient,
  reptilian).

- average_height:

  `double`. The average height of the species in centimeters.

- average_lifespan:

  `double`. The average lifespan of the species in years.

- skin_colors:

  `character`. A comma-separated string of common skin colors for the
  species.

- hair_colors:

  `character`. A comma-separated string of common hair colors for the
  species.

- eye_colors:

  `character`. A comma-separated string of common eye colors for the
  species.

- language:

  `character`. The language commonly spoken by the species.

- homeworld:

  `character`. The name of the planet this species originates from.

- people:

  `list` of `character` vectors. A list of character names that are
  members of this species.

- films:

  `list` of `character` vectors. A list of film titles in which this
  species appears.

## Source

<https://swapi.info/api/species>
