<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <h1>NestJS Random Emoji API</h1>
</p>

A robust NestJS microservice that serves random or specific emojis via a RESTful API.

## 🚀 Features

- **Random Emoji Retrieval**: Get a random emoji on demand.
- **Indexed Access**: Retrieve a specific emoji by its index in the collection.
- **Robust Validation**: Includes input validation pipes to handle edge cases.
- **CI/CD Integrated**: Automated testing and deployment workflows using GitHub Actions and Railway.
- **100% Test Coverage**: Fully tested codebase.

## 🛠️ Installation

```bash
$ pnpm install
```

## ⚙️ Configuration

The application requires environment variables to run correctly.

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and configure your settings:

   ```bash
   PORT=3000
   HOST=0.0.0.0
   LOG_LEVEL=info
   API_KEY=your_secret_api_key  # Can be any random string, required for auth
   ```

   > **Important:** The `API_KEY` defined here must be passed in the `x-api-key` header for all protected API requests.

## 🏃 Running the app

Ensure you have set up your `.env` file before running the application.

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 🧪 Tests

> **Note:** Tests require the `API_KEY` environment variable to be set. This is automatically handled if you have configured your `.env` file correctly, or you can pass it inline.

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 📚 API Reference

### Get Hello

Returns a simple greeting.

- **URL**: `/`
- **Method**: `GET`
- **Headers**:
  - `x-api-key` (required): Must match the `API_KEY` environment variable.
- **Response**: `Hello World!`

### Get Emoji

Returns a random emoji or a specific emoji if an index is provided.

- **URL**: `/emoji`
- **Method**: `GET`
- **Headers**:
  - `x-api-key` (required): Must match the `API_KEY` environment variable.
- **Query Parameters**:
  - `index` (optional): The numeric index of the emoji to retrieve.
- **Response**:
  ```json
  {
    "emoji": "😎"
  }
  ```

## 🚀 Deployment & CI/CD

This project uses **GitHub Actions** for Continuous Integration and Continuous Deployment.

### GitHub Actions Secrets

To ensure the CI/CD pipeline runs successfully, you must add the following **Repository Secret** in your GitHub repository settings:

- **Name**: `API_KEY`
- **Value**: Your chosen secret key (can be a generated UUID or any secure string).

### Deployment Flow

- **Tests**: Runs on every push to `main` and all Pull Requests. Requires `API_KEY` secret.
- **Deploy**: Automatically deploys to [Railway](https://railway.app/) only when the `Tests` workflow passes on the `main` branch.

## 📄 License

This project is [UNLICENSED](LICENSE).
