const path = require("path");

module.exports = ({ env }) => {
  const client = process.env.DATABASE_CLIENT || "sqlite";

  const connections = {
    mysql: {
      connection: {
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        database: process.env.DATABASE_NAME || "strapi",
        user: process.env.DATABASE_USERNAME || "strapi",
        password: process.env.DATABASE_PASSWORD || "strapi",
        ssl: process.env.DATABASE_SSL === "true" && {
          key: process.env.DATABASE_SSL_KEY,
          cert: process.env.DATABASE_SSL_CERT,
          ca: process.env.DATABASE_SSL_CA,
          capath: process.env.DATABASE_SSL_CAPATH,
          cipher: process.env.DATABASE_SSL_CIPHER,
          rejectUnauthorized:
            process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
        },
      },
      pool: {
        min: parseInt(process.env.DATABASE_POOL_MIN, 10) || 2,
        max: parseInt(process.env.DATABASE_POOL_MAX, 10) || 10,
      },
    },
    postgres: {
      connection: {
        connectionString: process.env.DATABASE_URL,
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        database: process.env.DATABASE_NAME || "strapi",
        user: process.env.DATABASE_USERNAME || "strapi",
        password: process.env.DATABASE_PASSWORD || "strapi",
        ssl: process.env.DATABASE_SSL === "true" && {
          key: process.env.DATABASE_SSL_KEY,
          cert: process.env.DATABASE_SSL_CERT,
          ca: process.env.DATABASE_SSL_CA,
          capath: process.env.DATABASE_SSL_CAPATH,
          cipher: process.env.DATABASE_SSL_CIPHER,
          rejectUnauthorized:
            process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
        },
        schema: process.env.DATABASE_SCHEMA || "public",
      },
      pool: {
        min: parseInt(process.env.DATABASE_POOL_MIN, 10) || 2,
        max: parseInt(process.env.DATABASE_POOL_MAX, 10) || 10,
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          process.env.DATABASE_FILENAME || ".tmp/data.db"
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout:
        parseInt(process.env.DATABASE_CONNECTION_TIMEOUT) || 60000,
    },
  };
};
