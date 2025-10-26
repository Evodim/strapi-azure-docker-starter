const { mergeConfig } = require("vite");

module.exports = (config) => {
  // Extract hostname from ALLOWED_HOSTS if present
  let allowedHosts = [];

  if (process.env.ALLOWED_HOSTS) {
    console.log(
      `[Vite] Add ALLOWED_HOSTS to allowedHosts: ${process.env.ALLOWED_HOSTS}`,
    );
    // Important: always return the modified config
    return mergeConfig(config, {
      server: {
        allowedHosts: process.env.ALLOWED_HOSTS.split(",").map((host) =>
          host.trim(),
        ),
      },
    });
  }
  // If no ALLOWED_HOSTS is defined, use default localhost and host.docker.internal
  console.warn(
    "[Vite] No ALLOWED_HOSTS found in environment variables, using default allowedHosts: localhost, host.docker.internal",
  );
  allowedHosts = ["localhost", "host.docker.internal"];
  // Important: always return the modified config
  return mergeConfig(config, {
    server: {
      allowedHosts: allowedHosts,
    },
  });
};
