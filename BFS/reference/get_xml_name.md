# Get the name from an XML node for a specified language, with fallback

If the specified language is not found, it falls back to the first
available name.

## Usage

``` r
get_xml_name(node, language)
```

## Arguments

- node:

  An XML node from which to extract the name.

- language:

  The desired language code ("de", "fr", "it", "en").

## Value

A character string containing the name in the specified language or the
first available name.
