require('dotenv').config();
const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors     = require('cors');
const session        = require('express-session');
require('./db/db')

const authController = require('./controllers/authController')
const movieController = require('./controllers/movieController')

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
const corsOptions = {
  origin: process.env.URL, // when you deploy your react app, this is where you put the address,
  credentials: true, // allowing cookies to be sent with requests from the client (session cookie),
  optionsSuccessStatus: 200 // some legacy browsers IE11 choke on a 204, and options requests
}
app.use(cors(corsOptions));


// before our controllers
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // says only save the cookie if there has been a change to one of properties
  saveUninitialized: false // only save when we have mutated the session,
  //this is what should be done for logins, many laws make you do this as well
}))


app.use(process.env.AUTH, authController);
app.use(process.env.MOVIES, movieController);



const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${PORT}`);
});
