# CloudTask Deployment Guide

Complete guide for deploying CloudTask to production.

---

## Production Stack

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** NeonDB (PostgreSQL)
- **Authentication:** Firebase

---

## 🗄️ Step 1: Database Deployment (NeonDB)

### Create NeonDB Account

1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub or email
3. Click **Create Project**

---

### Configure Database

**Project Settings:**

- **Project Name:** `cloudtask`
- **Region:** Choose closest to your users (e.g., US East, EU West)
- **PostgreSQL Version:** 15 (default)

---

### Get Connection String

After project creation, copy the connection string:

```
postgresql://user:password@ep-xyz-123456.us-east-2.aws.neon.tech/cloudtask?sslmode=require
```

**Format:**

```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Important:** Save this connection string - you'll need it for backend deployment.

---

### Database Configuration

**No manual schema creation needed!** JPA will automatically create tables on first backend deployment.

**Optional: Verify Connection**

```bash
psql "postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/cloudtask?sslmode=require"
```

---

## 🚀 Step 2: Backend Deployment (Render)

### Prepare Backend for Production

Update `application.properties` for production:

**Location:** `backend/user-service/src/main/resources/application.properties`

```properties
# Server Configuration
server.port=8081

# Database Configuration - Use environment variable
spring.datasource.url=${DATABASE_URL}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration - Production settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Firebase Configuration - Read from environment
firebase.admin.sdk.json=${FIREBASE_ADMIN_SDK_JSON}

# CORS Configuration - Update with your frontend URL
cors.allowed.origins=https://cloudtask-prod.vercel.app,http://localhost:5173

# Hikari Connection Pool - Optimized for serverless
spring.datasource.hikari.maximum-pool-size=2
spring.datasource.hikari.minimum-idle=1
spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.idle-timeout=300000
```

---

### Update FirebaseConfig.java

**Location:** `backend/user-service/src/main/java/com/cloudtask/config/FirebaseConfig.java`

Update to read from environment variable:

```java
@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() {
        try {
            String firebaseJson = System.getenv("FIREBASE_ADMIN_SDK_JSON");
            InputStream serviceAccount;
            
            if (firebaseJson != null && !firebaseJson.isEmpty()) {
                // Production: Read from environment variable
                serviceAccount = new ByteArrayInputStream(firebaseJson.getBytes());
            } else {
                // Development: Read from file
                serviceAccount = getClass().getClassLoader()
                    .getResourceAsStream("serviceAccountKey.json");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize Firebase", e);
        }
    }
}
```

---

### Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

---

### Create Web Service

1. Click **New** → **Web Service**
2. Connect your repository: `nakkshh/cloudtask`
3. Click **Connect**

---

### Configure Web Service

**Basic Settings:**

- **Name:** `cloudtask-backend`
- **Region:** Choose same as NeonDB (e.g., Oregon, Frankfurt)
- **Branch:** `main`
- **Root Directory:** `backend/user-service`
- **Runtime:** Java

**Build Settings:**

- **Build Command:** `mvn clean install -DskipTests`
- **Start Command:** `java -jar target/cloudtask-user-service-0.0.1-SNAPSHOT.jar`

**Instance Type:**

- Select **Free** (or Starter for production)

---

### Add Environment Variables

Click **Environment** tab and add:

**DATABASE_URL:**

```
postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/cloudtask?sslmode=require
```

**FIREBASE_ADMIN_SDK_JSON:**

1. Open your `serviceAccountKey.json` file
2. Copy the entire JSON content (including `{` and `}`)
3. Paste as value (single line or multiline - both work)

**Example:**

```json
{"type":"service_account","project_id":"cloudtask-abc123","private_key_id":"xyz789","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk@cloudtask.iam.gserviceaccount.com",...}
```

---

### Deploy Backend

1. Click **Create Web Service**
2. Wait for build (5-10 minutes)
3. Watch logs for any errors
4. Deployment URL: `https://cloudtask-backend.onrender.com`

---

### Verify Backend Deployment

```bash
# Test health endpoint
curl https://cloudtask-backend.onrender.com/api/task/test

# Expected response (after 30-50 seconds on first request):
"Task API is working! 🚀"
```

**Note:** Free tier spins down after 15 minutes of inactivity. First request may take 30-50 seconds.

---

