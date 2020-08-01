# Volition

## Development

### Database

First run postgres on your local machine. 

Pull the image from [Docker Hub](https://hub.docker.com/_/postgres) and run:

```
$ docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres
```

This will start a database server on port 5432. Install [pgAdmin](https://www.pgadmin.org/), connect to the running server and manually create a database named 'taskmanagement'.

### Back End

```
$ cd be
$ yarn start:dev
```

### Front end

```
$ cd fe
$ ng serve
```

Open: `http://localhost:4200/`.

For additional information on specific topics, view the documentation:

- [Creating a new user](./docs/new_user.md)
