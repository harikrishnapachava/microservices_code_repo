# nodeapp
NodeJS sample app with containerization. Express is used for app server. Currently for [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) Users, Books section is available. `node-cache` is used for storing added entities as temporary work around for persistance database.

## Build
For development
```shell
npm run dev
```

## Docker repository



### Tags
- 

## Run
Using docker
```shell
docker run -d -p 80:80 harikrishnapachava/nodeapp
```
Open http://localhost

From source
```shell
npm run build && npm start
```
Open http://localhost:8080
