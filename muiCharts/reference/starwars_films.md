# Star Wars Films

A dataset containing information about the Star Wars films, fetched from
the Star Wars API (SWAPI).

## Usage

``` r
starwars_films
```

## Format

A data frame with 6 rows and 10 variables:

- title:

  `character`. The title of the film.

- episode_id:

  `integer`. The episode number of the film.

- director:

  `character`. The name of the director of the film.

- producer:

  `character`. The name(s) of the producer(s) of the film.

- release_date:

  `Date`. The release date of the film in ISO 8601 format.

- characters:

  `list` of `character` vectors. A list of character names appearing in
  the film.

- planets:

  `list` of `character` vectors. A list of planet names appearing in the
  film.

- starships:

  `list` of `character` vectors. A list of starship names appearing in
  the film.

- vehicles:

  `list` of `character` vectors. A list of vehicle names appearing in
  the film.

- species:

  `list` of `character` vectors. A list of species names appearing in
  the film.

## Source

<https://swapi.info/api/films>
