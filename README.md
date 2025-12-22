<p align="center">
  <img src="screenshots/logo-full.svg" alt="TypingFast Logo" width="300"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
  <img src="https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white" alt="Railway"/>
</p>

<h1 align="center">⌨️ TypingFast</h1>

<p align="center">
  <strong>Master Your Typing Speed</strong><br/>
  A modern, distraction-free typing practice platform to improve your typing speed and accuracy.
</p>

<p align="center">
  <a href="https://thetypingfast.vercel.app">
    <img src="https://img.shields.io/badge/🔗_Live_Demo-Visit_Here-blue?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"/>
  <img src="https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red.svg?style=flat-square" alt="Open Source"/>
</p>

---

## 📸 Screenshots

### 🏠 Landing Page
A clean, modern landing page with an interactive keyboard animation to get you started.

<p align="center">
  <img src="screenshots/landing-page.png" alt="Landing Page" width="800"/>
</p>

### 📝 Sign Up
Create an account to track your progress and compete with others.

<p align="center">
  <img src="screenshots/signup.png" alt="Sign Up" width="800"/>
</p>

### ⌨️ Typing Practice
Practice with customizable word counts (15, 30, 50, or 100 words) and track your WPM, accuracy, and time in real-time.

<p align="center">
  <img src="screenshots/typing-practice.png" alt="Typing Practice" width="800"/>
</p>

### 🏆 Test Complete
Get detailed results after each test with WPM, accuracy, errors, and time taken.

<p align="center">
  <img src="screenshots/test-complete.png" alt="Test Complete" width="800"/>
</p>

### 📊 Dashboard (Dark Mode)
View your comprehensive statistics including Best WPM, Average WPM, Accuracy, Total Tests, and Recent Performance.

<p align="center">
  <img src="screenshots/dashboard-dark.png" alt="Dashboard Dark Mode" width="800"/>
</p>

### 📊 Dashboard (Light Mode)
The same powerful dashboard with a clean light theme.

<p align="center">
  <img src="screenshots/dashboard-light.png" alt="Dashboard Light Mode" width="800"/>
</p>

---

## ✨ Features

- 🎯 **Real-time Typing Tests** - Practice with randomly generated text
- 📈 **Performance Tracking** - Track your WPM, accuracy, and errors
- 📊 **Personal Dashboard** - View your progress and statistics over time
- 🔐 **User Authentication** - Secure login/signup with JWT
- 🌙 **Dark/Light Mode** - Toggle between themes for comfortable typing
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Customizable Tests** - Choose between 15, 30, 50, or 100 words

---

## 🛠 Tech Stack

### Backend
| Technology | Description |
|------------|-------------|
| ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white) | Java-based backend framework |
| ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat-square&logo=mysql&logoColor=white) | Relational database for storing user data |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) | Secure authentication tokens |

### Frontend
| Technology | Description |
|------------|-------------|
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | Modern JavaScript UI library |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) | Type-safe JavaScript |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Fast build tool and dev server |

### DevOps & Deployment
| Technology | Description |
|------------|-------------|
| ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat-square&logo=docker&logoColor=white) | Containerization for consistent environments |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | Frontend hosting platform |
| ![Railway](https://img.shields.io/badge/Railway-131415?style=flat-square&logo=railway&logoColor=white) | Backend & database hosting |
| ![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white) | Version control & collaboration |

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+** - [Download](https://adoptium.net/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Docker** (optional) - [Download](https://docker.com/)
- **MySQL** - [Download](https://mysql.com/)

### 🐳 Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/StrongBunny07/TypingFast.git
cd TypingFast

# Start all services
docker-compose up -d
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

### 💻 Manual Setup

#### Backend Setup

```bash
# Navigate to project root
cd TypingFast

# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/typingfast
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_key
```

---

## 📁 Project Structure

```
TypingFast/
├── 📂 src/                    # Spring Boot backend source
│   ├── 📂 main/
│   │   ├── 📂 java/
│   │   │   └── 📂 com/typingfast/app/
│   │   │       ├── 📂 config/       # Configuration classes
│   │   │       ├── 📂 controller/   # REST API endpoints
│   │   │       ├── 📂 model/        # Entity classes
│   │   │       ├── 📂 repository/   # Data access layer
│   │   │       ├── 📂 security/     # JWT & authentication
│   │   │       └── 📂 service/      # Business logic
│   │   └── 📂 resources/
│   │       └── application.properties
├── 📂 frontend/               # React frontend
│   ├── 📂 src/
│   │   ├── 📂 components/     # Reusable UI components
│   │   ├── 📂 pages/          # Page components
│   │   ├── 📂 context/        # React context providers
│   │   └── 📂 services/       # API service layer
├── 📂 init-db/                # Database initialization scripts
├── 📄 docker-compose.yml      # Docker orchestration
├── 📄 Dockerfile              # Backend Docker image
└── 📄 pom.xml                 # Maven dependencies
```

---

## 🤝 Contributing

We love contributions! TypingFast is **open source** and we welcome developers of all skill levels to help make it better.

### How to Contribute

1. **🍴 Fork the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/TypingFast.git
   ```

2. **🌿 Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **💻 Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

4. **✅ Commit Your Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **📤 Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **🔀 Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Describe your changes

### 💡 Contribution Ideas

- 🐛 **Bug Fixes** - Found a bug? Help us squash it!
- ✨ **New Features** - Have an idea? We'd love to hear it!
- 📝 **Documentation** - Help improve our docs
- 🎨 **UI/UX Improvements** - Make the app more beautiful
- ⚡ **Performance** - Help us make it faster
- 🌐 **Translations** - Help localize the app

### 📋 Code of Conduct

Please be respectful and inclusive. We're all here to learn and build something awesome together!

---

## 🙏 Acknowledgments

- Thanks to all our [contributors](https://github.com/StrongBunny07/TypingFast/graphs/contributors)
- Inspired by typing practice platforms like MonkeyType and TypeRacer
- Built with ❤️ using Spring Boot and React

---

<p align="center">
  <strong>⭐ Star this repo if you find it helpful!</strong>
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/StrongBunny07">StrongBunny07</a>
</p>

<p align="center">
  <a href="https://github.com/StrongBunny07/TypingFast/issues">Report Bug</a> •
  <a href="https://github.com/StrongBunny07/TypingFast/issues">Request Feature</a>
</p>
