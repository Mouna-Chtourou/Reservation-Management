# Projet PFE avec MERN Stack
## Application web de gestion de réservation des salles de réunion

## Requirements 
* Node.js (v14.19.0) https://nodejs.org/en/
* Mongodb (shell version v3.6.8) https://www.mongodb.com/docs/manual/administration/install-community/

## Installation
1. Clone repo
```
$ git clone https://github.com/Mouna-Chtourou/PFE.git
$ cd PFE-main
```
2. Backend Configuration
```
$ cd server
$ npm install
```

3. Frontend Configuration
```
$ cd client
$ npm install
```
4. Create a cluster in mongodb than create an empty database

5. Copy .env.example to .env
6. Set up database MBD_CONNECT in: /.env with your own cluster configuration and database name
7. Update those **.env** variable in order to setup the email config:
```
$ EMAIL = 
$ PASS =

 ```

8. Run Backend
```
$ cd server
$ nodemon index.js
```
9. Run Frontend
```
$ cd client
$ npm start
```