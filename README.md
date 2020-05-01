[![CircleCI](https://circleci.com/gh/golota60/employee-list-creator.svg?style=shield)](https://circleci.com/gh/golota60/employee-list-creator)

# Setup

1. Download local MongoDB instance (https://www.mongodb.com/download-center/community) and install it locally including MongoDB Compass. 
Open up MongoDB Compass and connect to your database - URI: `mongodb://localhost:27017/admin`. This is your database management console.


2. Clone the repository. Next, in the 'server' directory create a '.env' file. This file will take care of any variables that we don't want to push to the repository, for example DB connection URI or credentials, if we ever want to switch to a different database.


> We're using local MongoDB instance, but this approach allows us to swiftly change to MongoDB Atlas if needed.


3. In the created '.env' file paste the following
```
LOCAL_URI=mongodb://localhost:27017/<DB_NAME>
```
where <DB_NAME> is what you want your local database to be named.

4. Install node.js from `https://nodejs.org/en/download/`

5. Install yarn from `https://classic.yarnpkg.com/en/docs/install`

# Generated Data

The user data is generated from www.json-generator.com with the following code 
```
[
  '{{repeat(500)}}',
  {
    _id: '{{objectId()}}',
    name: '{{firstName()}}',
    surname: '{{surname()}}',
    age: '{{integer(18,65)}}',
    province: '{{random("Leśnica", "Psie Pole", "Polanowice", "Karłowice", "Kowale", "Osobowice", "Nowy Dwór", "Ołbin", "Gaj", "Krzyki", "Klecina", "Maślice", "Kozanów")}}',
    department: '{{random("HR", "Finances", "Real Estate", "Accountancy", "Marketing", "IT")}}'
  }
]
```

# Adding generated data to MongoDB

Once you've got MongoDB installed, open up MongoDB Compass and connect to `mongodb://localhost:27017/admin`. Then, create a database with the same <DB_NAME> you provided in the .env file and collection name `employees`. Then, go to the <DB_NAME> -> employees -> Add Data -> Insert document -> Paste the output you got from the Generated Data section

# Starting

In the root directory of the project run `yarn` to install all the frontend and backend dependencies

```yarn server``` - to run the server

```yarn server:dev``` - if you want the server to reload on changes

```yarn front``` - to run frontend with changes on reload

```yarn all``` - to run backend and frontend simultaneously with reloading on changes

or - if you want backend and frontend to run in separate consoles you might want 
to open up two consoles, in the first one navigate to 'client' and run `yarn start`, and in the second one navigate to 'server' and run `yarn server:dev`

The server is running on port 5000 by default and frontend is running on port 1234.

# Debugging 

To debug backend in Visual Studio Code, simply attach a breakpoint to a line, click F5 - or just go to Run -> Start Debugging. Please note that those shortcuts may be different on your own VSCode configuration.




