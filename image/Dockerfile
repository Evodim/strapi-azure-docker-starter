# Build stage
ARG NODE_VERSION="22-alpine"
FROM node:${NODE_VERSION} AS base-image

FROM base-image
# Set build arguments and environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install system dependencies (optimized for Alpine)
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    g++ \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git \
    make \
    python3 \
    cifs-utils \
    fuse \
    samba-client \
    && rm -rf /var/cache/apk/*
    
# Set up Node.js environment
RUN yarn global add node-gyp && \
    yarn config set network-timeout 600000 -g

# Create Strapi application directory and initialize
WORKDIR /srv

# Create Strapi application using the correct method
RUN echo "Starting Strapi creation..." && \
    printf "n\n" | npx create-strapi-app@5.30.0 app \
    --no-run \
    --install \
    --js \
    --use-yarn \
    --quickstart \
    --skip-cloud \
    --no-example \
    --skip-db \
    --no-git-init \
    && echo "Strapi creation completed"
# Verify if package.json created correctly, added check
RUN test -f /srv/app/package.json && echo "package.json created successfully" || (echo "package.json not found" && exit 1)


WORKDIR /srv/app

# Change to app directory and install additional dependencies
RUN yarn add \
    mysql2 \
    pg \
    strapi-provider-upload-azure-storage \
    @strapi/utils \
    @strapi/plugin-documentation \
    @strapi/database
   

# Create src directory
RUN mkdir -p src

# Copy assets directory to image (will be copied to destinations at runtime by entrypoint)
COPY assets /srv/app/assets

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

VOLUME /srv/app/src

EXPOSE 1337

# Use custom entrypoint that handles asset copying and configuration
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh", "yarn"]

# Default command: start in production mode
# Override with "develop" for development mode: docker run ... yarn develop
CMD ["start"]
