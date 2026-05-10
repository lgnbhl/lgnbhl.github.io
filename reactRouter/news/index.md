# Changelog

## reactRouter 0.2.0

CRAN submission. Major release upgrading the package to React Router v7
with the data router API (loaders, actions, fetchers, deferred data).

### Breaking changes

- [`RouterProvider()`](https://felixluginbuhl.com/reactRouter/reference/RouterProvider.md)
  now takes a `router` argument built with `create*Router()` instead of
  route children.
- [`data()`](https://rdrr.io/r/utils/data.html) was renamed to
  [`dataResponse()`](https://felixluginbuhl.com/reactRouter/reference/dataResponse.md)
  and [`replace()`](https://rdrr.io/r/base/replace.html) was renamed to
  [`replaceResponse()`](https://felixluginbuhl.com/reactRouter/reference/replaceResponse.md)
  to avoid masking base R functions.
- `reloadDocument` on
  [`Link()`](https://felixluginbuhl.com/reactRouter/reference/Link.md) /
  [`NavLink()`](https://felixluginbuhl.com/reactRouter/reference/NavLink.md)
  defaults to `FALSE`.

### New features

- Updated to React Router v7 (`react-router-dom` 7.x).
- Data router API:
  [`createBrowserRouter()`](https://felixluginbuhl.com/reactRouter/reference/createBrowserRouter.md),
  [`createHashRouter()`](https://felixluginbuhl.com/reactRouter/reference/createHashRouter.md),
  [`createMemoryRouter()`](https://felixluginbuhl.com/reactRouter/reference/createMemoryRouter.md)
  paired with `RouterProvider(router = ...)` — the recommended way to
  use loaders, actions, fetchers, and `Await`.
- New components: `Await`, `Form`, `ScrollRestoration`, `Outlet`,
  `Routes`, `Navigate`.
- New hooks: `useLoaderData`, `useActionData`, `useNavigation`,
  `useNavigate`, `useNavigationType`, `useMatch`, `useMatches`,
  `useSearchParams`, `useRouteError`, `useRouteLoaderData`,
  `useFetcher`, `useFetchers`, `useRevalidator`, `useBlocker`,
  `useSubmit`, and more.
- New loader/action helpers:
  [`redirect()`](https://felixluginbuhl.com/reactRouter/reference/redirect.md),
  [`replaceResponse()`](https://felixluginbuhl.com/reactRouter/reference/replaceResponse.md),
  [`redirectDocument()`](https://felixluginbuhl.com/reactRouter/reference/redirectDocument.md),
  [`dataResponse()`](https://felixluginbuhl.com/reactRouter/reference/dataResponse.md).

### Security

- [`redirect()`](https://felixluginbuhl.com/reactRouter/reference/redirect.md),
  [`replaceResponse()`](https://felixluginbuhl.com/reactRouter/reference/replaceResponse.md),
  and
  [`redirectDocument()`](https://felixluginbuhl.com/reactRouter/reference/redirectDocument.md)
  reject unsafe URL schemes (`javascript:`, `data:`, `vbscript:`) and
  protocol-relative targets.
- [`reactRouterExample()`](https://felixluginbuhl.com/reactRouter/reference/reactRouterExample.md)
  validates `example` against the list of bundled examples, closing a
  path-traversal vector in user-supplied input.
- New vignette: “Security considerations” — guidance on loaders/actions
  as client-side code, URL-encoding route params, redirect targets, CSP,
  and more.

### Diagnostics & ergonomics

- [`Route()`](https://felixluginbuhl.com/reactRouter/reference/Route.md)
  validates that `loader` and `action` inherit from `JS_EVAL` at call
  time, surfacing a common mistake before it becomes a browser-side
  error.
- [`dataResponse()`](https://felixluginbuhl.com/reactRouter/reference/dataResponse.md):
  `value` is now a required argument.
- [`useNavigate()`](https://felixluginbuhl.com/reactRouter/reference/useNavigate.md),
  [`useSubmit()`](https://felixluginbuhl.com/reactRouter/reference/useSubmit.md),
  and
  [`useLinkClickHandler()`](https://felixluginbuhl.com/reactRouter/reference/useLinkClickHandler.md)
  refuse `into=` with `as = "children"` and point to `render = JS(...)`
  or `as = "onClick"` — these hooks return functions, not renderable
  children.
- `RouterProvider` logs a dev-mode warning when the route tree changes
  after mount; remount via a `key` prop to apply new routes.

## reactRouter 0.1.2

- BREAKING CHANGE: `reloadDocument` is now FALSE by default (like in
  React Router 6.30.0)
- added data loader and hooks
- improve examples and docs

## reactRouter 0.1.1

CRAN release: 2025-07-23

- fix [\#1](https://github.com/lgnbhl/reactRouter/issues/1)
- add more examples

## reactRouter 0.1.0

CRAN release: 2025-04-29

- initial commit
