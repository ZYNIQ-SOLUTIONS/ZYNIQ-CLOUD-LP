# Landing Pages - Docker Deployment Guide

## Quick Start

### Development (Native)
```bash
cd landing_pages
npm install
npm run dev  # Port 3555
```

### Production (Docker)
```bash
# From project root
docker compose -f docker-compose.yml -f docker-compose.landing_pages.yml up -d landing-pages

# Verify health
curl http://localhost:3555/
docker compose logs landing-pages
```

## Configuration

### Ports
- **Host:** 3555 (matches dev port)
- **Container:** 3333 (Dockerfile default)

### Environment Variables
All variables are **non-sensitive** and set via `environment:` in compose file:
- `NEXT_PUBLIC_SITE_URL` - Public site URL
- `NEXT_PUBLIC_API_URL` - Backend API (Docker DNS: `http://backend:5000`)
- `NEXT_PUBLIC_STUDIO_URL` - Studio frontend URL
- `BACKEND_URL` - Server-side backend URL (Docker DNS)

**No secrets file needed** - all config is public URLs.

### Network
- Joins `zyniq_studio_net` (same as backend, frontend, etc.)
- Can communicate with all core services via Docker DNS

### Dependencies
- Depends on `backend` service with health check
- Will not start until backend is healthy

## Build & Deploy

### Local Build Test
```bash
cd landing_pages
docker build -t zyniq-landing-pages:test .
docker run -p 3555:3333 zyniq-landing-pages:test
```

### Production Stack
```bash
# Start core infrastructure first
docker compose -f docker-compose.yml -f docker-compose.db.yml up -d

# Add landing pages
docker compose -f docker-compose.yml -f docker-compose.landing_pages.yml up -d landing-pages
```

### Update Deployment
```bash
# Rebuild and restart
docker compose -f docker-compose.yml -f docker-compose.landing_pages.yml up -d --build landing-pages

# View logs
docker compose logs -f landing-pages
```

## Troubleshooting

### Health Check Fails
```bash
# Check if container is running
docker ps | grep landing

# Check logs
docker logs zyniq_landing_pages

# Verify port binding
curl -v http://localhost:3555/
```

### Build Fails
```bash
# Clean build cache
docker builder prune -af

# Rebuild from scratch
docker compose -f docker-compose.yml -f docker-compose.landing_pages.yml build --no-cache landing-pages
```

### Backend Connection Issues
Ensure backend service is healthy:
```bash
docker compose ps backend
curl http://localhost:5000/health
```

## Security Notes

✅ **No secrets in .env.local** - all values are public URLs  
✅ **No secrets in compose file** - all env vars are non-sensitive  
✅ **No env_file needed** - all config via `environment:` block  
✅ **Docker DNS used** - no hardcoded localhost in production

If future secrets are needed (API keys, tokens):
1. Create `secrets/landing_pages.env`
2. Add to compose file: `env_file: - secrets/landing_pages.env`
3. Never commit the secrets file to git
