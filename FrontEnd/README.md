# Contacts App

Here we are using `react` for front end and using `json-server` which acts as a back end.

## Front-End

**Open terminal and type**

### `cd FrontEnd` to go to the front-end directory

### `npm install` to install the required packages

### `npm start` to run the projects

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Back-End

**Open another terminal and type**

### `cd BackEnd` to go to the back-end directory

### `npm install` to install the required packages

### `npm run auth` to run the back end server

Runs the server in [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Project Overview

**/signin** - route to sign in the user

**/signup** - route to sign up the user

## Flow

Once you login that data is stored in `users.json` under `users` which is a array of objects which stores all the users login details, then you will be directed to contact page where you can add contacts. When you add a contact they are stored in the `contacts` array contain the contact details as objects in the `users.json`.
