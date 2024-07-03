<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Stack tecnology
* Nestjs
* MongoDb

## Run in development

1. Clone repository
2. cd " ./pokedex "
3. Installation

```bash
$ yarn install
```
4. Have Nest CLI ready

```bash
$ npm i -g @nest/cli
```
5. Init data base
```bash
$ docker-compose up -d
```
6. Copy ```__.env.template``` file and remane file like ```__.env``` 

7. Add pokemon data

- [ localhost:3000/api/v2/pokemon/](http://localhost:3000/api/v2/seed)


## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

