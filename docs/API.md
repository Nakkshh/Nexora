# CloudTask API Documentation

## Base URL

**Production:** `https://cloudtask-backend.onrender.com/api`  
**Development:** `http://localhost:8081/api`

## Authentication

All API requests require a Firebase UID passed as a query parameter:

```
?firebaseUid={your-firebase-uid}
```

Obtain the Firebase UID from Firebase Authentication after user login.

---

## Endpoints

### 🏢 Projects

#### Get User Projects

Retrieve all projects where the user is a member.

**Request:**
```http
GET /project/user/{firebaseUid}
```

**Parameters:**
- `firebaseUid` (path) - User's Firebase UID

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Project Alpha",
    "description": "Main project description",
    "createdAt": "2026-01-30T12:00:00",
    "updatedAt": "2026-01-31T15:30:00",
    "ownerFirebaseUid": "abc123xyz"
  }
]
```

---

#### Get Project Details

**Request:**
```http
GET /project/{projectId}?firebaseUid={uid}
```

**Parameters:**
- `projectId` (path) - Project ID
- `firebaseUid` (query) - User's Firebase UID

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Project Alpha",
  "description": "Project description",
  "createdAt": "2026-01-30T12:00:00",
  "ownerFirebaseUid": "abc123xyz"
}
```

**Errors:**
- `403 Forbidden` - User is not a project member
- `404 Not Found` - Project doesn't exist

---

#### Create Project

**Request:**
```http
POST /project?firebaseUid={uid}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description"
}
```

**Response:** `200 OK`
```json
{
  "id": 2,
  "name": "New Project",
  "description": "Project description",
  "createdAt": "2026-01-31T21:40:00",
  "ownerFirebaseUid": "abc123xyz"
}
```

**Notes:**
- User who creates the project automatically becomes OWNER
- A project member entry is created automatically

---

#### Delete Project

**Request:**
```http
DELETE /project/{projectId}?firebaseUid={uid}
```

**Parameters:**
- `projectId` (path) - Project ID
- `firebaseUid` (query) - User's Firebase UID

**Response:** `204 No Content`

**Errors:**
- `403 Forbidden` - Only OWNER can delete projects

---

### 📋 Tasks

#### Get Project Tasks

**Request:**
```http
GET /task/project/{projectId}?firebaseUid={uid}
```

**Parameters:**
- `projectId` (path) - Project ID
- `firebaseUid` (query) - User's Firebase UID

**Response:** `200 OK`
```json
[
  {
    "id": 10,
    "title": "Implement login",
    "description": "Add Firebase authentication",
    "status": "IN_PROGRESS",
    "assigneeUserId": "user123",
    "assigneeName": "John Doe",
    "assigneeEmail": "john@example.com",
    "assignees": [
      {
        "firebaseUid": "user123",
        "name": "John Doe",
        "email": "john@example.com"
      }
    ],
    "createdAt": "2026-01-30T10:00:00",
    "updatedAt": "2026-01-31T14:20:00",
    "assignedAt": "2026-01-31T12:00:00",
    "assignedBy": "owner123"
  }
]
```

---

#### Create Task

**Request:**
```http
POST /task?firebaseUid={uid}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "projectId": 1
}
```

**Response:** `200 OK`
```json
{
  "id": 11,
  "title": "Task title",
  "description": "Task description",
  "status": "TODO",
  "projectId": 1,
  "createdAt": "2026-01-31T21:45:00"
}
```

---

#### Update Task Status

**Request:**
```http
PATCH /task/{taskId}/status?status={newStatus}&firebaseUid={uid}
```

**Parameters:**
- `taskId` (path) - Task ID
- `status` (query) - New status (`TODO`, `IN_PROGRESS`, `DONE`)
- `firebaseUid` (query) - User's Firebase UID

**Response:** `200 OK`
```json
{
  "id": 11,
  "title": "Task title",
  "status": "IN_PROGRESS",
  "updatedAt": "2026-01-31T21:50:00"
}
```

---

#### Assign Task (Single User)

**Request:**
```http
POST /task/{taskId}/assign?requestorFirebaseUid={uid}
Content-Type: application/json
```

**Request Body:**
```json
{
  "assigneeUserId": "user123",
  "assigneeName": "John Doe",
  "assigneeEmail": "john@example.com",
  "assigneePhoto": null
}
```

