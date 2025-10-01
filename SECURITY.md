# 🔐 Security & Environment Variables Guide

## 📋 Table of Contents

- [Environment Variables](#environment-variables)
- [Encryption Methods](#encryption-methods)
- [Security Best Practices](#security-best-practices)
- [Production Secrets Management](#production-secrets-management)
- [Regular Security Audits](#regular-security-audits)

---

## 🔑 Environment Variables

### Critical Variables to Protect

**Never commit these to git:**

1. `MONGODB_URI` - Database connection string
2. `FIREBASE_PRIVATE_KEY` - Firebase admin credentials
3. `GEMINI_API_KEY` - Google AI API key
4. `FIREBASE_API_KEY` - Firebase web API key

### .gitignore Verification

Ensure your `.gitignore` includes:

```gitignore
# Environment files
.env
.env.local
.env.*.local
.env.backup
server/.env
client/.env
```

---

## 🔐 Encryption Methods

### Method 1: dotenv-vault (Recommended)

**Step 1: Install dotenv-vault**

```bash
npm install -g dotenv-vault
```

**Step 2: Encrypt Server Environment**

```bash
cd server
dotenv-vault login
dotenv-vault push
```

**Step 3: Encrypt Client Environment**

```bash
cd ../client
dotenv-vault push
```

**Step 4: Get Encrypted Keys**

```bash
dotenv-vault keys
```

Save the keys in a secure location (1Password, LastPass, etc.)

**Step 5: Use in Production**

```bash
# Set this environment variable in production
DOTENV_KEY=dotenv://:key_xxxx@dotenv.org/vault/.env.vault?environment=production
```

### Method 2: Git-crypt (For Teams)

**Step 1: Install git-crypt**

```bash
# Windows (using Chocolatey)
choco install git-crypt

# macOS
brew install git-crypt

# Linux
sudo apt-get install git-crypt
```

**Step 2: Initialize in Repository**

```bash
cd /path/to/SynapseAI
git-crypt init
```

**Step 3: Configure .gitattributes**

Create `.gitattributes` file:

```gitattributes
.env filter=git-crypt diff=git-crypt
server/.env filter=git-crypt diff=git-crypt
client/.env filter=git-crypt diff=git-crypt
```

**Step 4: Add Collaborators**

```bash
# Export GPG key for collaborator
git-crypt add-gpg-user USER_ID

# Or use symmetric encryption
git-crypt unlock
```

### Method 3: Environment Variable Services

#### Using Doppler

```bash
# Install Doppler CLI
npm install -g @dopplerhq/cli

# Setup
doppler login
doppler setup

# Import variables
doppler secrets upload server/.env
doppler secrets upload client/.env

# Run with Doppler
doppler run -- npm start
```

#### Using Infisical

```bash
# Install Infisical CLI
npm install -g @infisical/cli

# Login and init
infisical login
infisical init

# Import secrets
infisical secrets set

# Run with Infisical
infisical run -- npm start
```

---

## 🛡️ Security Best Practices

### 1. Separate Environments

Create different `.env` files for each environment:

```
.env.development    # Local development
.env.staging        # Staging server
.env.production     # Production server
```

### 2. Use Strong Secrets

```bash
# Generate strong random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use online generator
# https://randomkeygen.com/
```

### 3. Rotate Keys Regularly

**MongoDB:**
- Rotate connection strings every 3 months
- Use different credentials for production

**Firebase:**
- Regenerate service account keys quarterly
- Monitor for unauthorized access

**Gemini API:**
- Rotate API keys every 6 months
- Enable API restrictions
- Set usage quotas

### 4. Access Control

**Development Team:**
```bash
# Only give access to development secrets
MONGODB_URI=dev-connection-string
GEMINI_API_KEY=dev-api-key
```

**Production Team:**
```bash
# Production secrets separate
MONGODB_URI=prod-connection-string
GEMINI_API_KEY=prod-api-key
```

### 5. Audit Environment Variables

```bash
# Check what's in your .env
cat server/.env

# Verify no secrets in git
git log -S "GEMINI_API_KEY" --all

# Check for leaked secrets
npx @gitguardian/ggshield secret scan path ./
```

---

## 🔒 Production Secrets Management

### Railway/Render/Heroku

**Don't commit .env to production servers**

Instead, set via dashboard:

1. Go to project settings
2. Add environment variables
3. Redeploy

### Vercel

```bash
# Via CLI
vercel env add VITE_API_URL

# Or via dashboard
# Settings → Environment Variables
```

### Docker

**Use Docker secrets:**

```dockerfile
# docker-compose.yml
version: '3.8'
services:
  backend:
    image: synapseai-backend
    secrets:
      - mongodb_uri
      - firebase_key
      - gemini_key

secrets:
  mongodb_uri:
    external: true
  firebase_key:
    external: true
  gemini_key:
    external: true
```

### Kubernetes

**Use Kubernetes secrets:**

```bash
# Create secret
kubectl create secret generic synapseai-secrets \
  --from-literal=mongodb-uri='your-connection-string' \
  --from-literal=gemini-api-key='your-api-key'

# Reference in deployment
apiVersion: v1
kind: Pod
metadata:
  name: synapseai-backend
spec:
  containers:
  - name: backend
    image: synapseai-backend
    env:
    - name: MONGODB_URI
      valueFrom:
        secretKeyRef:
          name: synapseai-secrets
          key: mongodb-uri
```

---

## 🔍 Regular Security Audits

### Weekly Checks

```bash
# 1. Check for exposed secrets in code
npm audit

# 2. Scan for vulnerabilities
npm install -g snyk
snyk test

# 3. Check dependencies
npm outdated
```

### Monthly Tasks

- [ ] Review access logs for unusual activity
- [ ] Audit user permissions
- [ ] Check for deprecated packages
- [ ] Review API usage quotas
- [ ] Verify backup integrity

### Quarterly Actions

- [ ] Rotate all API keys
- [ ] Update all dependencies
- [ ] Review and update security policies
- [ ] Penetration testing
- [ ] Disaster recovery drill

---

## 📊 Monitoring & Alerts

### Set up alerts for:

1. **Unusual API usage**
   - Spike in Gemini API calls
   - High MongoDB connection count

2. **Authentication failures**
   - Multiple failed login attempts
   - Suspicious IP addresses

3. **Resource usage**
   - High CPU/Memory on servers
   - Database storage limits

### Tools to use:

- **Sentry** - Error tracking
- **LogRocket** - User session replay
- **DataDog** - Infrastructure monitoring
- **PagerDuty** - Alert management

---

## 🚨 Incident Response

If secrets are compromised:

### Immediate Actions

1. **Rotate all affected credentials immediately**
2. **Revoke compromised API keys**
3. **Change MongoDB passwords**
4. **Update Firebase service accounts**
5. **Force logout all users**

### Investigation

1. Check git history for leaks
2. Review access logs
3. Identify affected systems
4. Document timeline

### Prevention

1. Update security procedures
2. Additional training for team
3. Implement stricter controls
4. Regular security audits

---

## 📱 Useful Commands

### Check for leaked secrets
```bash
# Install truffleHog
pip install truffleHog

# Scan repository
truffleHog --regex --entropy=True .
```

### Remove secrets from git history
```bash
# Install BFG Repo-Cleaner
brew install bfg

# Remove .env from history
bfg --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### Generate secure random values
```bash
# 32-byte hex string
openssl rand -hex 32

# Base64 encoded
openssl rand -base64 32

# UUID
uuidgen
```

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

---

## 🤝 Team Security Guidelines

### For Developers

1. Never commit `.env` files
2. Use `.env.example` for templates
3. Notify team if secrets are rotated
4. Use secure password managers
5. Enable 2FA on all accounts

### For DevOps

1. Use secrets managers (Vault, AWS Secrets Manager)
2. Implement least privilege access
3. Regular security audits
4. Automated secret rotation
5. Monitor for anomalies

### For Admins

1. Regular access review
2. Offboarding checklist
3. Incident response plan
4. Security training
5. Compliance checks

---

**🔒 Remember: Security is everyone's responsibility!**

---

Made with ❤️ by Pavan Kumar
