module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  cron: { enabled: false },
  admin: { autoOpen: true },
  app: {
    keys: env.array("APP_KEYS"),
  },
  url: env("PUBLIC_URL"),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false)
  }
});
