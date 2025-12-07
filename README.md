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

## 🏃 Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 🧪 Tests

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
- **Response**: `Hello World!`

### Get Emoji

Returns a random emoji or a specific emoji if an index is provided.

- **URL**: `/emoji`
- **Method**: `GET`
- **Query Parameters**:
  - `index` (optional): The numeric index of the emoji to retrieve.
- **Response**:
  ```json
  {
    "emoji": "😎"
  }
  ```

## 🚀 Deployment

This project is configured for automated deployment to [Railway](https://railway.app/) via GitHub Actions.

- The `Deploy` workflow runs on success of the `Tests` workflow on the `main` branch.
- It builds the application and deploys it using the Railway CLI.

## 📄 License

This project is [UNLICENSED](LICENSE).
