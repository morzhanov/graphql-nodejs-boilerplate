# graphql-nodejs-boilerplate

<img src="https://i.imgur.com/B7x0zvj.png"/>

GraphQL NodeJS Boilerplate allows you to start new server side web project from scratch using NodeJS, Express, GraphQL and Typescript.

Also this boilerplate contains babel configuration to use all lates ES7+ features.

This is a backend part of GraphQL boilerplate projects. You can also review <a href="https://github.com/VladMorzhanov/graphql-react-boilerplate">graphql-react-boilerplate</a> to see how things works on the client side.

## Installation

Use these steps to install project

### Postgres DB

This boilerplate based on PostgreSQL database, but you can easily change it to any other preferable database. Project uses TypeORM as ORM for your database.

You can install Docker postgress image:

> docker run -p 5434:5434 --name graphql_boilerplate_db -d postgres:latest

Than you should create database `graphql_boilerplate`

Dont forget to add Postgres connection credentials to .env file

Example .env file:

```
DB_HOST=localhost
DB_PORT=32768
DB_USERNAME=postgres
DB_PASSWORD=
DB_DATABASE=graphql_boilerplate
```

For local development use: `yarn run start`

To build project run: `yarn run build`

To serve built files run: `yarn run serve`

# Main Technologies and libraries

- NodeJS
- GraphQL
- Express
- Typescript
- TypeORM
- Postgres
- JWT
- Lodash

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

Vlad Morzhanov

## License

#### (The MIT License)

Copyright (c) 2018 Vlad Morzhanov.
You can review license in the LICENSE file.
