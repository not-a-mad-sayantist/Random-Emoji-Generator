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

This project is configured for automated deployment to [Railway](https://railway.app/) via GitHub Actions.

### 1. Railway Setup

Before deploying, you need to set up your project on Railway:

1.  **Create a Project**: Go to [Railway](https://railway.app/) and create a new project.
2.  **Create a Service**: Inside the project, create an empty service. :warning: **Important:** Name the service `emoji-generator`.
    - _If you want to use a different name, update the `--service` flag in `.github/workflows/deploy.yml`._
3.  **Set Environment Variables**: In your Railway Service dashboard, go to the **Variables** tab and add the following:
    - `API_KEY`: (Required) The same key you plan to use for authentication.
    - `PORT`: `3000` (Optional, Railway usually handles this, but good to set).
    - `LOG_LEVEL`: `info` (Optional).
4.  **Generate a Token**:
    - Go to **Project Settings** (or Service Settings for service-scoped token).
    - Under "Tokens", click **Generate a New Token**.
    - Copy this value.

### 2. GitHub Secrets Setup

To enable the CI/CD pipeline, add the following secrets to your GitHub repository:

1.  Go to **Settings** > **Secrets and variables** > **Actions**.
2.  Click **New repository secret**.
3.  Add the following secrets:

    | Name            | Value                | Description                               |
    | :-------------- | :------------------- | :---------------------------------------- |
    | `API_KEY`       | `your_secret_key`    | Required for running tests in CI.         |
    | `RAILWAY_TOKEN` | `your_railway_token` | The token you copied from Railway step 4. |

### 3. Deployment Flow

Once the secrets are set up:

- **Tests**: Runs on every push to `main` and all Pull Requests.
- **Deploy**: Automatically deploys to Railway **only when** the `Tests` workflow passes on the `main` branch.

## 📄 License

This project is [UNLICENSED](LICENSE).
