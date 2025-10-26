module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "http:",
            process.env.STORAGE_URL,
            process.env.STORAGE_CDN_URL,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https:",
            process.env.STORAGE_URL,
            process.env.STORAGE_CDN_URL,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
