# Syneo Task Management Application

A comprehensive school management system built with Angular 17 and Angular Material, featuring role-based dashboards for Students, Teachers, Parents, and Administrators.

## Features

### Authentication & Security
- User Authentication (Login, Register, Forgot Password, Email Verification)
- Role-based access control (Student, Teacher, Parent, Admin)
- JWT token-based authentication
- Route guards and HTTP interceptors

### Student Dashboard
- Task management with favorites system
- Assignment tracking and submissions
- Mock exam preparation
- Study plans with AI-powered examples
- Grade tracking and performance analytics
- Newsletter and announcements

### Teacher Dashboard
- Class management and student oversight
- AI Educator Portal (quiz generation, rubrics, lesson plans)
- Student insights and performance tracking
- Parent communication tools (Email, WhatsApp)
- Assignment and homework management
- Stationary list management
- Attendance tracking

### Parent Dashboard
- Child profile and academic progress
- Billing and payment management
- School communication portal
- Schedule and calendar integration
- Real-time notifications

### Admin Control Center
- 9-step student enrollment wizard
- User management and role permissions
- Teacher performance analytics with heatmaps
- Automated billing and scheduling systems
- Class creation with automatic student assignment
- Announcement system with targeted messaging
- Audit logs and system monitoring

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17.2.0)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/syneo-task-management-application.git
cd syneo-task-management-application
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Build

To build the project for production:

```bash
npm run build
```

For Vercel deployment:

```bash
npm run vercel-build
```

The build artifacts will be stored in the `dist/` directory.

## Running Tests

To execute the unit tests:

```bash
npm test
```

## Project Structure

```
src/
├── app/
│   ├── components/          # All UI components
│   │   ├── admin/          # Admin dashboard
│   │   ├── dashboard/      # Student dashboard
│   │   ├── teacher/        # Teacher dashboard
│   │   ├── parent/         # Parent dashboard
│   │   ├── login/          # Authentication
│   │   ├── register/       # User registration
│   │   ├── forgot-password/# Password recovery
│   │   └── verify-code/    # Email verification
│   ├── guards/             # Route guards
│   ├── interceptors/       # HTTP interceptors
│   ├── services/           # Business logic services
│   │   ├── auth.service.ts # Authentication service
│   │   └── task.service.ts # Task management
│   ├── models/             # TypeScript interfaces
│   ├── shared/             # Shared components
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/                 # Static assets
└── environments/           # Environment configurations
```

## API Configuration

The application uses AWS Lambda backend services:

- **Development**: `https://mqofirt5i8.execute-api.af-south-1.amazonaws.com/dev`
- **Production**: `https://api.syneo-task-management.com/api`

API URLs are configured in:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

## Deployment

### Vercel Deployment
The project is configured for Vercel deployment with:
- `vercel.json` - Deployment configuration
- `.vercelignore` - Files excluded from deployment
- Automatic SPA routing support

### Backend Services
The Lambda backend is deployed separately on AWS and provides:
- User authentication and authorization
- Data persistence and retrieval
- Email services for notifications
- File upload and management

## Technology Stack

- **Frontend**: Angular 17, Angular Material, TypeScript
- **Backend**: AWS Lambda, Node.js
- **Authentication**: JWT tokens
- **Styling**: SCSS, Font Awesome icons
- **Deployment**: Vercel (frontend), AWS (backend)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
