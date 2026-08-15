# NestJS Boilerplate

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  A production-ready <a href="http://nodejs.org" target="_blank">Node.js</a> boilerplate built with <a href="https://github.com/nestjs/nest" target="_blank">NestJS</a> (TypeScript), pre-configured with linting, formatting, unit and e2e testing.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://github.com/brodkinc/nestjs-boilerplate" target="_blank"><img src="https://img.shields.io/github/stars/brodkinc/nestjs-boilerplate.svg" alt="GitHub stars" /></a>
</p>

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the app](#running-the-app)
- [Tests](#tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Clean, modular architecture ready to be extended.
- Strict TypeScript configuration.
- ESLint with Prettier integration for consistent code style.
- Unit tests with [Jest](https://jestjs.io/) and e2e tests with [Supertest](https://github.com/ladjs/supertest).
- Standard NestJS 11 setup with Express.

## Technologies

- [NestJS](https://nestjs.com) 11
- [TypeScript](https://www.typescriptlang.org) 5
- [Jest](https://jestjs.io)
- [ESLint](https://eslint.org) & [Prettier](https://prettier.io)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) `>= 20`
- [npm](https://www.npmjs.com)

### Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Tests

```bash
# unit tests
$ npm run test

# watch mode
$ npm run test:watch

# test coverage
$ npm run test:cov

# e2e tests
$ npm run test:e2e

# debug mode
$ npm run test:debug
```

## Lint and format

```bash
# lint (with autofix)
$ npm run lint

# format
$ npm run format
```

## Project Structure

```
src/
├── app.controller.ts    # Base controller
├── app.controller.spec.ts  # Controller unit test
├── app.module.ts        # Root module
├── app.service.ts       # Base service
└── main.ts              # Application entry point
test/
├── app.e2e-spec.ts      # E2E tests
└── jest-e2e.json        # E2E test config
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a pull request.

## License

This project is [MIT licensed](LICENSE).
