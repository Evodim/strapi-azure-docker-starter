# Strapi Azure Docker Image

A production-ready Docker Strapi image with full Azure cloud integration.

[Available image on docker hub](https://hub.docker.com/r/evodim/strapi-azure)

## What is Strapi?

Strapi is a leading open-source headless CMS that gives developers the freedom to use their favorite tools and frameworks while providing editors with an easy-to-use interface to manage content.

**Key Strapi features:**

- **Content Management** - Intuitive admin panel for content creators
- **REST & GraphQL APIs** - Automatically generated APIs
- **Customizable** - Fully customizable with plugins and custom code
- **Multi-database support** - Works with PostgreSQL, MySQL, MariaDB, and SQLite
- **Role-based permissions** - Fine-grained access control
- **Internationalization** - Built-in i18n support

## Why This Image?

This Docker image is specifically designed for **Azure-first organizations** who want to leverage the full power of Microsoft's cloud ecosystem with Strapi.

**Target audience:**

- Azure cloud architects and DevOps teams
- Organizations with existing Azure infrastructure
- Teams requiring enterprise-grade storage and CDN solutions
- Developers building scalable content management solutions

## Azure Integration Features

✅ **Azure Blob Storage** - Native media storage integration (strapi media)
✅ **Azure Database** - Support for Azure SQL, PostgreSQL, MySQL (strapi database)
✅ **Azure Container Registry** - Optimized for ACR deployment  (image hosting in ACR or docker hub)
✅ **Azure Front Door CDN** - Built-in CDN configuration for media files (to provide media files through de custom CDN)
✅ **Azure File Shares** - Application data persistence (strapi data schemas, might be synchronised accross your env stages)
✅ **Azure App Container Instances** - Ready for ACI or ACA deployment (main strapi web instance)

## Getting Started

### Prerequisites

- Docker installed on your machine
- Azure subscription (for full Azure integration)

### Quick Start with Docker Compose

1. **Clone this repository:**

   ```bash
   git clone https://github.com/Evodim/strapi-azure-docker.git
   cd strapi-azure-docker
   ```

2. **Create your environment file:**

   ```bash
   cp .env.example .env
   ```

3. **Configure your Azure services in `.env`:**

   ```env
   # Database Configuration
   DATABASE_CLIENT=postgres
   DATABASE_HOST=your-azure-db-host
   DATABASE_NAME=strapi
   DATABASE_USERNAME=your-username
   DATABASE_PASSWORD=your-password
   
   # Azure Storage Configuration
   STORAGE_ACCOUNT=your-storage-account
   STORAGE_ACCOUNT_KEY=your-account-key
   STORAGE_CONTAINER_NAME=strapi-uploads
   STORAGE_CDN_URL=https://your-cdn-endpoint
   ```

4. **Start your Strapi instance:**

   ```bash
   docker-compose up -d
   ```

5. **Access your Strapi admin:**
   Open `http://localhost:1337/admin` and create your first admin user.

### Using Pre-built Image

Pull the latest image from Docker Hub:

```bash
docker pull evodim/strapi-azure:latest
```

## Docker Compose Example

Here's a complete `docker-compose.yml` example for running Strapi with Azure integration:

```yaml
version: "3.8"

services:
  strapi:
    container_name: strapi-azure
    image: evodim/strapi-azure:latest
    
    # For development mode, uncomment the line below to override the default command
    # This will start Strapi in development mode with hot reloading
    # command: ["yarn", "develop"]
    
    ports:
      - "1337:1337"
    
    environment:
      # Database Configuration
      - DATABASE_CLIENT=postgres
      - DATABASE_HOST=your-azure-db-host.postgres.database.azure.com
      - DATABASE_PORT=5432
      - DATABASE_NAME=strapi
      - DATABASE_USERNAME=your-username
      - DATABASE_PASSWORD=your-password
      - DATABASE_SSL=true
      
      # Azure Storage Configuration
      - STORAGE_ACCOUNT=yourstorageaccount
      - STORAGE_ACCOUNT_KEY=your-storage-account-key
      - STORAGE_URL=https://yourstorageaccount.blob.core.windows.net
      - STORAGE_CONTAINER_NAME=strapi-uploads
      - STORAGE_CDN_URL=https://your-cdn-endpoint.azureedge.net
      - STORAGE_DEFAULT_PATH=uploads
      - STORAGE_MAX_CONCURRENT=10
      
      # Strapi Configuration
      - NODE_ENV=production
      - ADMIN_JWT_SECRET=your-admin-jwt-secret
      - API_TOKEN_SALT=your-api-token-salt
      - APP_KEYS=your-app-key1,your-app-key2,your-app-key3,your-app-key4
      - JWT_SECRET=your-jwt-secret
      - TRANSFER_TOKEN_SALT=your-transfer-token-salt
      - ALLOWED_HOSTS=admin-portal-host.uri.fr
      - STRAPI_TRANSFER_TOKEN=${STRAPI_TRANSFER_TOKEN} # New environment variable for distant Strapi transfer token
      - STRAPI_TRANSFER_URL=${STRAPI_TRANSFER_URL} # New environment variable for distant Strapi transfer URL
      - STRAPI_ENABLE_REMOTE_DATA_TRANSFER=${STRAPI_ENABLE_REMOTE_DATA_TRANSFER} # New environment variable to enable remote data transfer
    
    volumes:
      # Mount your application source code for development
      # Uncomment the line below for development mode      
      - you_strapi_content_data:/srv/app
    
    restart: unless-stopped
    
    # Health check to ensure Strapi is running
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:1337/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  strapi_data:
```

### Development vs Production Configuration

**For Production (default):**

- Uses `yarn start` command (production mode)
- No volume mounting of source code
- `NODE_ENV=production`

**For Development:**

- Uncomment `command: ["yarn", "develop"]` to enable hot reloading
- Uncomment the volume mount `./app:/srv/app/src` to edit code locally
- Change `NODE_ENV=development`

## Example: Full Azure Infrastructure

Here's a complete Azure setup example for hosting Strapi in production:

### Azure Resources Needed

- **Azure Container Registry** - Store your Strapi image
- **Azure Database for PostgreSQL** - Managed database service
- **Azure Storage Account** - Blob storage for media files
- **Azure Front Door** - Global CDN and load balancing
- **Azure Container Instances** - Host your Strapi application
- **Azure File Share** - Persistent application data

### Deployment Architecture

```
┌─────────────────────┐    ┌──────────────────────┐
│   Azure Front Door  │────│  Azure App Container │
│   (CDN + SSL)       │    │  Instance (Strapi)   │
└─────────────────────┘    └──────────────────────┘
                                      │
                           ┌──────────┼──────────┐
                           │          │          │
                ┌──────────▼─┐ ┌──────▼─────┐ ┌──▼────────┐
                │ Azure DB   │ │Azure Blob  │ │Azure File │
                │PostgreSQL  │ │Storage     │ │Share      │
                └────────────┘ └────────────┘ └───────────┘
```

## Releases & Versioning

This image follows a structured versioning strategy to ensure compatibility and easy tracking of Strapi updates.

### Versioning Strategy

**Format:** `v2[strapi-major].[minor-version]`

- **v2** - Image major version (indicates significant image architecture changes)
- **[strapi-major]** - Major version of Strapi (e.g., 4, 5, 6)
- **[minor-version]** - Our incremental updates and patches based on provided strapi version

### Examples

| Image Version | Strapi Version | Description |
|---------------|----------------|-------------|
| `v25.28.00` | Strapi 5.x | Image v2 with Strapi 5, build 28 | Docker image version minor 0
| `v25.30.00` | Strapi 5.x | Image v2 with Strapi 5, build 30 | Docker image version minor 0
| `v25.30.01` | Strapi 5.x | Image v2 with Strapi 5, build 30 | Docker image version minor 1 (fixes or enhancements for same strapi version)

### Available Tags

- **`latest`** - Always points to the most recent stable release
- **`v25.28.00`** - Specific version for production deployments
- **`dev`** - Development version with additional debugging tools

### Release Types

**🔄 Regular Updates (Minor versions)**

- Bug fixes and optimizations
- Azure service improvements  
- Security patches
- Dependencies updates

**🚀 Major Updates (Strapi major versions)**

- New Strapi major version support
- Breaking changes in Strapi API
- Significant feature additions

**🔧 Image Updates (v2 → v3)**

- Docker image architecture changes
- Base image updates (Node.js versions)
- Major Azure integration changes

### Usage Recommendations

**For Production:**

```bash
# Use specific version tags for stability
docker pull evodim/strapi-azure:v2.5.28
```

**For Development:**

```bash
# Use latest for newest features
docker pull evodim/strapi-azure:vX.X.XX-preview
```

## Feedback & Support

We welcome your feedback and contributions!

- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/Evodim/strapi-azure-docker-starter/issues)
- **Contributions**: Submit pull requests to improve the image

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for the Azure community**
