# Star Wars People

A dataset containing information about people (characters) in the Star
Wars universe, fetched from the Star Wars API (SWAPI).

## Usage

``` r
starwars_people
```

## Format

A data frame with 82 rows and 11 variables:

- name:

  `character`. The name of the character.

- height:

  `integer`. The height of the character in centimeters.

- mass:

  `double`. The mass of the character in kilograms.

- hair_color:

  `character`. The hair color of the character.

- skin_color:

  `character`. The skin color of the character.

- eye_color:

  `character`. The eye color of the character.

- birth_year:

  `double`. The birth year of the character relative to the Battle of
  Yavin (BBY). A higher number means earlier in the timeline.

- gender:

  `character`. The gender of the character.

- films:

  `list` of `character` vectors. A list of film titles this character
  appeared in.

- starships:

  `list` of `character` vectors. A list of starship names this character
  has piloted.

- vehicles:

  `list` of `character` vectors. A list of vehicle names this character
  has piloted.

## Source

<https://swapi.info/api/people>
