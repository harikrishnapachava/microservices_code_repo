# nodeapp
ReactJS sample app with containerization. Webpack is used for bundling. Bootstrap, font-awesome, Sass is used for styling. Babel is used for ES6 support. React-router is used for routing. Utilities like React helmet, Nprogress, lodash are also used.

Currently for [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) Users, Books section is available. It has back-end dependecy on [nodeapp](https://github.com/harikrishnapachava/microservices_code_repo).

## Build
For development
```shell
npm run dev
```
For webpack bundle (in /dist directory)
```shell
npm run build
```

## Docker repository


### Tags
- 

## Run
Using docker
```shell
docker run -d -p 80:80 harikrishnapachava/reactapp
```

Open http://localhost
