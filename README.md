# Gdziegramy web-app
Web app made using Node.js, sequelize, MySQL, React, leaflet and bootstrap  
This web-app allows user to create sports events, add new courts, become participant in existing events etc


## Prerequesites
* MySQL
* Node.js

## Setup MySQL database
To setup MySQL databse we need to run following commands from `database` directory ( `root` should be replaced with MySQL server username )
```
mysql -u root -p
CREATE DATABASE gdziegramy;
USE gdziegramy;
SOURCE gdziegramy.sql
```
## Build and run project
### Build
To build project following commands should be run from project directory:
```
npm install 

cd front-end

npm install 
```
In order to work properly, `config.js` file in `src/model` should be edited with correct username and password of MySQL user  
***
### Run
To run this project following commands should be run from project directory:
```
npm start
```
And in another terminal
```
cd front-end

npm start
```
Now API is working on `localhost:5000` and UI is working on `localhost:3000`
***