## 🎨 Step 3: Frontend Deployment (Vercel)

### Prepare Frontend for Production

Create `.env.production` file in `frontend/` directory:

```env
# API Configuration - Use your Render backend URL
VITE_API_URL=https://cloudtask-backend.onrender.com/api

# Firebase Configuration - Same as development
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### Update Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Add your Vercel domain (you'll get this after deployment):
   - `cloudtask-prod.vercel.app`
   - Or your custom domain

---

### Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import repository

---

### Import Project

1. Click **Add New** → **Project**
2. Import `nakkshh/cloudtask` repository
3. Click **Import**

---

### Configure Project

**Framework Preset:** Vite (auto-detected)

**Build Settings:**

- **Root Directory:** `frontend`
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `dist` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

---

### Add Environment Variables

Click **Environment Variables** and add all variables from `.env.production`:

```env
VITE_API_URL=https://cloudtask-backend.onrender.com/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note:** Add these for **Production** environment.

---

### Deploy Frontend

1. Click **Deploy**
2. Wait for build (2-3 minutes)
3. Get deployment URL: `https://cloudtask-prod.vercel.app`

---

### Update Backend CORS

After getting Vercel URL, update backend:

1. Go to Render dashboard
2. Select `cloudtask-backend` service
3. Go to **Environment** tab
4. Add new environment variable:

```
CORS_ALLOWED_ORIGINS=https://cloudtask-prod.vercel.app,http://localhost:5173
```

Or update `application.properties` and redeploy:

```properties
cors.allowed.origins=https://cloudtask-prod.vercel.app,http://localhost:5173
```

5. Click **Manual Deploy** → **Deploy latest commit**

---

## ✅ Step 4: Post-Deployment Verification

### Backend Health Check

```bash
# Test backend API
curl https://cloudtask-backend.onrender.com/api/task/test

# Expected (after cold start):
"Task API is working! 🚀"
```

---

### Frontend Verification

1. Visit `https://cloudtask-prod.vercel.app`
2. Should see landing page
3. Click **Register**
4. Create test account
5. Verify redirect to Dashboard

---

### End-to-End Test

**Complete User Flow:**

1. Register new account
2. Create a project
3. Add a task
4. Assign task to yourself
5. Move task through columns
6. Add a member (register another account first)
7. Test role-based permissions

---

### Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Verify no CORS errors
4. Check Network tab for API calls

**If everything works:** ✅ Deployment complete!

---

## 🔄 Continuous Deployment

### Automatic Deployments

**Vercel (Frontend):**

- Auto-deploys on push to `main` branch
- Creates preview deployments for pull requests

**Render (Backend):**

- Auto-deploys on push to `main` branch
- Can disable auto-deploy in settings

---

### Manual Deployment

**Vercel:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel --prod
```

**Render:**

1. Go to Render Dashboard
2. Select your service
3. Click **Manual Deploy**
4. Select **Deploy latest commit**

---

## 🐛 Troubleshooting

### Backend Takes Long to Respond

**Cause:** Render free tier spins down after 15 minutes of inactivity.

**Solution:**

- First request takes 30-50 seconds (cold start)
- Subsequent requests are fast
- Upgrade to Starter plan ($7/month) for always-on

**Keep-Alive Workaround (Free Tier):**

Use a cron job service like [cron-job.org](https://cron-job.org):

- **URL:** `https://cloudtask-backend.onrender.com/api/task/test`
- **Schedule:** Every 10 minutes
- This keeps backend warm (but uses free tier hours)

---

### Database Connection Errors

**Check connection string:**

```bash
# Test connection
psql "postgresql://user:pass@host/cloudtask?sslmode=require"
```

**Common Issues:**

- Missing `?sslmode=require` in connection string
- Wrong username/password
- Database not created

**Verify in Render logs:**

```
# Look for these lines:
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
```

---

### Firebase Auth Not Working

**Check Firebase Console:**

- Authorized domains include your Vercel URL
- Email/Password authentication is enabled
- No API key restrictions blocking your domain

**Check Browser Console:**

```javascript
// Should see Firebase initialized
Firebase initialized successfully
```

---

### CORS Errors

**Symptoms:**

```
Access to fetch at 'https://backend.com/api/...' from origin 'https://frontend.com' 
has been blocked by CORS policy
```

**Fix:**

