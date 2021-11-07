# Volition

## Development

This project depends on Yarn and Angular CLI to be installed globally.

If you haven't installed it globally use:

```shell
npm install -g yarn
npm install -g @angular/cli
```

### Database

Run:

```shell
$ docker-compose up
```

This will start a database server on port 5432. 

Also, an initial database script (`./dev-initdb.sql`) is run creates the "taskmanagement" table.

### Back End

```shell
$ cd be
$ yarn install # only use this initially
$ yarn start:dev
```

### Front end

```shell
$ cd fe
$ yarn install # only use this initially
$ ng serve
```

Open: `http://localhost:4200/`.

This will open the initial page of the web application. 

## Additional information

For additional information on specific topics, view the documentation:

- [Creating a new user](./docs/new_user.md)
