# Animapp
A Vue.js / Express.js web application for keeping journals of anime

# Download

Public users can clone it using:
```
git clone https://dbmspublic:12345678@gitlab.com/dbms2k15/animapp.git
```

# Fetch the database for the software:

```
git clone https://dbmspublic:12345678@gitlab.com/dbms2k15/json2sql.git
```
Assuming the mysql server contains an user 'user' with password 'password', the backend code fetchees data from database 'anime'.<br>
Having fulfilled this config, you can dump the data into the mysql database, using:
mysql -u user -p anime < ./json2sql/anime.sql

# Setup

You need to have Node Js installed: https://nodejs.org/en/
Alternatively, you can also use yarn: https://yarnpkg.com/en/docs/install

You must at least have **NODE version 8.2.1**

1. Using npm

### Client - Terminal A
```
cd client
npm
npm start
```

### Server - Terminal B
```
cd server
npm
npm start
```

2. Using yarn

### Client - Terminal A
```
cd client
yarn
yarn run start
```

### Server - Terminal B
```
cd server
yarn
yarn run start
```
