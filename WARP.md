# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a NestJS TypeScript application. The project uses `pnpm` as the package manager and follows standard NestJS architectural patterns with modules, controllers, services, and dependency injection.

## Essential Commands

### Development
```bash
pnpm install              # Install dependencies
pnpm run start:dev        # Start in watch mode (most common for development)
pnpm run start:debug      # Start with debugging enabled
pnpm run build            # Build the application
pnpm run start:prod       # Run production build
```

### Testing
```bash
pnpm run test             # Run unit tests
pnpm run test:watch       # Run unit tests in watch mode
pnpm run test:cov         # Run tests with coverage
pnpm run test:e2e         # Run e2e tests
pnpm run test:debug       # Debug tests
```

### Code Quality
```bash
pnpm run lint             # Run ESLint with auto-fix
pnpm run format           # Format code with Prettier
```

## Architecture

### NestJS Module System
The application follows NestJS's modular architecture:
- **Modules** (`*.module.ts`): Organize application structure, define imports/exports, register controllers and providers
- **Controllers** (`*.controller.ts`): Handle HTTP requests and routing using decorators (`@Controller`, `@Get`, etc.)
- **Services** (`*.service.ts`): Contain business logic, marked with `@Injectable()` for dependency injection
- **Main entry** (`src/main.ts`): Bootstraps the application and starts the HTTP server on port 3000 (or `process.env.PORT`)

### Dependency Injection
NestJS uses constructor-based dependency injection. Services are provided at the module level and injected into controllers/other services via constructors.

### Testing Structure
- **Unit tests**: Co-located with source files as `*.spec.ts` in `src/` directory
- **E2E tests**: Located in `test/` directory as `*.e2e-spec.ts`
- **Test configuration**: Uses Jest with separate configs for unit (in `package.json`) and e2e tests (`test/jest-e2e.json`)
- **E2E testing**: Uses `supertest` for HTTP testing and `@nestjs/testing` for test module creation

## TypeScript Configuration

The project uses strict TypeScript settings:
- Module system: `nodenext` with modern ES module resolution
- Target: ES2023
- Decorators enabled (`experimentalDecorators`, `emitDecoratorMetadata`)
- Strict null checks and type checking enabled
- Output directory: `dist/`

## Linting and Formatting

- **ESLint**: Uses flat config (`eslint.config.mjs`) with TypeScript ESLint and Prettier integration
- **Prettier**: Configured via `.prettierrc` with auto end-of-line handling
- Notable ESLint rules:
  - `@typescript-eslint/no-explicit-any`: disabled
  - `@typescript-eslint/no-floating-promises`: warning
  - `@typescript-eslint/no-unsafe-argument`: warning

## Adding New Features

When adding new features to this NestJS application:
1. Create a new module using `nest generate module <name>` or manually
2. Add controllers with `nest generate controller <name>` or manually
3. Add services with `nest generate service <name>` or manually
4. Register controllers and providers in the appropriate module's `@Module()` decorator
5. Import the new module in `AppModule` if needed
6. Write unit tests (`.spec.ts`) alongside your code
7. Add e2e tests in the `test/` directory if creating new endpoints
