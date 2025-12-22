# TypingFast - Docker Deployment Guide

This guide covers how to run the TypingFast Spring Boot application using Docker, both locally and in production (Railway).

## Prerequisites

- **Docker Desktop** installed and running
- **Docker Compose** (included with Docker Desktop)

---

## Quick Start (Local Development)

### 1. Start All Services

```bash
docker-compose up -d --build
```

This command will:
- Build the Spring Boot application image
- Start MySQL 8 database
- Start the Spring Boot application
- Set up networking between containers

### 2. Verify Services Are Running

```bash
docker-compose ps
```

### 3. Test the Application

```bash
# Test root endpoint
curl http://localhost:8080/

# Test health endpoint
curl http://localhost:8080/health

# Test typing text endpoint
curl http://localhost:8080/api/typing/text
```

### 4. View Logs

```bash
# View all logs
docker-compose logs -f

# View only app logs
docker-compose logs -f app
```

### 5. Stop Services

```bash
# Stop containers (keeps data)
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down --volumes
```

---

## Docker Files Overview

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build for the Spring Boot app |
| `docker-compose.yml` | Local development orchestration |
| `.dockerignore` | Excludes unnecessary files from build context |
| `init-db/init.sql` | Database initialization script |

---

## Environment Variables

The application supports these environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8080` |
| `SPRING_DATASOURCE_URL` | Database JDBC URL | `jdbc:mysql://localhost:3306/typingfast...` |
| `SPRING_DATASOURCE_USERNAME` | Database username | `typinguser` |
| `SPRING_DATASOURCE_PASSWORD` | Database password | `password` |
| `JWT_SECRET` | JWT signing key | (default insecure key) |
| `JWT_EXPIRATION` | JWT expiration (ms) | `86400000` (24h) |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | Hibernate DDL mode | `update` |

---

## Deploying to Railway

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Docker configuration"
   git push origin main
   ```

2. **Create a new project on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add a MySQL database**
   - In your Railway project, click "New"
   - Select "Database" → "MySQL"
   - Railway will automatically create the database

4. **Configure environment variables**
   - Go to your service settings
   - Add the following variables:
   
   ```
   SPRING_DATASOURCE_URL=jdbc:mysql://${{MySQL.MYSQL_HOST}}:${{MySQL.MYSQL_PORT}}/${{MySQL.MYSQL_DATABASE}}?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   SPRING_DATASOURCE_USERNAME=${{MySQL.MYSQL_USER}}
   SPRING_DATASOURCE_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
   JWT_SECRET=<your-production-secret-key-min-256-bits>
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   ```

   > **Note:** Railway automatically sets the `PORT` environment variable.

5. **Deploy**
   - Railway will automatically detect the Dockerfile and deploy

### Option 2: Deploy Using Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and initialize**
   ```bash
   railway login
   railway init
   ```

3. **Add MySQL**
   ```bash
   railway add --name mysql
   ```

4. **Link and deploy**
   ```bash
   railway link
   railway up
   ```

5. **Set environment variables**
   ```bash
   railway variables set JWT_SECRET="your-secure-production-key"
   ```

---

## Building the Image Manually

### Build the Docker image

```bash
docker build -t typingfast-app:latest .
```

### Run the container (standalone)

```bash
docker run -d \
  --name typingfast \
  -p 8080:8080 \
  -e PORT=8080 \
  -e SPRING_DATASOURCE_URL="jdbc:mysql://host.docker.internal:3306/typingfast" \
  -e SPRING_DATASOURCE_USERNAME="typinguser" \
  -e SPRING_DATASOURCE_PASSWORD="password" \
  typingfast-app:latest
```

### Push to Docker Hub (optional)

```bash
docker tag typingfast-app:latest your-dockerhub-username/typingfast:latest
docker push your-dockerhub-username/typingfast:latest
```

---

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs app

# Check if MySQL is healthy
docker-compose logs db
```

### Database connection issues
- Ensure you're using the service name `db` (not `localhost`) for the database URL in Docker
- Check if MySQL container is healthy: `docker ps`

### Port already in use
```bash
# Change the port mapping in docker-compose.yml
# Or stop the conflicting service
```

### Rebuild from scratch
```bash
docker-compose down --volumes --rmi all
docker-compose up -d --build
```

---

## Production Checklist

- [ ] Use a secure, unique `JWT_SECRET` (minimum 256 bits)
- [ ] Set `SPRING_JPA_HIBERNATE_DDL_AUTO=validate` in production
- [ ] Configure proper database backups
- [ ] Set up monitoring and alerting
- [ ] Configure HTTPS (handled by Railway/your PaaS)
- [ ] Review and restrict CORS settings for production domains

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Compose Network                    │
│                                                              │
│  ┌─────────────────┐         ┌─────────────────┐            │
│  │   typingfast-db │         │  typingfast-app │            │
│  │    (MySQL 8)    │◄────────│  (Spring Boot)  │            │
│  │   Port: 3306    │         │   Port: 8080    │            │
│  └─────────────────┘         └─────────────────┘            │
│         │                           │                        │
│         ▼                           ▼                        │
│   Volume: mysql_data          Exposed: 8080                  │
└─────────────────────────────────────────────────────────────┘
```
