## Social Media Rest Api
This project is the backend service of an imaginary social media application.
## Run it locally
1. To run this project, you need to install the latest version of MongoDB Community Edition first. https://docs.mongodb.com/manual/installation/
2. Create a folder and name it "Social-Media"
```
git clone https://github.com/canicemichael/Social-Media-RestApi-app.git
cd Social-Media
```
Once you install MongoDB, make sure it's running

## Install the Dependencies
Next, from the project folder, install the dependencies
```
npm i
```

## Built With
- Node.js - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
- express - Fast, unopinionated, minimalist web framework for Node.js
- MongoDB - The database for modern applications
- Mongoose - Elegant MongoDB object modeling for Node.js

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:
```
MONGO_URL = '<URL>'
API_KEY = '<KEY>'
JWT_SEC = '<SECRET>'
```
## Start the Server
```
npm run start
```
This will launch the Node server on port 5000. If that port is busy, you can set a different point in config/default.json.
Open up your postman and head over to the localhost to test accordingly:
[postman documentation](https://documenter.getpostman.com/view/16601080/Uyxho7bS)