1. Update `cors.allowed.origins` in backend
2. Redeploy backend
3. Clear browser cache
4. Test in incognito mode

---

### 500 Internal Server Error

**Check Render Logs:**

1. Go to Render Dashboard
2. Click your service
3. Click **Logs** tab
4. Look for stack traces

**Common Causes:**

- Firebase initialization failed (check JSON)
- Database connection failed (check connection string)
- Missing environment variables

---

## 📊 Monitoring

### Render Dashboard

**Monitor:**

- CPU and Memory usage
- Response times
- Error rates
- Logs

**Access:** [dashboard.render.com](https://dashboard.render.com)

---

### Vercel Analytics

**Monitor:**

- Page views
- Performance metrics
- Error tracking
- Web Vitals

**Access:** Vercel Dashboard → Your Project → Analytics

---

### Database (NeonDB)

**Monitor:**

- Connection pool usage
- Query performance
- Storage usage
- Active connections

**Access:** [console.neon.tech](https://console.neon.tech)

---

## 💰 Cost Breakdown

### Free Tier (Current Setup)

| Service | Plan | Cost | Limitations |
|---------|------|------|-------------|
| NeonDB | Free | $0/mo | 0.5 GB storage, 1 project |
| Render | Free | $0/mo | Spins down after 15 min, 750 hours/mo |
| Vercel | Hobby | $0/mo | Unlimited bandwidth, 100 GB/mo |
| Firebase | Spark | $0/mo | 50K reads/day, 20K writes/day |
| **Total** | | **$0/month** | Good for demos & portfolios |

---

### Recommended Production Setup

| Service | Plan | Cost | Benefits |
|---------|------|------|----------|
| NeonDB | Launch | $19/mo | 10 GB storage, automated backups |
| Render | Starter | $7/mo | Always on, no cold starts |
| Vercel | Pro | $20/mo | Custom domains, better analytics |
| Firebase | Blaze | Pay-as-you-go | Only pay for usage |
| **Total** | | **~$46/month** | Production-ready |

---

## 🔐 Security Checklist

Before going live:

- ✅ Environment variables not in Git
- ✅ Firebase service account key secured
- ✅ Database has strong password
- ✅ CORS configured with specific domains (not `*`)
- ✅ HTTPS enabled (automatic on Vercel/Render)
- ✅ Firebase API key restrictions set
- ✅ `.env` files in `.gitignore`
- ✅ No sensitive data in logs
- ✅ Rate limiting enabled (future enhancement)
- ✅ Input validation on all endpoints

---

## 🚀 Performance Optimization

### Backend Optimization

**Hikari Connection Pool:**

```properties
spring.datasource.hikari.maximum-pool-size=2
spring.datasource.hikari.minimum-idle=1
spring.datasource.hikari.connection-timeout=20000
```

**JPA Optimization:**

```properties
spring.jpa.properties.hibernate.jdbc.batch_size=10
spring.jpa.properties.hibernate.order_inserts=true
```

---

### Frontend Optimization

**Vite Build Settings:**

```javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
}
```

---

### Database Optimization

**Add Indexes:**

```sql
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_user_id);
CREATE INDEX idx_project_members_project_id ON project_members(project_id);
```

---

## 🔄 Rollback Procedure

### Rollback Frontend (Vercel)

1. Go to Vercel Dashboard
2. Click your project
3. Go to **Deployments** tab
4. Find previous working deployment
5. Click **⋯** → **Promote to Production**

---

### Rollback Backend (Render)

1. Go to Render Dashboard
2. Click your service
3. Go to **Events** tab
4. Find previous deployment
5. Click **Rollback**

---

## 📚 Additional Resources

- **Setup Guide:** `SETUP.md`
- **API Documentation:** `API.md`
- **Main README:** `../README.md`

---

## 🆘 Need Help?

### Deployment Issues:

- **Render Logs:** Check for build/runtime errors
- **Vercel Logs:** Check for build failures
- **Browser Console:** Check for frontend errors
- **Network Tab:** Check API call responses

---

### Useful Commands:

```bash
# Test backend
curl https://your-backend.onrender.com/api/task/test

# Check database
psql "your-connection-string"

# Deploy frontend manually
cd frontend && vercel --prod
```

---

## ✅ Deployment Complete!

Your CloudTask application is now live! 🎉