// Copy this file to www/env.js and fill in your own Google OAuth client id.
//
// Create one at console.cloud.google.com: enable the Google Drive API, configure
// the OAuth consent screen (one scope only: .../auth/drive.file —
// non-sensitive, so no verification review), PUBLISH
// the app, then create an OAuth client id of type "Web application". See the
// README for the full walkthrough.
//
// Authorized JavaScript origins must list every origin the page is served from,
// e.g. https://felixluginbuhl.com and http://localhost:8000. Origins are
// scheme + host + port, so the path (/travel-log/) is irrelevant. No redirect
// URIs are needed — Google Identity Services uses a popup, not a redirect.
//
// The client id is designed to be public: it identifies the app, and the
// authorized-origins allowlist is what stops anyone else using it. There is no
// client secret in this flow, and there is no key here that could read anyone's
// data — a user's travel log lives in their own Drive, not in any database.
window.GOOGLE_CLIENT_ID = "896341356913-jn31u65eupak7ohneiih0iidbht51jai.apps.googleusercontent.com";