**Response:** `200 OK`
```json
{
  "id": 11,
  "assigneeUserId": "user123",
  "assigneeName": "John Doe",
  "assigneeEmail": "john@example.com",
  "assignedAt": "2026-01-31T21:55:00",
  "assignedBy": "owner123"
}
```

**Errors:**
- `403 Forbidden` - Only OWNER and ADMIN can assign tasks
- `400 Bad Request` - User is not a project member

---

#### Assign Multiple Users

**Request:**
```http
POST /task/{taskId}/assign-multiple?requestorFirebaseUid={uid}
Content-Type: application/json
```

**Request Body:**
```json
{
  "assignees": [
    {
      "firebaseUid": "user123",
      "name": "John Doe",
      "email": "john@example.com",
      "photoUrl": null
    },
    {
      "firebaseUid": "user456",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "photoUrl": null
    }
  ]
}
```

**Response:** `200 OK`
```json
{
  "id": 11,
  "assignees": [
    {
      "firebaseUid": "user123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "firebaseUid": "user456",
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  ],
  "assignedAt": "2026-01-31T22:00:00"
}
```

**Notes:**
- Pass empty array to unassign all users
- Only OWNER and ADMIN can assign

---

#### Delete Task

**Request:**
```http
DELETE /task/{taskId}?firebaseUid={uid}
```

**Response:** `204 No Content`

---

#### Get My Tasks

**Request:**
```http
GET /task/assignee/{firebaseUid}
```

**Response:** `200 OK`
```json
[
  {
    "id": 10,
    "title": "My assigned task",
    "status": "TODO",
    "projectId": 1
  }
]
```

---

### 👥 Project Members

#### Get Project Members

**Request:**
```http
GET /project/{projectId}/members
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "userId": 5,
    "firebaseUid": "abc123",
    "userEmail": "owner@example.com",
    "displayName": "Project Owner",
    "role": "OWNER",
    "joinedAt": "2026-01-30T10:00:00"
  },
  {
    "id": 2,
    "userId": 7,
    "firebaseUid": "def456",
    "userEmail": "admin@example.com",
    "displayName": "Admin User",
    "role": "ADMIN",
    "joinedAt": "2026-01-30T11:00:00"
  }
]
```

---

#### Add Project Member

**Request:**
```http
POST /project/{projectId}/members?requestorFirebaseUid={uid}
Content-Type: application/json
```

**Request Body:**
```json
{
  "userEmail": "newuser@example.com",
  "role": "MEMBER"
}
```

**Parameters:**
- `role`: One of `MEMBER`, `ADMIN` (OWNER can only be set on project creation)

**Response:** `200 OK`
```json
{
  "id": 3,
  "userEmail": "newuser@example.com",
  "role": "MEMBER",
  "joinedAt": "2026-01-31T22:10:00"
}
```

**Errors:**
- `403 Forbidden` - Only OWNER and ADMIN can add members
- `400 Bad Request` - User doesn't exist or is already a member

---

#### Remove Project Member

**Request:**
```http
DELETE /project/{projectId}/members/{userId}?requestorFirebaseUid={uid}
```

**Response:** `204 No Content`

**Errors:**
- `403 Forbidden` - Only OWNER and ADMIN can remove members
- `400 Bad Request` - Cannot remove OWNER

---

## 🔒 Role-Based Permissions

| Action | OWNER | ADMIN | MEMBER |
|--------|-------|-------|--------|
| View project & tasks | ✅ | ✅ | ✅ |
| Create tasks | ✅ | ✅ | ✅ |
| Update task status | ✅ | ✅ | ✅ |
| Delete tasks | ✅ | ✅ | ✅ |
| Assign tasks | ✅ | ✅ | ❌ |
| Add members | ✅ | ✅ | ❌ |
| Remove members | ✅ | ✅ | ❌ |
| Delete project | ✅ | ❌ | ❌ |

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "error": "User is not a member of this project"
}
```

### 403 Forbidden
```json
{
  "error": "Permission denied. Only OWNER and ADMIN can assign tasks."
}
```

### 404 Not Found
```json
{
  "error": "Task not found with id: 123"
}
```

### 500 Internal Server Error
```json
{
  "error": "An unexpected error occurred"
}
```