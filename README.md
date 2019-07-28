# Emaily web app 📧
coursework for [Udemy - Node with React: Fullstack Web Development course](https://www.udemy.com/node-with-react-fullstack-web-development/)

The aim of the project was to build the front- and backend of a survey-email sender web application.
The master branch contains an improved version of the app described in the course.
Many additional features has been added

***

## 📑 Table of Contents
* [Live link](#-live-link)
* [Dev stack](#-dev-stack)
* [Getting started](#-getting-started)
* [How to use](#-how-to-use)
* [Licence](#-licence)
* [Credits](#-credits)

## 🔗 Live link  
Open the page directly from [here](https://obscure-tundra-54097.herokuapp.com/)  

## 🛠 Dev stack
- Node, Express
- Git, GitHub
- Heroku
- Passport.js
- Google OAuth2
- MongoDB, Mongoose
- React (create-react-app)
- Redux, redux-form
- Materialize CSS
- Stripe API
- SendGrid API
- ngrok
- socket.io (only locally, in progress)

## 🏁 Getting started

### Setting up application on local machine:  
The system expected to have the following dependencies installed
* Node.js
* npm
* git
* ngrok

1. Clone [repository](https://github.com/jpacsai/Emaily)
2. In the terminal navigate into project root folder on local machine and install backend dependencies with `npm install`
3. In the terminal navigate into `client` folder and install frontend dependencies with `npm install`
4. In your code editor navigate into project root folder and in the `config` folder rename `sample_dev.js` file to `dev.js`
5. **Google OAuth2**:
    - a helpful article [here](https://medium.com/@pablo127/google-api-authentication-with-oauth-2-on-the-example-of-gmail-a103c897fd98)
    - name the project `emaily-dev` or something similar (keep in mind, we are going to have a `production` one too!)
    - add to **Authorized JavaScript origins**: `http://localhost:5000`
    - add to **Authorized redirect URIs**: `http://localhost:5000/auth/google/callback` and `http://localhost:3000/auth/google/callback`
    - paste your google client id into the renamed `dev.js` file (`GOOGLE_CLIENT_ID`)
    - paste your google client secret into the renamed `dev.js` file too (`GOOGLE_CLIENT_SECRET`)
6. **MongoDB**:
    - https://www.mongodb.com/
    - create a new project, call it something meaningul with `-dev` in it (keep in mind, we are going to have a `production` one too!)
    - build a cluster
    - helpful article [here](https://code.tutsplus.com/tutorials/create-a-database-cluster-in-the-cloud-with-mongodb-atlas--cms-31840)
    - leave the free settings as they are
    - after the cluster is created (takes some time), choose `Add Your Current IP Address`
    - in the **Create a MongoDB User** section:
       - 1. add a user name
       - 2. click on `Autogenerate Secure Password`
       - 3. BEFORE you click on `Create`, click on `show` to see your password
       - 4. copy and paste it somewhere for later!
       - 5. click on create
    - choose a connection method: `Connect your application`
    - make sure the `Connection string only` is choosen
    - copy the string, and paste it into `dev.js` file (`MONGO_URI`), replace `<password>` with your password so it will look like this:
      `mongodb+srv://yourusernamehere:yourpasswordhere@emaily...`
7. In `dev.js` type in a long, random string into `COOKIE_KEY`
8. **Stripe**:
    - https://dashboard.stripe.com
    - `Get your test API keys`
    - copy and paste the publishable key into `dev.js` file (`STRIPE_PUBLISHABLE_KEY`)
    - copy and paste the secret key into `dev.js` file (`STRIPE_SECRET_KEY`)
9. In your code editor navigate into the `client` folder:
    - create a `.env.development` file and paste in the following text: `REACT_APP_STRIPE_KEY=yourStripePublishableKeyHere`
    - create a `.env.production` file and paste in the same text again
10. **SendGrid**:
    - https://sendgrid.com/
    - create a new SendGrid account, this will be for development only!
    - in `Settings`, click on `API`
    - create API key
    - copy and paste it to `dev.js` file (`SEND_GRID_KEY`)
12. Start the applicaton with `npm run dev` in the project root folder
13. The aplication runs on http://localhost:3000
14. **ngrok**
    - (for me it doesn't work in git bash, I have to use another terminal)
    - start ngrok in terminal: `ngrok http 5000` and leave it open, running
    - in SendGrid: `Settings` -> `Mail settings`
    - find `Event Notification`, turn it on
    - grab the ngrok link from the terminal:  
      find this line: `Forwarding                    http://randomtexthere.ngrok.io -> http://localhost:5000`
    - copy only the `http://randomtexthere.ngrok.io` part
    - paste the ngrok link into `HTTP POST URL` like this: `ngroklinkhere/api/surveys/webhooks`
    - select actions: tick the `Clicked` checkbox
    - save it (scroll a little up, click on the tick)

***-- OPTIONAL: deploy production version to Heroku --*** 
  
15. **GitHub**:
    - create a repo for your project
    - commit the all the code
16. Create a new project on **Heroku** (https://heroku.com)
17. Inside the Heroku project dashboard, click on the `Settings` menu, scroll down to `Config vars`, reveal them
18. Create another Google project, this will be the production version:
     - **Authorized domains**: add the heroku app link without `https://`
     - **add Authorized JavaScript origins**: copy and paste the heroku app link (`Open app` button on top of the page) here
     - **Authorized redirect URIs**: `yourherokuapplinkhere/auth/google/callback`
     - create client id and client secret
19. Go back to Heroku, add the google keys as config vars with the SAME key names we used in `dev.js` (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)
20. Create another MongoDB project, but this time after the cluster is created (takes some time), choose `Add a different IP Address` and enter `0.0.0.0/0`, copy the password to somewhere, then copy and paste the string into Heroku, insert the password and and add key name of `MONGO_URI`
21. Enter the `COOKIE_KEY` into Heroku config vars
22. Copy and paste the stripe keys into Heroku (`STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`)
23. Copy the heroku app link and add it to the config vars as `REDIRECT_DOMAIN`
24. Create another SendGrid account (this will be your production account!), copy and paste the API key into Heroku config vars as `SEND_GRID_KEY`
25. Add another Heroku config var `REACT_APP_STRIPE_KEY` and copy paste the `STRIPE_PUBLISHABLE_KEY`'s value in there
26. **Deploying to Heroku the first time**:
     - in Heroku: `Deploy` menu -> `Deployment method`: GitHub (connect your GitHub account)
     - below that: type in the GitHub repo name, and connect
     - scroll down: `Manual deploy`, make sure the `master` branch is selected (or your prefered branch), click `Deploy Branch`
     
##### Service Worker  
Service worker is being activated in the production version
     
### 🏃 Starting app on local machine after inital setup  
1. start app on local machine with the terminal from the project root folder: `npm run dev`
2. AFTER the app has stared running, start ngrok: `ngrok http 5000`
3. open your development(!) SendGrid account (which you created first) and paste in `Settings` -> `Mail settings` --> `Event Notification` --> `Edit`
4. paste the ngrok link into `HTTP POST URL` like this: `ngroklinkhere/api/surveys/webhooks`
❗ **every time after you shut down ngrok and start it, it generates a new link so must update it in your development(!) SendGrid account too**

### Browser compatibility  
The site was tested on Google Chrome only

## 🍴 How to use 

TODO

## 📜 Licence

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/jpacsai/Emaily/blob/master/README.md) file for details

## 💰 Credits
- Thank you for [Stephen Grider](https://www.udemy.com/user/sgslo/) for creating the course
