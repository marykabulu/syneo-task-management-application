# Syneo Task Management Application

This is a task management application built with Angular 17 and Angular Material.

## Features

- User Authentication (Login, Register, Forgot Password)
- Task Management (Create, Read, Update, Delete)
- Dashboard with Task Overview
- Modern and Responsive UI

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
│   ├── components/      # All components
│   ├── guards/         # Route guards
│   ├── interceptors/   # HTTP interceptors
│   ├── services/       # Services
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/            # Static assets
└── environments/      # Environment configurations
```

## API Configuration

The application expects a backend API running at:
- Development: `http://localhost:3000/api`
- Production: `https://api.example.com/api`

Update the API URLs in `src/environments/environment.ts` and `environment.prod.ts` accordingly.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
