# Documentation template for components with \`.shinyInput\` wrappers

Documentation template for components with \`.shinyInput\` wrappers

## Arguments

- inputId:

  ID of the component.

- value:

  Starting value.

- session:

  Object passed as the \`session\` argument to Shiny server.

- ...:

  Props to pass to the component. The allowed props are listed below in
  the **Details** section.

## Value

Object with \`shiny.tag\` class suitable for use in the UI of a Shiny
app. The update functions return nothing (called for side effects).

## Reserved props

\`.shinyInput\` wrappers own the component's \`value\` (or
\`checked\`/\`page\`) and \`onChange\` props – that binding is how the
value reaches \`input\[\[inputId\]\]\`. Do not pass your own
\`value\`/\`onChange\` through \`...\`: a caller-supplied prop overrides
the wrapper's and silently breaks input reporting. Set the starting
value with the \`value\` argument and react to changes server-side via
\`input\[\[inputId\]\]\` (or push new values with the matching
\`update\*\` function).
