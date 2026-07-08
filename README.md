# Nexora <img src="frontend/public/nexora-icon.svg" alt="Nexora" width="40" height="40" style="vertical-align: middle;"/>

> Cloud-native task and project management platform with role-based access control and real-time collaboration.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://nexora-prod.vercel.app)
[![GitHub](https://img.shields.io/badge/github-repository-blue?style=for-the-badge&logo=github)](https://github.com/nakkshh/nexora)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

---

## 🚀 Features

### Core Functionality

- **Multi-User Projects** - Create and collaborate on projects with team members
- **Kanban Board** - Visual task management with TODO, IN PROGRESS, and DONE columns
- **Role-Based Access Control** - Three-tier permission system (OWNER, ADMIN, MEMBER)
- **Multi-Assignee Tasks** - Assign tasks to multiple team members simultaneously
- **Smart Filtering** - Filter tasks by assignee (All, My Tasks, Unassigned, or specific members)
- **Real-Time Updates** - Instant synchronization across all team members

### User Experience

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Secure Authentication** - Firebase Authentication with email/password
- **Modern UI** - Clean, intuitive interface built with Tailwind CSS
- **Fast Performance** - Optimized for speed with Vite and React 18

---

## 🛠️ Tech Stack

### Backend

- **Java 17** - Modern Java with latest features
- **Spring Boot 3.x** - Enterprise-grade backend framework
- **Spring Security** - Robust authentication and authorization
- **Spring Data JPA** - ORM for database operations
- **PostgreSQL** - Relational database for data persistence
- **Firebase Admin SDK** - User authentication integration

### Frontend

- **React 18** - Modern UI library with hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling framework
- **Firebase Auth** - User authentication
- **Vite** - Fast build tool and dev server

### DevOps & Deployment

- **Docker** - Containerization
- **Vercel** - Frontend hosting and CI/CD
- **Render** - Backend hosting
- **NeonDB** - PostgreSQL database hosting
- **GitHub** - Version control

---

## 📖 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[API Documentation](docs/API.md)** - Complete REST API reference with all endpoints
- **[Setup Guide](docs/SETUP.md)** - Step-by-step local development setup
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions

---

## 🎯 Quick Start

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Firebase Account

### Clone Repository

```bash
git clone https://github.com/nakkshh/nexora.git
cd cloudtask
```

---

### Backend Setup

```bash
cd backend/user-service

# Configure application.properties with your database and Firebase credentials
# See docs/SETUP.md for detailed instructions

mvn clean install
mvn spring-boot:run
```

Backend runs on `http://localhost:8081`

---

### Frontend Setup

```bash
cd frontend

# Create .env file with Firebase configuration
# See docs/SETUP.md for detailed instructions

npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

**For detailed setup instructions, see [docs/SETUP.md](docs/SETUP.md)**

---

## 🌐 Live Demo

- **Frontend:** [https://nexora-prod.vercel.app](https://nexora-prod.vercel.app)
- **Backend API:** [https://cloudtask-backend.onrender.com/api](https://cloudtask-backend.onrender.com/api)

**Note:** Backend may take 30-50 seconds to wake up on first request (free tier)

### Test the Demo

1. Visit the live demo
2. Register a new account
3. Create your first project
4. Add tasks and team members
5. Try the multi-assignee feature
6. Test different user roles

---
<!-- 
## 📸 Screenshots

### Landing Page

Modern, clean landing page with authentication

### Dashboard

Overview of all your projects with quick actions

### Kanban Board

Visual task management with drag-and-drop (coming soon)

### Multi-Assignee

Assign tasks to multiple team members with stacked avatars

### Role-Based Access

Different permissions for OWNER, ADMIN, and MEMBER roles

--- -->

## 🔑 Key Features in Detail

### Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| OWNER | Full project control, can delete project |
| ADMIN | Can manage members and assign tasks |
| MEMBER | Can view and update tasks (read-only for assignments) |

---

### Multi-Assignee System

- Assign tasks to multiple team members
- Visual stacked avatars for quick identification
- Filter tasks by individual assignees
- Real-time updates when assignments change

---

### Task Management

- Create, update, and delete tasks
- Move tasks between columns (TODO → IN PROGRESS → DONE)
- Add descriptions and metadata
- Track assignment history

---

### Smart Filtering

- **All Tasks** - View all project tasks
- **My Tasks** - See only tasks assigned to you
- **Unassigned** - Find tasks that need assignment
- **By Member** - Filter by specific team member

---

## 🗺️ Roadmap

### Phase 13: Advanced Features (Post-Interviews)

- ⬜ Drag-and-drop Kanban board
- ⬜ Real-time collaboration with WebSocket
- ⬜ Task dependencies and subtasks
- ⬜ Due dates and reminders
- ⬜ File attachments
- ⬜ Activity logs and comments
- ⬜ Sprint planning
- ⬜ Analytics dashboard
- ⬜ Email notifications
- ⬜ Calendar integration

---

## 📊 Project Structure

```
cloudtask/
├── backend/
│   └── user-service/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/cloudtask/
│       │   │   │   ├── config/         # Configuration files
│       │   │   │   ├── controller/     # REST controllers
│       │   │   │   ├── entity/         # JPA entities
│       │   │   │   ├── repository/     # Data repositories
│       │   │   │   ├── service/        # Business logic
│       │   │   │   └── dto/            # Data transfer objects
│       │   │   └── resources/
│       │   │       └── application.properties
│       │   └── test/                   # Unit tests
│       └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── auth/                       # Firebase auth
│   │   ├── components/                 # React components
│   │   ├── pages/                      # Page components
│   │   ├── services/                   # API services
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── docs/
│   ├── API.md                          # API documentation
│   ├── SETUP.md                        # Setup guide
│   └── DEPLOYMENT.md                   # Deployment guide
└── README.md
```

---

## 🧪 Testing

### Backend Testing

```bash
cd backend/user-service
mvn test
```

---

### Frontend Testing

```bash
cd frontend
npm run test
```

---

### Manual Testing Checklist

- ✅ User registration and login
- ✅ Project creation and deletion
- ✅ Task CRUD operations
- ✅ Multi-user assignment
- ✅ Role-based permissions
- ✅ Task filtering
- ✅ Member management
- ✅ Responsive design on mobile

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Nakkshh**

- GitHub: [@nakkshh](https://github.com/nakkshh)
- Email: nakshtrjain25@gmail.com
- LinkedIn: [nakshatra-jain-b345a0308](https://www.linkedin.com/in/nakshatra-jain-b345a0308/)
<!-- - Portfolio: [Your Portfolio](https://yourportfolio.com) -->

---

## 🙏 Acknowledgments

- Built with ❤️ using Spring Boot and React
- Deployed on Vercel, Render, and NeonDB
- Icons from [Heroicons](https://heroicons.com)
- Inspiration from modern task management tools

---

## 📞 Support

If you have any questions or need help:

- 📧 **Email:** nakshtrjain25@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/nakkshh/nexora/issues)
- 📖 **Docs:** Check the `docs/` folder

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on [GitHub](https://github.com/nakkshh/nexora)!

---

**Made with ❤️ by Nakkshh**