# Plane Hybrid Deployment Guide

## Overview
This directory contains the hybrid deployment setup for Plane project management tool, combining Vercel frontend deployment with self-hosted backend services.

## Architecture
- **Frontend**: Vercel (web, admin, space apps)
- **Backend**: Docker Compose on self-hosted server
- **Database**: Neon PostgreSQL
- **SSL**: Let's Encrypt via Traefik
- **Domain**: *.plane.aliaslabs.ai

## Services
- **API**: https://api.plane.aliaslabs.ai
- **Web App**: https://plane.aliaslabs.ai
- **Admin**: https://admin.plane.aliaslabs.ai
- **Space**: https://space.plane.aliaslabs.ai
- **Live**: https://live.plane.aliaslabs.ai

## Critical Fixes Applied

### 1. AppArmor Socket Blocking (Backend)
**Issue**: Backend services failed to start due to AppArmor blocking socket operations.
**Fix**: Added `security_opt: apparmor:unconfined` to all backend containers in `docker-compose.yml`.

### 2. Admin Router Basename Mismatch (Frontend)
**Issue**: Admin app showed blank page due to React Router basename mismatch.
**Fix**: Added Vercel redirect `/god-mode` → `/god-mode/` in `admin/vercel.json`.

### 3. Infinite Re-render Prevention (Web App)
**Issue**: Web app showed React error #418 (too many re-renders) due to router.push calls during render.
**Fix**: Moved router.push calls to useEffect in `AuthenticationWrapper` to prevent calling during render phase.

## Deployment Steps

### Backend Deployment
1. Ensure Docker and Docker Compose are installed
2. Configure environment variables in `plane-setup/plane.env`
3. Run: `cd plane-setup && docker-compose up -d`

### Frontend Deployment
1. Push code to GitHub repository connected to Vercel
2. Vercel will automatically deploy web, admin, and space apps
3. Configure domain aliases in Vercel dashboard

## Environment Variables
- `DATABASE_URL`: Neon PostgreSQL connection string
- `SECRET_KEY`: Django secret key
- `WEB_BASE_URL`: https://plane.aliaslabs.ai
- `ADMIN_BASE_URL`: https://admin.plane.aliaslabs.ai
- `SPACE_BASE_URL`: https://space.plane.aliaslabs.ai

## Monitoring
- Backend logs: `docker-compose logs -f`
- Frontend logs: Vercel dashboard
- Database: Neon console

## Troubleshooting

### Backend Issues
- Check AppArmor: Ensure `security_opt: apparmor:unconfined` is set
- Port conflicts: Verify ports 80, 443, 8000 are available
- Database connection: Test Neon connection string

### Frontend Issues
- Router issues: Check vercel.json redirects
- React errors: Verify useEffect usage in authentication wrappers
- Build failures: Ensure all dependencies are installed

## Security Notes
- SSL certificates auto-renewed via Traefik
- Database access restricted to backend services
- Environment variables encrypted in Vercel

## Maintenance
- Weekly: Check service health and logs
- Monthly: Update Docker images and dependencies
- Quarterly: Review security settings and access logs

## Status
✅ **PRODUCTION-READY** - All services operational and stable