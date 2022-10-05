# Welcome to NodeJs boiler plate repo.


This is a boiler plate repo for NodeJs. It contains the following:

- API routes with versioning
- Morgan logger to log incoming requests
- Winston logger to log success and error responses
- Prettier and eslint configuration
- Vscode settings
- Recommended vscode extensions
- A boilerplate with DRY approach
- .ENV file for environment variables
- Response helpers which makes response types same for all responses

# Setup
- First clone the repo
	```https://github.com/bhumit070/node-boilerplate-js.git```
- then if you prefer run
	```yarn```
or if you prefer <b>npm</b> then run
	``` rm yarn.lock && npm i```
- To start development server run ```yarn dev``` or ```npm run dev```
- To start production server run ```yarn start``` or ```npm run start```

# Dependencies
	- express ( to make http server )
	- cors ( to enable cors for frontend )
	- dotenv ( to mange all environment variables )
	- joi ( to validate request body )
	- morgan ( to log incoming requests )
	- Winston ( to log success and error responses )
	- ioredis ( to connect to redis )
	- mongoose ( to connect to mongodb )

# Dev Dependencies
	- nodemon ( to restart server on file changes )
	- prettier ( to format code )
	- eslint ( to lint code )
<hr />