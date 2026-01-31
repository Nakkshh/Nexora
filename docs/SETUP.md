# CloudTask Setup Guide

Complete guide for setting up CloudTask locally for development.

---

## Prerequisites

### Required Software

- **Java 17+** - [Download from Adoptium](https://adoptium.net/)
- **Node.js 18+** and npm - [Download from nodejs.org](https://nodejs.org/)
- **PostgreSQL 14+** - [Download from postgresql.org](https://www.postgresql.org/download/)
- **Git** - [Download from git-scm.com](https://git-scm.com/)
- **Firebase Account** - [Create at firebase.google.com](https://firebase.google.com/)

### Recommended Tools

- **IntelliJ IDEA** or **VS Code** for development
- **Postman** or **Thunder Client** for API testing
- **pgAdmin** or **DBeaver** for database management

---

## 🔧 Backend Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/nakkshh/cloudtask.git
cd cloudtask
```

---

### Step 2: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project**
3. Enter project name: `cloudtask`
4. Disable Google Analytics (optional)
5. Click **Create Project**

**Enable Authentication:**

1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Click **Save**

**Generate Service Account Key:**

1. Go to **Project Settings** (⚙️ icon)
2. Click **Service Accounts** tab
3. Click **Generate New Private Key**
4. Click **Generate Key**
5. Save the JSON file as `serviceAccountKey.json`

---

### Step 3: Setup PostgreSQL Database

**Create Database:**

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE cloudtask;

-- Create user (optional)
CREATE USER cloudtask_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE cloudtask TO cloudtask_user;

-- Exit
\q
```

---

### Step 4: Configure Backend

**Location:** `backend/user-service/src/main/resources/`

**Create `application.properties` file:**

```properties
# Server Configuration
server.port=8081

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/cloudtask
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Firebase Configuration
firebase.admin.sdk.path=src/main/resources/serviceAccountKey.json

# CORS Configuration
cors.allowed.origins=http://localhost:5173,https://cloudtask-prod.vercel.app

# Hikari Connection Pool
spring.datasource.hikari.maximum-pool-size=5
spring.datasource.hikari.minimum-idle=2
spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.idle-timeout=300000
```

**Add Firebase Service Account:**

1. Copy `serviceAccountKey.json` to `backend/user-service/src/main/resources/`
2. Verify file location: `backend/user-service/src/main/resources/serviceAccountKey.json`

**Add to `.gitignore`:**

```
**/serviceAccountKey.json
```

---

### Step 5: Run Backend

**Using Maven:**

```bash
cd backend/user-service

# Clean and install dependencies
mvn clean install

# Run application
mvn spring-boot:run
```

**Using Maven Wrapper:**

```bash
cd backend/user-service

# Clean and install
./mvnw clean install

# Run application
./mvnw spring-boot:run
```

**Backend will start on:** `http://localhost:8081`

**Verify Backend:**

```bash
curl http://localhost:8081/api/task/test
```

**Expected Response:** `"Task API is working! 🚀"`

---

## 🎨 Frontend Setup

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

---

### Step 2: Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (⚙️ icon)
4. Scroll to **Your apps** section
5. Click **Web app** icon (`</>`)
6. Register app with name: `CloudTask Web`
7. Copy the configuration values

---

### Step 3: Configure Frontend

**Create `.env` file in `frontend/` directory:**

```env
# API Configuration
VITE_API_URL=http://localhost:8081/api

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Example:**

```env
VITE_API_URL=http://localhost:8081/api
VITE_FIREBASE_API_KEY=AIzaSyAbc123DefGhi456JklMno789
VITE_FIREBASE_AUTH_DOMAIN=cloudtask-abc123.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cloudtask-abc123
VITE_FIREBASE_STORAGE_BUCKET=cloudtask-abc123.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

---

### Step 4: Run Frontend

```bash
cd frontend
npm run dev
```

**Frontend will start on:** `http://localhost:5173`

**Access the app:** Open browser and go to `http://localhost:5173`

---

## ✅ Verify Installation

### Test Backend API

```bash
# Test health endpoint
curl http://localhost:8081/api/task/test

# Expected: "Task API is working! 🚀"
```

---

### Test Frontend

1. Open `http://localhost:5173` in browser
2. Click **Register** button
3. Create account:
   - Email: `test@example.com`
   - Password: `Test@123`
4. Should redirect to Dashboard

---

### Test Full Flow

**Complete User Journey:**

1. Register a new account
2. Create a new project
3. Add a task to the project
4. Assign the task to yourself
5. Move task from TODO → IN_PROGRESS → DONE
6. Filter tasks by assignee

**If all steps work:** ✅ Setup is complete!

---

## 🐛 Troubleshooting

### Backend Issues

#### Port 8081 Already in Use

**Windows:**

```bash
# Find process using port 8081
netstat -ano | findstr :8081

# Kill process (replace <PID> with actual PID)
taskkill /PID <PID> /F
```

**Mac/Linux:**

```bash
# Find and kill process using port 8081
lsof -ti:8081 | xargs kill -9
```

---

#### Database Connection Failed

**Check PostgreSQL is running:**

```bash
# Mac/Linux
sudo service postgresql status

# Windows
# Check Services app for PostgreSQL service
```

**Verify database exists:**

```bash
psql -U postgres -c "\l"
```

**Test connection:**

```bash
psql -U postgres -d cloudtask
```

---

#### Firebase Initialization Failed

**Check file path:**

```bash
# Verify file exists
ls backend/user-service/src/main/resources/serviceAccountKey.json
```

**Verify JSON is valid:**

1. Open `serviceAccountKey.json`
2. Ensure it's valid JSON
3. Check for any missing quotes or commas

---

### Frontend Issues

#### Module Not Found

```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

#### Firebase Auth Not Working

**Check `.env` file:**

- Verify all Firebase config values are correct
- No quotes around values
- No trailing spaces

**Check browser console:**

1. Open DevTools (F12)
2. Look for Firebase errors
3. Verify API calls are being made

---

#### API Calls Failing (CORS Error)

**Update `application.properties`:**

```properties
cors.allowed.origins=http://localhost:5173
```

Restart backend after changes.

---

#### 403 Forbidden Errors

**Check:**

- Firebase UID is being passed in API calls
- User is a member of the project
- User has correct role (OWNER/ADMIN for assignments)

---

## 📦 Database Schema

Tables created automatically by JPA:

```sql
-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_firebase_uid VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Members table
CREATE TABLE project_members (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, user_id)
);

-- Tasks table
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'TODO',
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    assignee_user_id VARCHAR(255),
    assignee_name VARCHAR(255),
    assignee_email VARCHAR(255),
    assignees_json TEXT,
    assigned_at TIMESTAMP,
    assigned_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Note:** No need to run these manually - JPA creates them automatically on first run.

---

## 🔍 View Database Tables

```sql
-- Connect to database
psql -U postgres -d cloudtask

-- List all tables
\dt

-- View users
SELECT * FROM users;

-- View projects
SELECT * FROM projects;

-- View project members
SELECT * FROM project_members;

-- View tasks
SELECT * FROM tasks;

-- Exit
\q
```

---

## 🔄 Next Steps

### Add Test Data

1. Register multiple user accounts
2. Create 2-3 projects
3. Add members with different roles (OWNER, ADMIN, MEMBER)
4. Create tasks and assign them
5. Test filtering and permissions

---

### Test RBAC

1. Login as OWNER → Verify full access
2. Login as ADMIN → Verify can assign tasks
3. Login as MEMBER → Verify read-only for assignments

---

### Test Multi-Assign

1. Create a task
2. Assign to multiple members
3. Verify stacked avatars appear
4. Filter by specific assignee

---

## 📚 Additional Resources

- **API Documentation:** `docs/API.md`
- **Deployment Guide:** `docs/DEPLOYMENT.md`
- **Main README:** `../README.md`

---

## 🆘 Need Help?

### Common Commands:

```bash
# Backend
cd backend/user-service
mvn clean install
mvn spring-boot:run

# Frontend
cd frontend
npm install
npm run dev

# Database
psql -U postgres -d cloudtask
```

---

### Check Logs:

- **Backend:** Terminal where `mvn spring-boot:run` is running
- **Frontend:** Browser DevTools Console (F12)
- **Database:** `tail -f /var/log/postgresql/postgresql.log`