# SneakersPickers
SnekersPickers is a trading platform app that users can trade their shoes.

The sneakers scence has been grown so big, and there are many people who constantly resell their old sneakers to buy another sneakers.

The sneakersPickers may help those people in reducing process of reselling their sneakers and buy another sneakers.
They can now stop reselling shoes but can trade instead..!


## Users Story

### Landing Page
- Enables users to signup with the signup buttom.

!["Landing Page"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/LandingPage.png?raw=true)

### About us Page
- Explains about the services that app provides.

!["About us"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/AboutUsPage.png?raw=true)

### Contact Us Page

- Provides contact informations.

!["Contact us"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/ContactUsPage.png?raw=true)


### Browse

- Users can browse the shoes ready get traded.
- Users have to register/login and should have shoe listed to trade to make a offer.
- When users are not logged in and clicked the make a offer button, the app redirects the users to login page.

!["Browse"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/BrowsPage.png?raw=true)

### Register

- Enables users to register.

!["Register"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/RegisterPage.png?raw=true)

### Login

- Enables users to login.

!["Login"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/Login.png?raw=true)

### Profile

- Users can change their informations(passwords, name and email).

!["Profile](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/Profile.png?raw=true)

### Add A Listing

- Enables users to upload shoes to trade.

!["Add A Listing"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/AddAListingPage.png?raw=true)

### Make A Offer

- Enables users to select shoes to trade and make a offer.

!["Make offer"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/Offering.png?raw=true)

### Offer Notification

- When users get offers from other users, they will see notification in the Navbar.
- When users click the bell notification, app redirects users to My Offer page, Users can also see the notification in MyListing page.

!["Notification"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/OfferNotification.png?raw=true)

!["My Listing"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/MyListing.png?raw=true)

### Accepting Offer

- Users can accept or decline the offers upon their preferences.

!["Accepting1"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/AcceptingOffer.png?raw=true)

!["Accepting2"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/AcceptingOffer2.png?raw=true)


### History

- If any offers are accepted, users can see the contact/personal informations of the person who made a offer so that they can make an apointment.

!["History"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/History.png?raw=true)


### Edge cases

- Users cannot make a offer to their own shoes.

- Users cannot make a offer, if they have no shoes to trade.

!["Edge Case1"](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/EdgeCase-CannotOfferMine.png?raw=true)

!["Edge Case2](https://github.com/Hongseoupyun/SneakersPickers-New-version-/blob/main/docs/EdgeCase-Cantofferwithnolisting.png?raw=true)

## How to set up

- Fork the repository then clone the repository into your code editor.

- Open a terminal and change directories into server by typing ``` cd server ``` hit enter, then run ```npm install``` to install dependencies. Run ```npm start``` to start the back-end.

- Open another terminal and change directories into client by typing ```cd client``` hit enter, then run ```npt install``` to install dependencies. Run npm start to start the front-end.

- Our development environment connects the server to a local instance of PostgreSQL. If another DB is preferred it can be configured in the .env file.
To set up the database you will need PostgreSQL installed on your host machine and a PSQL account with admin permissions.

- Once inside PSQL in your terminal create the database by ```CREATE DATABASE final;```

- Head over to https://localhost:3001 to view the project.

## Dependencies

### Client

```{
  "name": "client",
  "version": "0.1.0",
  "proxy": "http://localhost:3000",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.27.2",
    "bootstrap": "^5.1.3",
    "classnames": "^2.3.1",
    "js-cookie": "^3.0.1",
    "mdb-ui-kit": "^4.1.0",
    "react": "^18.1.0",
    "react-bootstrap": "^2.4.0",
    "react-dom": "^18.1.0",
    "react-emoji": "^0.5.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "react-scroll-to-bottom": "^4.2.0",
    "react-toastify": "^9.0.5",
    "sass": "^1.51.0",
    "socket.io-client": "^4.5.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "PORT=3001 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### Server

```{
  "name": "server",
  "version": "0.0.0",
  "private": true,
  "main": "server.js",
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "body-parser": "^1.20.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^16.0.1",
    "express": "~4.16.1",
    "express-session": "^1.17.3",
    "morgan": "~1.9.1",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "pg": "^8.7.3",
    "react-router-dom": "^6.3.0",
    "socket.io": "^4.5.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.16"
  }
}
```
